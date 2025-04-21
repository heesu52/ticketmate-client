import { useEffect, useState } from 'react';

import { MinusIcon, PlusIcon, HelpCircleIcon } from '@/assets/icons';
import Input from '@/shared/components/input/input';

import styles from './form-input.module.scss';
import { FormData, InputItem, dateList, countList } from './form-input.type';
import FormSelect from '../select/form-select';

interface FormInputProps {
  value: FormData;
  onChange: (data: FormData) => void;
}

export default function FormInput({ value, onChange }: FormInputProps) {
  const [inputs, setInputs] = useState<InputItem[]>(
    value?.inputs || [{ id: 1, seat: '', price: '' }],
  );
  const [date, setDate] = useState<string>(value?.date || '');
  const [count, setCount] = useState<string>(value?.count || '');
  const [note, setNote] = useState<string>(value?.note || '');

  useEffect(() => {
    onChange({ inputs, date, count, note });
  }, [inputs, date, count, note]);

  const addInput = () => {
    setInputs((prev) => [...prev, { id: Date.now(), seat: '', price: '' }]);
  };

  const removeInput = (id: number) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setInputs((prev) =>
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
        <FormSelect selectList={dateList} value={date} onChange={setDate} />
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>
          매수<span className={styles.asterisk}>*</span>
        </span>
        <FormSelect selectList={countList} value={count} onChange={setCount} />
      </div>

      <div className={styles.form_container}>
        <div className={styles.guide_container}>
          <span className={styles.span}>희망구역</span>
          <div className={styles.guide}>
            <HelpCircleIcon width={16} height={16} fill="var(--gray-4)" />
            <span className={styles.span}>희망구역 작성 가이드</span>
          </div>
        </div>

        {inputs.map((input, index) => (
          <div key={input.id} className={styles.input_container}>
            <span className={styles.text}>{`${index + 1}순위`}</span>
            {/* 구역명 입력 */}
            <Input
              label="구역명"
              placeholder="구역명"
              id={`seat-${input.id}`}
              value={input.seat}
              onChange={(e) =>
                handleInputChange(input.id, 'seat', e.target.value)
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
            {index === inputs.length - 1 ? (
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
  );
}
