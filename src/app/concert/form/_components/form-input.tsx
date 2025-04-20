'use client';

import { useState } from 'react';

import MinusIcon from '@/assets/icons/minus.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import Input from '@/shared/components/input/input';

import styles from './form-input.module.scss';
import FormDropdown from './form-select';

const dateList = [
  {
    value: 'date1',
    label: '2024/12/01(금) (1회차)',
  },
  {
    value: 'date2',
    label: '2024/12/02(토) (2회차)',
  },
  {
    value: 'date3',
    label: '2024/12/03(일) (3회차)',
  },
];

const countList = [
  {
    value: 'count1',
    label: '1매',
  },
  {
    value: 'count2',
    label: '2매',
  },
  {
    value: 'count3',
    label: '3매',
  },
];

export default function FormInput() {
  const [inputs, setInputs] = useState([{ id: 1 }]);

  const addInput = () => {
    setInputs((prev) => [...prev, { id: Date.now() }]);
  };

  const removeInput = (id: number) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <span className={styles.span}>회차</span>
        <FormDropdown selectList={dateList} />
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>매수</span>
        <FormDropdown selectList={countList} />
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>희망구역</span>

        {inputs.map((input, idx) => (
          <div key={input.id} className={styles.input_container}>
            <span className={styles.text}>{`${idx + 1}순위`}</span>
            <Input
              label="구역명"
              placeholder="구역명"
              id={`seat-${input.id}`}
            />
            <Input label="가격" placeholder="가격" id={`price-${input.id}`} />
            {idx === inputs.length - 1 ? (
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
        <Input
          label="요청사항"
          placeholder="자유롭게 작성해주세요"
          id={'free'}
        />
      </div>
    </div>
  );
}
