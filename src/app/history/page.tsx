'use client';

import { useState } from 'react';

import HistoryList from '@/app/history/_shared/components/history-list/history-list';
import TabButton from '@/shared/components/button/tab-button/tab-button';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';

import styles from './page.module.scss';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<'current' | 'past' | 'cancel'>(
    'current',
  );

  return (
    <>
      <AppBarSetter title="신청 내역" />

      <div className={styles.container}>
        <div className={styles.button_container}>
          <TabButton
            label="현재 신청내역"
            size="small"
            isActive={selectedTab === 'current'}
            onClick={() => setSelectedTab('current')}
          />
          <TabButton
            label="과거 신청내역"
            size="small"
            isActive={selectedTab === 'past'}
            onClick={() => setSelectedTab('past')}
          />
        </div>
        <HistoryList tab={selectedTab} />
      </div>
    </>
  );
}
