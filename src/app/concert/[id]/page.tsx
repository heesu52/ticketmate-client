'use client';

import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import Badge from '@/shared/components/badge/badge';
import BottomSheet from '@/shared/components/bottom-sheet/bottom-sheet';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';
import Overlay from '@/shared/components/overlay/overlay';

import UserCard from './_components/user-card/user-card';
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

      <main className={styles.container}>
        <AppBarSetter title="공연 상세 페이지" />
        <div className={styles.background_container} />

        {/* 공연 정보 */}
        <article className={styles.title_container}>
          <div className={styles.image}>
            {/* 추후 next의 Image 로 변경 예정 */}
            <img
              src={'https://placehold.co/400x600'}
              alt="터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ"
              width={140}
              height={186}
            />
          </div>
          <div className={styles.tag}>
            <Badge type="type-a">선예매까지 D-12</Badge>
            <Badge type="type-a">일반예매까지 D-12</Badge>
          </div>
          <h1 className={styles.title}>
            터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
          </h1>

          {/* 공연 싱세 정보 */}
          <section className={styles.info_container}>
            <dl className={styles.detail_container}>
              <div className={styles.detail}>
                <span className={styles.category}>공연 일자</span>
                <span className={styles.info}>24/08/27 ~ 24/09/26</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.category}>공연장</span>
                <span className={styles.info}>올림픽공원 핸드볼 경기장</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.category}>예매처</span>
                <Link className={styles.link} href="https://ticket.yes24.com">
                  YES24
                </Link>
              </div>
            </dl>
          </section>
        </article>

        {/* 대리인 리스트 */}
        <section className={styles.list_container}>
          <h2 className={styles.subtitle}>대리인</h2>
          <span>원하는 대리인에게 요청해보세요!</span>
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
        </section>

        <BottomSheet onClose={toggleBottomSheet} isOpen={isBottomSheetOpen} />
      </main>
    </>
  );
}
