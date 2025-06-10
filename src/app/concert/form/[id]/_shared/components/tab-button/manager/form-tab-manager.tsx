import { useCallback, useState } from 'react';

import FormInput from '@/app/concert/form/[id]/_shared/components/input/form-input';
import { FormData } from '@/app/concert/form/[id]/_shared/components/input/form-input.type';
import { useCreateConcertForm } from '@/app/concert/form/[id]/_shared/services/mutation';
import { PlusIcon, CloseIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import { TicketOpenType } from '@/shared/types';

import styles from './form-tab-manager.module.scss';
import FormTabButton from '../button/form-tab-button';

interface FormTabManagerProps {
  handleOpenModal: () => void;
  dateList: { value: string; label: string }[];
  countList: { value: string; label: string }[];
  ticketOpenType: TicketOpenType;
  concertId: string;
}
export default function FormTabManager({
  handleOpenModal,
  dateList,
  countList,
  ticketOpenType,
  concertId,
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

  const getTabLabel = (tabId: number) => {
    const tabData = formData[tabId];
    const selectedDate = dateList.find(
      (item) => item.value === tabData?.performanceDate,
    );
    return selectedDate ? selectedDate.label : '회차를 선택해주세요';
  };

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
      agentId: '43d5c1dd-afc7-492b-9c51-bb92bef40565',
      concertId,
      ticketOpenType,
      applicationFormDetailRequestList,
    };

    console.log('Request Body:', requestBody);
    mutate(requestBody);
  };

  //현재 ticketopentype을 찾을 수 없다는 에러가 발생하고 있음 이부분 해결하고 pr날리기
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
              dateList={dateList}
              countList={countList}
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
          handleOpenModal(); // 모달 열기
        }}
      >
        신청하기
      </Button>
    </div>
  );
}
