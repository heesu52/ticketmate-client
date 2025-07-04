'use client';

import { useState } from 'react';

// import ConcertList from '@/app/_components/concert/concert-list/concert-list';
import TabButton from '@/shared/components/button/tab-button/tab-button';

import styles from './search-tab-manager.module.scss';

export default function SearchTabManager() {
  const [activeTab, setActiveTab] = useState<'concert' | 'agent'>('concert');

  return (
    <div className={styles.container}>
      <div className={styles.tab_container}>
        <TabButton
          label="공연"
          isActive={activeTab === 'concert'}
          onClick={() => setActiveTab('concert')}
        />

        <TabButton
          label="대리인"
          isActive={activeTab === 'agent'}
          onClick={() => setActiveTab('agent')}
        />
      </div>
      <div className={styles.list_container}>
        {activeTab === 'concert' ? (
          <div>공연 리스트 들어갈 자리</div>
        ) : (
          <div>대리인 리스트 들어갈 자리</div>
        )}
      </div>
    </div>
  );
}
