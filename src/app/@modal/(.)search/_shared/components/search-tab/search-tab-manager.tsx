'use client';

import { useState } from 'react';

// import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
// import { useGetConcertList } from '@/app/_shared/services/query';
// import { GetConcertListRequest } from '@/app/_shared/services/type';

import TabButton from '@/shared/components/ui/tab/tab';
import { TabItem } from '@/shared/components/ui/tab/tab.type';

import styles from './search-tab-manager.module.scss';

export default function SearchTabManager() {
  const [tabs, setTabs] = useState<TabItem[]>([
    { value: 'CONERT', label: '공연', content: <div>공연리스트</div> },
    { value: 'AGENT', label: '대리인', content: <div>대리인리스트</div> },
  ]);
  const [active, setActive] = useState('CONERT');

  return (
    <div className={styles.container}>
      <div className={styles.tab_container}>
        <TabButton items={tabs} value={active} onValueChange={setActive} />
      </div>
      <div className={styles.list_container}></div>
    </div>
  );
}
