'use client';

import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import { useGetConcertList } from '@/app/_shared/services/query';
import { GetConcertListRequest } from '@/app/_shared/services/type';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import TabButton from '@/shared/components/button/tab-button/tab-button';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import styles from './search-tab-manager.module.scss';

const FIXED_AGENT_ID = '11d4486d-4524-4e21-8ec1-bffc764bc7bb';

// 👉 Mock API
const handleGetCard = async (pageParam: number) => {
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    agentId: FIXED_AGENT_ID,
    name: `대리인 닉네임 ${pageParam + index + 1}`,
    profileImage:
      'https://fastly.picsum.photos/id/515/320/200.jpg?hmac=d24pyllgU-WPlvGiChI8O4t8Wc2P3I67c3hVWDCLA-4',
    introduction: '한 줄 소개를 작성해주세요.',
    transactionCount: Math.floor(Math.random() * 100),
  }));
  return mockData;
};

export default function SearchTabManager() {
  const [activeTab, setActiveTab] = useState<'concert' | 'agent'>('concert');

  // 콘서트 리스트
  const request: GetConcertListRequest = {
    pageSize: 10,
    sortField: 'created_date',
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

  // 👉 대리인 리스트: react-query infinite scroll
  const {
    data: userData,
    fetchNextPage: fetchMoreUsers,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = 0 }) => handleGetCard(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length * 10 : undefined,
  });

  const { lastElementRef: agentLastElementRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchMoreUsers();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  // 👉 UserCard 클릭 핸들러
  const handleUserCardClick = (agentId: string) => {
    console.log(`[UserCard Clicked] agentId: ${agentId}`);
  };

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
            {userData?.pages.map((page) =>
              page.map((user) => (
                <UserCard
                  key={`${user.agentId}-${user.name}`}
                  user={user}
                  onClick={() => handleUserCardClick(user.agentId)}
                />
              )),
            )}

            {isLoading && <p>로딩 중...</p>}
            {isFetchingNextPage && <p>더 불러오는 중...</p>}

            <div ref={agentLastElementRef} style={{ height: 10 }} />
          </div>
        )}
      </div>
    </div>
  );
}
