import { useCallback, useEffect, useMemo, useState } from 'react';

import FormInput from '@/app/concert/form/[id]/_shared/components/form-input/form-input';
import { FormData } from '@/app/concert/form/[id]/_shared/components/form-input/form-input.type';
import FormTabAgentButton from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-button/agent-button';
import FormTabClientButton from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-button/client-button';
import { validateApplicationForm } from '@/app/concert/form/[id]/_shared/validators/application-form';
import Tab from '@/shared/components/ui/tab/tab';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useMember } from '@/shared/context/member-context';
import {
  Concert,
  ApplicationFormStatus,
  Form,
  TicketOpenType,
} from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';

import styles from './form-tab-manager.module.scss';

interface FormTabManagerProps {
  handleOpenModal?: () => void;
  ticketOpenType: TicketOpenType;
  agentId?: string | null;
  concertId?: string | null;
  applicationFormId?: string | null;
  concertItem: Concert;
  formItem?: Form;
  status?: ApplicationFormStatus | null;
  from?: string | null;
}

export default function FormTabManager({
  handleOpenModal,
  ticketOpenType,
  agentId,
  concertId,
  applicationFormId,
  concertItem,
  formItem,
  status,
  from,
}: FormTabManagerProps) {
  const { applicationFormDetailResponseList = [] } = formItem ?? {};

  const { member } = useMember();

  const [tabs, setTabs] = useState([1]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(2);
  const [isEdit, setIsEdit] = useState(false);
  const isEditing = !status || isEdit;

  // 기존 코드
  // FormData 형태로 초기화
  const [formData, setFormData] = useState<Record<number, FormData>>({
    1: {
      performanceDate: '',
      requestCount: '',
      hopeAreaList: null,
      requirement: '',
    },
  });

  // 기존 formItem이 존재하면 응답 리스트를 기반으로 탭 및 formData 상태를 초기화
  // 탭 번호는 1부터 시작
  // 각 탭의 formData는 performanceDate, requestCount, hopeAreaList 등의 정보를 포함
  useEffect(() => {
    if (formItem && applicationFormDetailResponseList.length > 0) {
      const newTabs = applicationFormDetailResponseList.map(
        (_, index) => index + 1,
      );
      const newFormData = applicationFormDetailResponseList?.reduce(
        (acc, item, index) => {
          acc[index + 1] = {
            performanceDate: item.performanceDate,
            requestCount: item.requestCount?.toString() ?? '',
            hopeAreaList:
              item.hopeAreaResponseList?.map((area, i) => ({
                id: i + 1,
                location: area.location,
                price: area.price?.toString() ?? '',
              })) ?? [],
            requirement: item.requirement ?? '',
          };
          return acc;
        },
        {} as Record<number, FormData>,
      );

      setTabs(newTabs);
      setFormData(newFormData);
      setActiveTab(newTabs[0]);
      setNextId(newTabs.length + 1);
    }
  }, [formItem]);

  // 공연 날짜를 key로 빠르게 조회하도록 Map 생성
  const concertDateMap = useMemo(() => {
    return new Map(
      concertItem.concertDateInfoResponseList.map((item) => [
        item.performanceDate,
        item,
      ]),
    );
  }, [concertItem.concertDateInfoResponseList]);

  // 탭 라벨 생성 함수
  // 기존 신청폼이 있을 경우 공연 날짜 및 회차로 라벨 지정
  // 없으면 기본 문구('회차를 선택해주세요') 표시
  const getTabLabel = (tabId: number) => {
    const currentFormDate = formData[tabId]?.performanceDate;
    const fallbackDate =
      applicationFormDetailResponseList?.[tabId - 1]?.performanceDate;

    const date = currentFormDate || fallbackDate;
    if (!date) return '회차를 선택해주세요';

    const selectedDateInfo = concertDateMap.get(date);
    if (!selectedDateInfo) return '회차를 선택해주세요';

    const formatted = formatDate(selectedDateInfo.performanceDate);
    return `${formatted} (${selectedDateInfo.session}회차)`;
  };

  // 최대 탭 개수
  const maxTabCount = concertItem.concertDateInfoResponseList.length;
  // 새로운 탭 추가 및 해당 탭에 대응되는 초기 formData 생성

  const addNewTab = () => {
    if (tabs.length >= maxTabCount) {
      toastify({
        variant: 'info',
        description: '신청 가능한 최대 회차에요',
      });
      return;
    }
    setTabs((prev) => [...prev, nextId]);
    setActiveTab(nextId);
    setFormData((prev) => ({
      ...prev,
      [nextId]: {
        performanceDate: '',
        requestCount: '',
        hopeAreaList: [{ id: 1, location: '', price: '' }],
        requirement: '',
      },
    }));
    setNextId((id) => id + 1);
  };

  // 지정된 탭 ID를 제거하고, 해당 formData도 함께 삭제
  // 삭제된 탭이 활성 탭일 경우, 가장 앞의 탭으로 포커스 이동
  const removeTab = (id: number) => {
    const newTabs = tabs.filter((tabId) => tabId !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0]);
    }
    const newFormData = { ...formData };
    delete newFormData[id];
    setFormData(newFormData);
  };

  //여러개의 탭이 있을 경우 데이터 업데이트
  const updateFormData = useCallback((id: number, data: FormData) => {
    setFormData((prev) => ({ ...prev, [id]: data }));
  }, []);

  // formData의 모든 탭 데이터를 배열로 변환
  const applicationFormDetailRequestList = Object.values(formData).map(
    (currentFormData) => {
      // location과 price가 둘 다 비어있으면 제외
      const filteredHopeArea = currentFormData.hopeAreaList?.filter(
        (item) => item.location.trim() || item.price.trim(),
      );

      return {
        performanceDate: currentFormData.performanceDate,
        requestCount: Number(currentFormData.requestCount),
        hopeAreaList:
          filteredHopeArea && filteredHopeArea.length > 0
            ? filteredHopeArea.map((item, index) => ({
                priority: index + 1,
                location: item.location,
                price: Number(item.price),
              }))
            : undefined, // 값이 없으면 undefined로 보내서 제외
        requirement: currentFormData.requirement,
      };
    },
  );

  // valid 확인 후 모달로 이동
  const handleValidateAndOpenModal = () => {
    const result = validateApplicationForm(formData);

    if (!result.valid) {
      if (result.tabId) {
        setActiveTab(result.tabId);
      }

      toastify({
        variant: 'error',
        description: result.message,
      });
      return;
    }

    handleOpenModal?.();
  };

  // form-button에 전달할 요청 값
  let requestData;
  if (!status) {
    if (!agentId || !concertId) return;
    requestData = {
      agentId,
      concertId,
      ticketOpenType,
      applicationFormDetailRequestList,
    };
  } else {
    if (!applicationFormId) return;
    requestData = {
      applicationFormId,
      applicationFormEditRequest: { applicationFormDetailRequestList },
    };
  }

  const tabItems = tabs.map((tabId) => {
    const currentData =
      formData[tabId] ?? applicationFormDetailResponseList?.[tabId - 1];

    return {
      value: tabId.toString(),
      label: getTabLabel(tabId),
      content:
        activeTab === tabId && currentData ? (
          <FormInput
            key={tabId}
            value={formData[tabId]}
            onChange={(data) => updateFormData(tabId, data)}
            concertDateInfo={concertItem.concertDateInfoResponseList}
            ticketOpenDateInfo={concertItem.ticketOpenDateInfoResponseList}
            ticketOpenType={ticketOpenType}
            formItem={formItem}
            currentIndex={tabId - 1}
            seatingChartUrl={concertItem.seatingChartUrl}
            disabled={!isEditing}
          />
        ) : null,
    };
  });

  return (
    <div className={styles.container}>
      <Tab
        items={tabItems}
        value={activeTab.toString()}
        onValueChange={(val) => setActiveTab(Number(val))}
        onAddTab={isEditing ? addNewTab : undefined}
        onDeleteTab={isEditing ? (val) => removeTab(Number(val)) : undefined}
        addTabButtonText="추가하기"
      />
      <div className={styles.input_container}>
        {tabItems.find((item) => item.value === activeTab.toString())?.content}
        {tabs.length > 0 && from !== 'chat' && (
          <>
            {member?.memberType === 'CLIENT' && (
              <FormTabClientButton
                handleOpenModal={handleValidateAndOpenModal}
                requestData={requestData}
                status={status}
                applicationFormId={applicationFormId}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            )}
            {member?.memberType === 'AGENT' && (
              <FormTabAgentButton
                handleOpenModal={handleValidateAndOpenModal}
                status={status}
                applicationFormId={applicationFormId}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
