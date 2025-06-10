'use client';

import { use, useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import ConcertInfo from '@/app/concert/[id]/_shared/components/concert-info/concert-info';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import BottomSheet from '@/shared/components/bottom-sheet/bottom-sheet';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';
import Overlay from '@/shared/components/overlay/overlay';

import { useGetConcertDetail } from './_shared/services/query';
import styles from './page.module.scss';

const FIXED_AGENT_ID = 'a618fdf6-fa1d-431e-bbea-d3e4494e10f1';

// Mock API 호출 함수
const handleGetCard = async (pageParam: number) => {
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    agentId: FIXED_AGENT_ID,
    name: `대리인 닉네임 ${pageParam * 10 + index + 1}`,
    profileImage:
      'https://fastly.picsum.photos/id/515/320/200.jpg?hmac=d24pyllgU-WPlvGiChI8O4t8Wc2P3I67c3hVWDCLA-4',
    introduction: '한 줄 소개를 작성해주세요.',
    transactionCount: Math.floor(Math.random() * 100),
  }));
  return mockData;
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: concertItem } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const handleUserCardClick = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsBottomSheetOpen(true);
  };

  const { ref, inView } = useInView();

  const {
    data: userData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = 0 }) => handleGetCard(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length * 10 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Overlay isOpen={isBottomSheetOpen} onClose={toggleBottomSheet} />

      <div className={styles.container}>
        <AppBarSetter title="공연 상세 페이지" />
        {concertItem && <ConcertInfo concertItem={concertItem} />}

        <div className={styles.list_container}>
          <span className={styles.subtitle}>대리인</span>
          <span>원하는 대리인에게 요청해보세요!</span>
          {userData?.pages.map((page) =>
            page.map((user) => (
              // <UserCard key={user.agentId} user={user} onClick={toggleBottomSheet} />
              //agentId를 고정해놔서 수정한 코드, 추후에 위의 코드로 바꿔놓을 예정
              <UserCard
                key={`${user.agentId}-${user.name}`}
                user={user}
                onClick={() => handleUserCardClick(user.agentId)}
              />
            )),
          )}

          {/* 로딩 상태 처리 */}
          {isLoading && <p>로딩 중...</p>}
          {isFetchingNextPage && <p>더 불러오는 중...</p>}

          {/* 무한 스크롤 트리거 */}
          <div ref={ref} style={{ height: 10 }} />
        </div>

        <BottomSheet
          onClose={toggleBottomSheet}
          isOpen={isBottomSheetOpen}
          concertItem={concertItem}
          concertId={id}
          agentId={selectedAgentId ?? ''}
        />
      </div>
    </>
  );
};

export default Page;
