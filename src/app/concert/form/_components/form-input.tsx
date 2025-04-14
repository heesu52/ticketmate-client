'use client';

import { useState } from 'react';

import MinusIcon from '@/assets/icons/minus.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import Input from '@/shared/components/input/input';

import styles from './form-input.module.scss';

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
        <div className={styles.select}>2024/12/09(월) (2회차)</div>
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>매수</span>
        <div className={styles.select}>1매</div>
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
              className={styles.input_seat}
            />
            <Input
              label="가격"
              placeholder="가격"
              id={`price-${input.id}`}
              className={styles.input_price}
            />
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
        <textarea
          className={styles.textarea}
          placeholder="자유롭게 입력해주세요."
        />
      </div>
    </div>
  );
}
