'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { StarIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import { useCheckDuplicateForm } from '@/shared/services/bottom-sheet/mutation';
import { Concert } from '@/shared/types';

import styles from './bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  concertItem: Concert | undefined;
  concertId: string;
  agentId: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  concertItem,
  concertId,
  agentId,
}: BottomSheetProps) => {
  const { ticketOpenDateInfoResponses } = concertItem ?? {};

  const preOpen = ticketOpenDateInfoResponses?.find(
    (info) => info.ticketOpenType === 'PRE_OPEN',
  );
  const generalOpen = ticketOpenDateInfoResponses?.find(
    (info) => info.ticketOpenType === 'GENERAL_OPEN',
  );

  // 우선순위에 따라 ticketOpenType 설정
  const ticketOpenType = preOpen
    ? preOpen.ticketOpenType
    : generalOpen
      ? generalOpen.ticketOpenType
      : undefined;

  //이미 신청한 신청서가 있는지 확인
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const { mutate } = useCheckDuplicateForm();

  useEffect(() => {
    if (isOpen && agentId && concertId && ticketOpenType) {
      mutate(
        { agentId, concertId, ticketOpenType },
        {
          onSuccess: (res) => setIsDuplicate(res as boolean),
          onError: () => setIsDuplicate(null),
        },
      );
    } else {
      setIsDuplicate(null);
    }
  }, [isOpen, agentId, concertId, ticketOpenType, mutate]);

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
        {isDuplicate ? (
          <>
            {preOpen && (
              <Button size="large" variant="fill-disabled" onClick={onClose}>
                신청된 요청입니다
              </Button>
            )}
            {generalOpen && (
              <Button size="large" variant="fill-disabled" onClick={onClose}>
                신청된 요청입니다
              </Button>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
