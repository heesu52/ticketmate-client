'use client';

import { StarIcon } from '@/assets/icons';
import BorderButton from '@/shared/components/button/border-button/border-button';
import FillButton from '@/shared/components/button/fill-button/fill-button';

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
          <span className={styles.title}>의문의 티켓터</span>
          <StarIcon width={20} height={20} />
          <span className={styles.star}>4.6</span>
          <span className={styles.info}>(12)</span>
        </div>

        <span className={styles.info}>한 줄 소개를 작성해주세요.</span>
      </div>
      <div className={styles.button_container}>
        <FillButton label="선예매 요청하기" size="small" onClick={onClose} />
        <BorderButton label="일반예매 요청하기" type="button" size="medium" />
      </div>
    </div>
  );
};

export default BottomSheet;
