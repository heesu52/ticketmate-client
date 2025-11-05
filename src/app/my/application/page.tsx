'use client';
import React, { useState } from 'react';

import ApplicationConcertCard from '@/app/my/application/_shared/components/application-concert-card/application-concert-card';
import { useCreateAgentAvailabilityMutation } from '@/app/my/application/_shared/services/mutation';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { toastify } from '@/shared/components/ui/toast/toastify';

import styles from './page.module.scss';

export default function ApplicationPage() {
  const { mutate } = useCreateAgentAvailabilityMutation();
  const [concerts, setConcerts] = useState([
    {
      id: '1e79edf4-12d7-4377-8f07-c46c353bedd4',
      title: '터치드 단독 콘서트 HIGHLIGHT Ⅲ',
      matchedCount: 4,
      isEnabled: true,
    },
    {
      id: 'a82289e4-f3d2-4c5f-9a44-29a06c1ef9c9',
      title: '기리보이 콘서트 “보통날”',
      matchedCount: 2,
      isEnabled: true,
    },
    {
      id: '7e39dfb4-1111-4377-8f07-c46c353b0000',
      title: '잔나비 콘서트 “소곡집”',
      matchedCount: 5,
      isEnabled: false,
    },
    {
      id: 'abcdedf4-12d7-4377-8f07-c46c353b1234',
      title: '혁오 단독 콘서트 “LOVE YA!”',
      matchedCount: 3,
      isEnabled: false,
    },
  ]);

  // Toggle 클릭 시 상태 변경
  const handleToggle = (concertId: string, value: boolean) => {
    setConcerts((prev) =>
      prev.map((concert) =>
        concert.id === concertId ? { ...concert, isEnabled: value } : concert,
      ),
    );

    // API 요청
    mutate(
      {
        concertId,
        accepting: value,
      },
      {
        onSuccess: () => {
          toastify({
            variant: 'success',
            description: value
              ? '신청 접수가 시작되었습니다'
              : '신청이 마감되었습니다',
          });
        },
        onError: () => {
          // 실패 시 rollback
          setConcerts((prev) =>
            prev.map((concert) =>
              concert.id === concertId
                ? { ...concert, isEnabled: !value }
                : concert,
            ),
          );

          toastify({
            variant: 'error',
            description: '상태 변경에 실패했습니다',
          });
        },
      },
    );
  };

  const activeConcerts = concerts.filter((c) => c.isEnabled);
  const closedConcerts = concerts.filter((c) => !c.isEnabled);

  return (
    <PageFrame
      appBar={{
        title: '신청 공연 관리',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <span className={styles.title}>신청 접수중</span>
        <Spacer size={24} />
        <div className={styles.list_container}>
          {activeConcerts.map((concert) => (
            <ApplicationConcertCard
              key={concert.id}
              concertId={concert.id}
              title={concert.title}
              matchedCount={concert.matchedCount}
              isEnabled={concert.isEnabled}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <Spacer size={40} />

        <span className={styles.title}>신청 마감</span>
        <Spacer size={24} />
        <div className={styles.list_container}>
          {closedConcerts.map((concert) => (
            <ApplicationConcertCard
              key={concert.id}
              concertId={concert.id}
              title={concert.title}
              matchedCount={concert.matchedCount}
              isEnabled={concert.isEnabled}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
