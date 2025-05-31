'use client';

import Link from 'next/link';

import { StarIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import { Concert } from '@/shared/types';

import styles from './bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  concertItem: Concert | undefined;
  concertId: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  concertItem,
  concertId,
}: BottomSheetProps) => {
  const { ticketOpenDateInfoResponses } = concertItem ?? {};

  const preOpen = ticketOpenDateInfoResponses?.find(
    (info) => info.ticketOpenType === 'PRE_OPEN',
  );
  const generalOpen = ticketOpenDateInfoResponses?.find(
    (info) => info.ticketOpenType === 'GENERAL_OPEN',
  );

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
        {preOpen && (
          <Link href={`/concert/form/${concertId}`}>
            <Button size="large" variant="fill" onClick={onClose}>
              선예매 요청하기
            </Button>
          </Link>
        )}
        {generalOpen && (
          <Link href={`/concert/form/${concertId}`}>
            <Button size="large" variant="border" onClick={onClose}>
              일반예매 요청하기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
