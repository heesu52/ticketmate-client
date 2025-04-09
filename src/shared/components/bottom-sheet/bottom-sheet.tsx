'use client';

import { StarIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';

import styles from './bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
}

const BottomSheet = ({ isOpen, onClose }: BottomSheetProps) => {
  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.icon} onClick={onClose} />
      <div className={styles.upper_container}>
        <span className={styles.info}>프로필 보기</span>

        <div className={styles.title_container}>
          <h1 className={styles.title}>의문의 티켓터</h1>
          <StarIcon width={20} height={20} />
          <span className={styles.star}>4.6</span>
          <span className={styles.info}>(12)</span>
        </div>

        <span className={styles.info}>한 줄 소개를 작성해주세요.</span>
      </div>
      <div className={styles.button_container}>
        <Button
          label="선예매 요청하기"
          size="medium"
          variant="back"
          onClick={onClose}
        />
        <Button label="일반예매 요청하기" size="medium" variant="fill" />
      </div>
    </div>
  );
};

export default BottomSheet;
