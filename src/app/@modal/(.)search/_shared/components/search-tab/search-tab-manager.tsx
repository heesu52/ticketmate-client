'use client';

import { useState } from 'react';

// import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
// import { useGetConcertList } from '@/app/_shared/services/query';
// import { GetConcertListRequest } from '@/app/_shared/services/type';
import TabButton from '@/shared/components/button/tab-button/tab-button';
// import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import styles from './search-tab-manager.module.scss';

export default function SearchTabManager() {
  const [activeTab, setActiveTab] = useState<'concert' | 'agent'>('concert');

  return (
    <div className={styles.container}>
      <div className={styles.tab_container}>
        <TabButton
          label="공연 7" //검색결과 Length로 변경 필요
          isActive={activeTab === 'concert'}
          onClick={() => setActiveTab('concert')}
        />
        <TabButton
          label="대리인 14" //검색결과 Length로 변경 필요
          isActive={activeTab === 'agent'}
          onClick={() => setActiveTab('agent')}
        />
      </div>

      {/* 추후 검색 결과 api를 연동하여 리스트를 출력, 현재는 테스트를 위해 공연/대리인 리스트를 출력 중  */}
      <div className={styles.list_container}></div>
    </div>
  );
}
