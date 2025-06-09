import { useCallback, useState } from 'react';

import FormInput from '@/app/concert/form/[id]/_shared/components/input/form-input';
import { FormData } from '@/app/concert/form/[id]/_shared/components/input/form-input.type';
import { useCreateConcertForm } from '@/app/concert/form/[id]/_shared/services/mutation';
import { PlusIcon, CloseIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import { ERROR_MESSAGES } from '@/shared/constants/error-type';
import { TicketOpenType, Concert } from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';

import styles from './form-tab-manager.module.scss';
import FormTabButton from '../button/form-tab-button';

interface FormTabManagerProps {
  handleOpenModal: () => void;
  ticketOpenType: TicketOpenType;
  concertId: string;
  onError: (message: string) => void;
  concertItem: Concert;
}
export default function FormTabManager({
  handleOpenModal,
  ticketOpenType,
  concertId,
  onError,
  concertItem,
}: FormTabManagerProps) {
  const [tabs, setTabs] = useState([1]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(2);

  // FormData 형태로 초기화
  const [formData, setFormData] = useState<Record<number, FormData>>({
    1: {
      performanceDate: '',
      requestCount: '',
      hopeAreaList: [{ id: 1, location: '', price: '' }],
      requestDetails: '',
    },
  });

  const getTabLabel = (tabId: number) => {
    const tabData = formData[tabId];
    if (!tabData?.performanceDate) return '회차를 선택해주세요';

    const selectedDateInfo = concertItem.concertDateInfoResponseList.find(
      (item) => item.performanceDate === tabData.performanceDate,
    );

    if (!selectedDateInfo) return '회차를 선택해주세요';

    const formatted = formatDate(selectedDateInfo.performanceDate);

    return `${formatted} (${selectedDateInfo.session}회차)`;
  };

  const addNewTab = () => {
    setTabs((prev) => [...prev, nextId]);
    setActiveTab(nextId);
    setFormData((prev) => ({
      ...prev,
      [nextId]: {
        performanceDate: '',
        requestCount: '',
        hopeAreaList: [{ id: 1, location: '', price: '' }],
        requestDetails: '',
      },
    }));
    setNextId((id) => id + 1);
  };

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

  const updateFormData = useCallback((id: number, data: FormData) => {
    setFormData((prev) => ({ ...prev, [id]: data }));
  }, []);

  const { mutate } = useCreateConcertForm();

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
        requestDetails: currentFormData.requestDetails,
      }),
    );

    const requestBody = {
      agentId: 'a618fdf6-fa1d-431e-bbea-d3e4494e10f1',
      concertId,
      ticketOpenType,
      applicationFormDetailRequestList,
    };

    // mutate 함수 실행
    mutate(requestBody, {
      onSuccess: () => {
        handleOpenModal();
      },
      onError: async (error: unknown) => {
        try {
          if (error instanceof Response) {
            const data = await error.json();
            const code: string = data?.errorCode;
            const message =
              ERROR_MESSAGES[code] || '알 수 없는 오류가 발생했습니다.';

            onError(message);
          } else {
            onError('서버 응답이 없습니다.');
          }
        } catch (e) {
          onError('에러 응답을 파싱하지 못했습니다.');
        }
      },
    });
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
              <div
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tabId);
                }}
              >
                <CloseIcon width={16} height={16} />
              </div>
            }
          />
        ))}
        <FormTabButton
          label="추가하기"
          isActive={false}
          onClick={addNewTab}
          rightIcon={<PlusIcon width={16} height={16} />}
        />
      </div>

      <div>
        {tabs.map((tabId) =>
          activeTab === tabId ? (
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
            />
          ) : null,
        )}
      </div>
      <Button
        type="button"
        size="large"
        variant="fill"
        onClick={() => {
          handleSubmit(); // 제출 처리
        }}
      >
        신청하기
      </Button>
    </div>
  );
}
