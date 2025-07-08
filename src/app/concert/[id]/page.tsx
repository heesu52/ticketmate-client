'use client';

import { use, useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import BottomSheet from '@/app/concert/[id]/_shared/components/bottom-sheet/bottom-sheet';
import ConcertInfo from '@/app/concert/[id]/_shared/components/concert-info/concert-info';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import UserSelect from '@/app/concert/[id]/_shared/components/user-select';
import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import { ShareIcon } from '@/assets/icons';
import Overlay from '@/shared/components/overlay/overlay';
import { useScroll } from '@/shared/hooks/use-scroll';

import styles from './page.module.scss';

//고정된 대리인 ID(추후 삭제 예정)
const FIXED_AGENT_ID = '11d4486d-4524-4e21-8ec1-bffc764bc7bb';

// Mock API 호출 함수 (임시)
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

  // 특정 유저카드 클릭 시 바텀시트 열기
  const handleUserCardClick = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsBottomSheetOpen(true);
  };

  const { ref, inView } = useInView();

  // 무한스크롤 데이터 fetch
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

  // 대리인 정렬 기능 구현 전이므로 콘솔 출력으로 대처
  const handleSelect = (value: string) => {
    console.log('선택된 정렬 옵션:', value);
  };

  const isScrolled = useScroll({ threshold: 247 - 56 });
  return (
    <>
      <AppBarSetter
        hasBackground={isScrolled}
        title="공연 상세 페이지"
        action={
          <button
            onClick={() => {
              alert('준비중인 기능입니다.');
            }}
          >
            <ShareIcon
              width={20}
              height={20}
              fill={isScrolled ? 'var(--textColor-main)' : 'var(--white)'}
            />
          </button>
        }
      />

      <Overlay isOpen={isBottomSheetOpen} onClose={toggleBottomSheet} />

      <div className={styles.container}>
        {concertItem && <ConcertInfo concertItem={concertItem} />}

        <div className={styles.list_container}>
          <div className={styles.title_container}>
            <span className={styles.subtitle}>대리인</span>

            <div className={styles.select_container}>
              <UserSelect onSelect={handleSelect} />
            </div>
          </div>

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
