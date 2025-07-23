'use client';

import { useState } from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import { useGetConcertList } from '@/app/_shared/services/query';
import { GetConcertListRequest } from '@/app/_shared/services/type';
import TabButton from '@/shared/components/button/tab-button/tab-button';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import styles from './search-tab-manager.module.scss';

export default function SearchTabManager() {
  const [activeTab, setActiveTab] = useState<'concert' | 'agent'>('concert');

  // 콘서트 리스트
  const request: GetConcertListRequest = {
    pageSize: 10,
    sortField: 'CREATED_DATE',
    sortDirection: 'ASC',
  };

  const {
    data: concertData,
    fetchNextPage: fetchMoreConcerts,
    hasNextPage: hasMoreConcerts,
    isFetchingNextPage: isFetchingConcerts,
  } = useGetConcertList(request);

  const { lastElementRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasMoreConcerts && !isFetchingConcerts) {
        fetchMoreConcerts();
      }
    },
    enabled: hasMoreConcerts && !isFetchingConcerts,
  });
  const concertList = concertData?.content;

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <span className={styles.span}>
          {activeTab === 'concert' ? '공연' : '대리인'} 검색결과
        </span>
        <span className={styles.asterisk}>0</span>
      </div>

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

      {/* 추후 검색 결과 api를 연동하여 리스트를 출력, 현재는 테스트를 위해 공연/대리인 리스트를 출력 중  */}
      <div className={styles.list_container}>
        {activeTab === 'concert' ? (
          concertList?.map((concertItem, index) => (
            <div
              key={concertItem.concertId}
              ref={
                index === concertList.length - 1 ? lastElementRef : undefined
              }
              className={styles.card_wrapper}
            >
              <ConcertCard concertItem={concertItem} />
            </div>
          ))
        ) : (
          <div className={styles.agent_list_container}>
            {/* 공연id가 없어서 수정된 대리인 호출 api를 사용할 수 없어 주석처리, 추후 검색 api로 연동 */}
            {/* {data?.pages.map((page) =>
              page.content.map((user) => (
                <UserCard
                  key={user.agentId}
                  user={user}
                  onClick={() => handleUserCardClick(user.agentId)}
                />
              )),
            )}
            {/* 로딩 상태 처리 */}
            {/* {(isLoading || isFetchingNextPage) && (
              <p>{isLoading ? '로딩 중...' : '더 불러오는 중...'}</p>
            )} */}

            {/* 무한 스크롤 트리거 */}
            {/* <div ref={ref} style={{ height: 10 }} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
