'use client';

import { useState } from 'react';

import HistoryList from '@/app/history/_shared/components/historylist/history-list';
import TabButton from '@/shared/components/button/tab-button/tab-button';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';

import styles from './page.module.scss';

export default function Page() {
  const [isCurrentTab, setIsCurrentTab] = useState(true);
  return (
    <>
      <AppBarSetter title="신청 내역" />

      <div className={styles.container}>
        <div className={styles.button_container}>
          <TabButton
            label={'현재 신청내역'}
            size="small"
            isActive={isCurrentTab}
            onClick={() => setIsCurrentTab(true)}
          ></TabButton>
          <TabButton
            label={'과거 신청내역'}
            size="small"
            isActive={!isCurrentTab}
            onClick={() => setIsCurrentTab(false)}
          ></TabButton>
        </div>
        <HistoryList />
      </div>
    </>
  );
}
