'use client';
import React from 'react';

import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useMember } from '@/shared/context/member-context';

import styles from './page.module.scss';

export default function ApplicationPage() {
  const { member } = useMember();

  return (
    <PageFrame
      appBar={{
        title: '신청 공연 관리',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.open_container}>
          <span className={styles.title}>신청 접수중</span>
        </div>

        <div className={styles.closed_container}>
          <span className={styles.title}>신청 마감</span>
        </div>
      </div>
    </PageFrame>
  );
}
