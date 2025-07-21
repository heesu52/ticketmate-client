'use client';

import { use, useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import BottomSheet from '@/app/concert/[id]/_shared/components/bottom-sheet/bottom-sheet';
import ConcertInfo from '@/app/concert/[id]/_shared/components/concert-info/concert-info';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import UserSelect from '@/app/concert/[id]/_shared/components/user-select';
import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import { useGetUserListInfinite } from '@/app/concert/[id]/_shared/services/user-card/query';
import { ShareIcon } from '@/assets/icons';
import Overlay from '@/shared/components/overlay/overlay';
import { useScroll } from '@/shared/hooks/use-scroll';

import styles from './page.module.scss';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: concertItem } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [userListRequest, setUserListRequest] = useState({
    concertId: id,
    pageSize: 10,
    sortField: 'TOTAL_SCORE',
    sortDirection: 'DESC',
  });

  // 바텀 시트 토글
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  // 특정 유저카드 클릭 시 바텀시트 열기
  const handleUserCardClick = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsBottomSheetOpen(true);
  };

  const { ref, inView } = useInView();

  // 유저 리스트 무한 조회 (정렬 변경 시 자동으로 재요청됨)
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetUserListInfinite(userListRequest);

  // 스크롤 하단에 도달 시 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  // 정렬 옵션 선택 시 userListRequest 갱신 및 페이지 초기화
  const handleSelect = (value: string) => {
    setUserListRequest((prev) => ({
      ...prev,
      sortField: value,
    }));
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

          {data?.pages.map((page) =>
            page.content.map((user) => (
              <UserCard
                key={user.agentId}
                user={user}
                onClick={() => handleUserCardClick(user.agentId)}
              />
            )),
          )}

          {/* 로딩 상태 처리 */}
          {(isLoading || isFetchingNextPage) && (
            <p>{isLoading ? '로딩 중...' : '더 불러오는 중...'}</p>
          )}

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
