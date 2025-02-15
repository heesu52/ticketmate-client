'use client';

import Link from 'next/link';

import styles from './bottom-sheet.module.scss';
import NegativeButton from '../button/negative-button';
import PositiveButton from '../button/positive-button';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
}

const BottomSheet = ({ isOpen }: BottomSheetProps) => {
  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.icon} />
      <div className={styles.upper_container}>
        <span className={styles.title}>의문의 티켓터님의</span>
        <span className={styles.title}>티켓팅 대리 성공 건수는?</span>
        <span className={styles.info}>
          성공 기준은 거래완료 여부에 따라 측정됩니다.
        </span>
      </div>
      <div className={styles.count_container}>
        <div className={styles.middle_container}>
          <span className={styles.text}>현재까지</span>
          <span className={styles.count}>42</span>
          <span className={styles.text}>건입니다.</span>
        </div>
        <Link className={styles.link} href={'/'}>
          대리자의 포트폴리오 보기
        </Link>
      </div>

      <div className={styles.button_container}>
        <NegativeButton label="다음에" size="small" />
        <PositiveButton label="요청하기" type="submit" size="medium" />
      </div>
    </div>
  );
};

export default BottomSheet;
