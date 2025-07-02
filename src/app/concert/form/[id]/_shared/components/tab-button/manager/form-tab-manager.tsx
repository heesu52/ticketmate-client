import { useCallback, useEffect, useState } from 'react';

import FormInput from '@/app/concert/form/[id]/_shared/components/input/form-input';
import { FormData } from '@/app/concert/form/[id]/_shared/components/input/form-input.type';
import FormReadOnly from '@/app/concert/form/[id]/_shared/components/readonly/form-readonly';
import FormTabButton from '@/app/concert/form/[id]/_shared/components/tab-button/button/form-tab-button';
import {
  useCreateConcertForm,
  usePatchConcertForm,
} from '@/app/concert/form/[id]/_shared/services/mutation';
import {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
} from '@/app/concert/form/[id]/_shared/services/type';
import { PlusIcon, CloseIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import { ERROR_MESSAGES } from '@/shared/constants/error-type';
import {
  TicketOpenType,
  Concert,
  ApplicationFormStatus,
  Form,
} from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';

import styles from './form-tab-manager.module.scss';

interface FormTabManagerProps {
  handleOpenModal: () => void;
  ticketOpenType: TicketOpenType;
  concertId: string;
  onError: (message: string) => void;
  concertItem: Concert;
  formItem?: Form;
  status?: ApplicationFormStatus;
}
export default function FormTabManager({
  handleOpenModal,
  ticketOpenType,
  concertId,
  onError,
  concertItem,
  formItem,
  status,
}: FormTabManagerProps) {
  const [tabs, setTabs] = useState([1]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(2);
  //status 별로 mode를 지정해서 렌더링 하는 form을 구분
  const [mode] = useState<'input' | 'readonly' | 'readApp' | undefined>(() => {
    if (!status) return 'input';
    if (status === 'PENDING') return 'readonly';
    if (
      status === 'CANCELED' ||
      status === 'CANCELED_IN_PROCESS' ||
      status === 'REJECTED'
    )
      return 'readApp';
    // ACCEPTED 혹은 그 외의 상태는 undefined로 둬서 아무 동작 안 하도록
    return undefined;
  });
  //input과 readapp을 구분해서 제출을 하기 위해 state로 관리
  const [isEdit, setIsEdit] = useState(false);
  const isEditing = mode === 'input' || (mode === 'readApp' && isEdit);

  // FormData 형태로 초기화
  const [formData, setFormData] = useState<Record<number, FormData>>({
    1: {
      performanceDate: '',
      requestCount: '',
      hopeAreaList: [{ id: 1, location: '', price: '' }],
      requirement: '',
    },
  });

  // 기존 formItem이 존재하면 응답 리스트를 기반으로 탭 및 formData 상태를 초기화
  // 탭 번호는 1부터 시작
  // 각 탭의 formData는 performanceDate, requestCount, hopeAreaList 등의 정보를 포함
  useEffect(() => {
    if (
      formItem &&
      Array.isArray(formItem.applicationFormDetailResponseList) &&
      formItem.applicationFormDetailResponseList.length > 0
    ) {
      const newTabs = formItem.applicationFormDetailResponseList.map(
        (_, index) => index + 1,
      );

      const newFormData = formItem.applicationFormDetailResponseList.reduce(
        (acc, item, index) => {
          acc[index + 1] = {
            performanceDate: item.performanceDate,
            requestCount: item.requestCount.toString(),
            hopeAreaList: item.hopeAreaResponseList.map((area, i) => ({
              id: i + 1,
              location: area.location,
              price: area.price.toString(),
            })),
            requirement: item.requirement || '',
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

  // 탭 라벨 생성 함수
  // 기존 신청폼이 있을 경우 공연 날짜 및 회차로 라벨 지정
  // 없으면 기본 문구('회차를 선택해주세요') 표시
  const getTabLabel = (tabId: number) => {
    const currentFormDate = formData[tabId]?.performanceDate;
    const fallbackDate =
      formItem?.applicationFormDetailResponseList?.[tabId - 1]?.performanceDate;

    const date = currentFormDate || fallbackDate;
    if (!date) return '회차를 선택해주세요';

    const selectedDateInfo = concertItem.concertDateInfoResponseList.find(
      (item) => item.performanceDate === date,
    );

    if (!selectedDateInfo) return '회차를 선택해주세요';

    const formatted = formatDate(selectedDateInfo.performanceDate);
    return `${formatted} (${selectedDateInfo.session}회차)`;
  };

  // 새로운 탭 추가 및 해당 탭에 대응되는 초기 formData 생성
  const addNewTab = () => {
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

  const { mutate: createMutate } = useCreateConcertForm();
  const { mutate: patchMutate } = usePatchConcertForm();

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;
    const message =
      (code && ERROR_MESSAGES[code]) || '알 수 없는 오류가 발생했습니다.';
    onError(message);
  };

  // 현재 모든 탭의 formData를 수집하여 신청 요청 API(mutate) 호출
  const handleSubmit = () => {
    // formData의 모든 탭 데이터를 배열로 변환
    const applicationFormDetailRequestList = Object.values(formData).map(
      (currentFormData) => ({
        performanceDate: currentFormData.performanceDate,
        requestCount: Number(currentFormData.requestCount),
        hopeAreaList: currentFormData.hopeAreaList.map((item, index) => ({
          priority: index + 1,
          location: item.location,
          price: Number(item.price),
        })),
        requestDetails: currentFormData.requirement,
      }),
    );

    if (mode === 'input') {
      const requestBody: CreateConcertFormRequest = {
        agentId: '11d4486d-4524-4e21-8ec1-bffc764bc7bb',
        concertId,
        ticketOpenType,
        applicationFormDetailRequestList,
      };

      createMutate(requestBody, {
        onSuccess: () => handleOpenModal(),
        onError: handleError,
      });
    } else if (mode === 'readApp') {
      if (!formItem?.applicationFormId) {
        return;
      }

      const requestBody: PatchConcertFormRequest = {
        applicationFormId: formItem.applicationFormId,
        applicationFormEditRequest: {
          applicationFormDetailRequestList,
        },
      };

      patchMutate(requestBody, {
        onSuccess: () => handleOpenModal(),
        onError: handleError,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tab_container}>
        {tabs.map((tabId) => (
          <FormTabButton
            key={tabId}
            label={getTabLabel(tabId)}
            isActive={activeTab === tabId}
            onClick={() => setActiveTab(tabId)}
            rightIcon={
              isEditing ? (
                <div
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tabId);
                  }}
                >
                  <CloseIcon width={16} height={16} />
                </div>
              ) : undefined
            }
          />
        ))}
        {isEditing && (
          <FormTabButton
            label="추가하기"
            isActive={false}
            onClick={addNewTab}
            rightIcon={<PlusIcon width={16} height={16} />}
          />
        )}
      </div>
      <div className={styles.input_container}>
        <div>
          {tabs.map((tabId) =>
            activeTab === tabId ? (
              isEditing ? (
                <FormInput
                  key={tabId}
                  value={formData[tabId]}
                  onChange={(data) => updateFormData(tabId, data)}
                  concertDateInfoResponseList={
                    concertItem.concertDateInfoResponseList
                  }
                  ticketOpenDateInfoResponses={
                    concertItem.ticketOpenDateInfoResponses
                  }
                  ticketOpenType={ticketOpenType}
                  formItem={formItem}
                  currentIndex={tabId - 1}
                />
              ) : formItem?.applicationFormDetailResponseList?.[tabId - 1] ? (
                <FormReadOnly
                  key={tabId}
                  concertDateInfoResponseList={
                    concertItem.concertDateInfoResponseList
                  }
                  ticketOpenDateInfoResponses={
                    concertItem.ticketOpenDateInfoResponses
                  }
                  formItem={formItem}
                  currentIndex={tabId - 1}
                />
              ) : null
            ) : null,
          )}
        </div>
        {mode === 'input' && (
          <Button
            type="button"
            size="large"
            variant="fill"
            onClick={handleSubmit}
          >
            신청하기
          </Button>
        )}
        {mode === 'readApp' && (
          <Button
            type="button"
            size="large"
            variant="fill"
            onClick={() => {
              if (isEditing) {
                handleSubmit();
              } else {
                setIsEdit(true);
              }
            }}
          >
            재신청하기
          </Button>
        )}
      </div>
    </div>
  );
}
