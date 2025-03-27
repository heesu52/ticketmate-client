'use client';

import MinusIcon from '@/assets/icons/minus.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import PositiveButton from '@/shared/components/button/fill-button/fill-button';
import Input from '@/shared/components/input/input';

import styles from './form.module.scss';

export default function Form() {
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

        <div className={styles.input_container}>
          <span className={styles.text}>1순위</span>
          <Input
            label="구역명"
            placeholder="구역명"
            id="seat"
            className={styles.input_seat}
          />
          <Input
            label="가격"
            placeholder="가격"
            id="price"
            className={styles.input_price}
          />
          <MinusIcon width={16} height={16} fill={'var(--gray-4)'} />
        </div>
        <div className={styles.input_container}>
          <span className={styles.text}>2순위</span>
          <Input
            label="구역명"
            placeholder="구역명"
            id="seat"
            className={styles.input_seat}
          />
          <Input
            label="가격"
            placeholder="가격"
            id="price"
            className={styles.input_price}
          />
          <MinusIcon width={16} height={16} fill={'var(--gray-4)'} />
        </div>
        <div className={styles.input_container}>
          <span className={styles.text}>3순위</span>
          <Input
            label="구역명"
            placeholder="구역명"
            id="seat"
            className={styles.input_seat}
          />
          <Input
            label="가격"
            placeholder="가격"
            id="price"
            className={styles.input_price}
          />
          <PlusIcon width={16} height={16} fill={'var(--gray-4)'} />
        </div>
      </div>
      <div className={styles.form_container}>
        <span className={styles.span}>요청사항</span>
        <textarea
          className={styles.textarea}
          placeholder="자유롭게 입력해주세요."
        />
      </div>
      <PositiveButton label="신청하기" type="button" size="large" />
    </div>
  );
}
