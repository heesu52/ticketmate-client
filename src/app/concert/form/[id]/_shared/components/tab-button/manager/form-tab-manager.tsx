import { useState } from 'react';

import FormInput from '@/app/concert/form/[id]/_shared/components/input/form-input';
import {
  dateList,
  FormData,
} from '@/app/concert/form/[id]/_shared/components/input/form-input.type';
import { PlusIcon, CloseIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';

import styles from './form-tab-manager.module.scss';
import { useCreateConcertForm } from '../../../services/query';
import FormTabButton from '../button/form-tab-button';

interface FormTabManagerProps {
  handleOpenModal: () => void;
}
export default function FormTabManager({
  handleOpenModal,
}: FormTabManagerProps) {
  const [tabs, setTabs] = useState([1]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(2);

  const [formData, setFormData] = useState<Record<number, FormData>>({
    1: {
      date: '',
      count: '',
      inputs: [{ id: 1, seat: '', price: '' }],
      note: '',
    }, // FormData 형태로 초기화
  });

  const addNewTab = () => {
    setTabs((prev) => [...prev, nextId]);
    setActiveTab(nextId);
    setFormData((prev) => ({
      ...prev,
      [nextId]: {
        date: '',
        count: '',
        inputs: [{ id: 1, seat: '', price: '' }],
        note: '',
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

  const updateFormData = (id: number, data: FormData) => {
    setFormData((prev) => ({ ...prev, [id]: data }));
  };

  const getTabLabel = (tabId: number) => {
    const tabData = formData[tabId];
    const selectedDate = dateList.find((item) => item.value === tabData?.date);
    return selectedDate ? selectedDate.label : '회차를 선택해주세요';
  };

  const { mutate } = useCreateConcertForm();

  const handleSubmit = () => {
    const currentFormData = formData[activeTab];

    // CreateConcertFormRequest 타입에 맞게 수정된 데이터 구조
    const requestBody = {
      agentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      concertId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      performanceDate: currentFormData.date,
      requestCount: Number(currentFormData.count),
      hopeAreaList: currentFormData.inputs.map((item, index) => ({
        priority: index + 1,
        location: item.seat,
        price: Number(item.price),
      })),
      requestDetails: currentFormData.note,
      isPreOpen: false,
    };

    // requestBody를 콘솔에 출력하여 잘 생성되었는지 확인
    console.log('Request Body:', requestBody);

    // mutate 함수 실행
    mutate(requestBody);
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
