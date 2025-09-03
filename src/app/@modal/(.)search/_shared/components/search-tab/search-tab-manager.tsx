'use client';

import { useState } from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import TabButton from '@/shared/components/ui/tab/tab';
import { TabItem } from '@/shared/components/ui/tab/tab.type';
import { Concert } from '@/shared/types';

import styles from './search-tab-manager.module.scss';

interface SearchTabManagerProps {
  searchData: Concert[];
}

export default function SearchTabManager({
  searchData,
}: SearchTabManagerProps) {
  const [tabs, setTabs] = useState<TabItem[]>([
    { value: 'CONCERT', label: '공연', content: <div></div> },
    { value: 'AGENT', label: '대리인', content: <div></div> },
  ]);

  const [active, setActive] = useState('CONCERT');

  return (
    <div className={styles.container}>
      {/* 탭 버튼 영역 */}

      <TabButton items={tabs} value={active} onValueChange={setActive} />

      {/* 리스트 영역 */}
      {active === 'CONCERT' ? (
        searchData?.length === 0 ? (
          <div className={styles.empty_container}>
            <span>검색결과 없음</span>
          </div>
        ) : (
          <div className={styles.list_container}>
            {searchData?.map((concertItem) => (
              <div key={concertItem.concertId} className={styles.card_wrapper}>
                <ConcertCard concertItem={concertItem} />
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
