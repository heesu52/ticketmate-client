import { useEffect, useState } from 'react';

import { MinusIcon, PlusIcon, HelpCircleIcon } from '@/assets/icons';
import Input from '@/shared/components/input/input';

import styles from './form-input.module.scss';
import { FormData, HopeArea } from './form-input.type';
import FormSelect from '../select/form-select';

interface FormInputProps {
  value: FormData;
  onChange: (data: FormData) => void;
  dateList: { value: string; label: string }[];
  countList: { value: string; label: string }[];
}

export default function FormInput({
  value,
  onChange,
  dateList,
  countList,
}: FormInputProps) {
  const [hopeAreaList, setHopeAreaList] = useState<HopeArea[]>(
    value?.hopeAreaList || [{ id: 1, location: '', price: '' }],
  );
  const [performanceDate, setPerformanceDate] = useState<string>(
    value?.performanceDate || '',
  );
  const [requestCount, setRequestCount] = useState<string>(
    value?.requestCount || '',
  );
  const [requestDetails, setRequestDetails] = useState<string>(
    value?.requestDetails || '',
  );

  useEffect(() => {
    onChange({ performanceDate, requestCount, hopeAreaList, requestDetails });
  }, [performanceDate, requestCount, hopeAreaList, requestDetails, onChange]);

  const addInput = () => {
    setHopeAreaList((prev) => [
      ...prev,
      { id: Date.now(), location: '', price: '' },
    ]);
  };

  const removeInput = (id: number) => {
    setHopeAreaList((prev) => {
      if (prev.length <= 1) return prev; // 최소 1개는 유지
      return prev.filter((input) => input.id !== id);
    });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setHopeAreaList((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [field]: value } : input,
      ),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <span className={styles.span}>
          회차<span className={styles.asterisk}>*</span>
        </span>
        <FormSelect
          selectList={dateList}
          value={performanceDate}
          onChange={setPerformanceDate}
        />
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>
          매수<span className={styles.asterisk}>*</span>
        </span>
        <FormSelect
          selectList={countList}
          value={requestCount}
          onChange={setRequestCount}
        />
      </div>

      <div className={styles.form_container}>
        <div className={styles.guide_container}>
          <span className={styles.span}>희망구역</span>
          <div className={styles.guide}>
            <HelpCircleIcon width={16} height={16} fill="var(--gray-4)" />
            <span className={styles.span}>희망구역 작성 가이드</span>
          </div>
        </div>

        {hopeAreaList.map((input, index) => (
          <div key={input.id} className={styles.input_container}>
            <span className={styles.text}>{`${index + 1}순위`}</span>
            {/* 구역명 입력 */}
            <Input
              label="구역명"
              placeholder="구역명"
              id={`seat-${input.id}`}
              value={input.location}
              onChange={(e) =>
                handleInputChange(input.id, 'location', e.target.value)
              }
            />

            {/* 가격 입력 */}
            <Input
              label="가격"
              placeholder="가격"
              id={`price-${input.id}`}
              value={input.price}
              onChange={(e) =>
                handleInputChange(input.id, 'price', e.target.value)
              }
            />
            {index === hopeAreaList.length - 1 ? (
              <PlusIcon
                width={16}
                height={16}
                fill="var(--gray-4)"
                onClick={addInput}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <MinusIcon
                width={16}
                height={16}
                fill="var(--gray-4)"
                onClick={() => removeInput(input.id)}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>요청사항</span>
        <textarea
          className={styles.textarea}
          placeholder="자유롭게 입력해주세요."
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
        />
      </div>
    </div>
  );
}
