'use client';
import React from 'react';

import RecentSuccessList from '@/app/my/recent-success/recent-success-list/recent-success-list';
import SuccessList from '@/app/my/success/_shared/components/success-list';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { useMember } from '@/shared/context/member-context';

import styles from './page.module.scss';

export default function SuccessPage() {
  const { member } = useMember();

  return (
    <PageFrame
      appBar={{
        title: '성공 신청내역',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        {member?.memberType === 'AGENT' && (
          <div className={styles.main_container}>
            <span className={styles.title}>대표 성공내역</span>
            <span className={styles.subtitle}>
              대리인으로 인정받은 대표 성공내역입니다.
            </span>
            <Spacer size={16} />
            <SuccessList />
            <Spacer size={40} />
          </div>
        )}

        {/*  신청내역 날짜별로 */}
        <div className={styles.list_container}>
          <div className={styles.history_container}>
            <span className={styles.subtitle}>2024/12/09(일)</span>
            <RecentSuccessList />
          </div>
          <div className={styles.history_container}>
            <span className={styles.subtitle}>2024/12/09(일)</span>
            <RecentSuccessList />
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
