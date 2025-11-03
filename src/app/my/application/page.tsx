'use client';
import React, { useState } from 'react';

import ApplicationConcertCard from '@/app/my/application/_shared/components/application-concert-card/application-concert-card';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

export default function ApplicationPage() {
  // 공연 목록 예시
  const [concerts, setConcerts] = useState([
    {
      id: 1,
      title: '터치드 단독 콘서트 HIGHLIGHT Ⅲ',
      matchedCount: 4,
      isEnabled: true,
    },
    {
      id: 2,
      title: '기리보이 콘서트 “보통날”',
      matchedCount: 2,
      isEnabled: true,
    },
    {
      id: 3,
      title: '잔나비 콘서트 “소곡집”',
      matchedCount: 5,
      isEnabled: false,
    },
    {
      id: 4,
      title: '혁오 단독 콘서트 “LOVE YA!”',
      matchedCount: 3,
      isEnabled: false,
    },
  ]);

  // Toggle 클릭 시 상태 변경
  const handleToggle = (id: number, value: boolean) => {
    setConcerts((prev) =>
      prev.map((concert) =>
        concert.id === id ? { ...concert, isEnabled: value } : concert,
      ),
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
              title={concert.title}
              matchedCount={concert.matchedCount}
              isEnabled={concert.isEnabled}
              onToggle={(value) => handleToggle(concert.id, value)}
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
              title={concert.title}
              matchedCount={concert.matchedCount}
              isEnabled={concert.isEnabled}
              onToggle={(value) => handleToggle(concert.id, value)}
            />
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
