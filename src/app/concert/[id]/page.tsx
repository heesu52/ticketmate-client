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

// Mock API 호출 함수
const handleGetCard = async (pageParam: number) => {
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    id: pageParam * 10 + index + 1,
    name: `대리인 닉네임 ${pageParam * 10 + index + 1}`,
    profileImage: 'https://via.placeholder.com/50',
    introduction: '한 줄 소개를 작성해주세요.',
    transactionCount: Math.floor(Math.random() * 100),
  }));
  return mockData;
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: concertData } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
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
        {concertData && <ConcertInfo concertItem={concertData} />}

        <div className={styles.list_container}>
          <span className={styles.subtitle}>대리인</span>
          <span>원하는 대리인에게 요청해보세요!</span>
          {userData?.pages.map((page) =>
            page.map((user) => (
              <UserCard key={user.id} user={user} onClick={toggleBottomSheet} />
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
          OpenDate={concertData}
        />
      </div>
    </>
  );
};

export default Page;
