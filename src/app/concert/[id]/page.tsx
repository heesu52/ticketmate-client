'use client';

import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import BottomSheet from '@/app/concert/[id]/_components/bottom-sheet/bottom-sheet';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';
import Overlay from '@/shared/components/overlay/overlay';

import UserCard from './_components/user-card/user-card';
import styles from './page.module.scss';

// Mock API 호출 함수
const handleGetCard = async (pageParam: number) => {
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    id: pageParam * 10 + index + 1,
    name: `의문의 티켓터 ${pageParam * 10 + index + 1}`,
    profileImage: 'https://via.placeholder.com/50',
    introduction: '한 줄 소개를 작성해주세요.',
    transactionCount: Math.floor(Math.random() * 100),
  }));
  return mockData;
};

export default function Page() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const { ref, inView } = useInView();

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
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

      <AppBarSetter title="공연 상세 페이지" />

      <div className={styles.container}>
        <div className={styles.title_container}>
          <div className={styles.title}>
            터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
          </div>

          <div className={styles.detail_container}>
            <div className={styles.detail}>
              <span className={styles.category}>일자</span>
              <span className={styles.info}>24/08/27 ~ 24/09/26</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>장소</span>
              <span className={styles.info}>올림픽공원 핸드볼 경기장</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>예매처</span>
              <span className={styles.info}>YES24</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>무통장입금</span>
              <span className={styles.info}>가능</span>
            </div>

            <Link className={styles.link} href="/">
              정보 자세히 보기
            </Link>
          </div>
        </div>

        <hr className={styles.line} />
        <div className={styles.list_container}>
          <span className={styles.subtitle}>대리인</span>
          {data?.pages.map((page) =>
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

        <BottomSheet onClose={toggleBottomSheet} isOpen={isBottomSheetOpen} />
      </div>
    </>
  );
}
