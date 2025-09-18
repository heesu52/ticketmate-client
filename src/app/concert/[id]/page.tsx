'use client';

import { use, useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import BottomSheet from '@/app/concert/[id]/_shared/components/bottom-sheet/bottom-sheet';
import ConcertInfo from '@/app/concert/[id]/_shared/components/concert-info/concert-info';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import { useGetUserListInfinite } from '@/app/concert/[id]/_shared/services/user-card/query';
import { ShareIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Overlay from '@/shared/components/overlay/overlay';
import Select from '@/shared/components/ui/select/select';
import { useScroll } from '@/shared/hooks/use-scroll';

import styles from './page.module.scss';

const options = [
  { value: 'TOTAL_SCORE', label: 'AI 추천순' },
  { value: 'AVERAGE_RATING', label: '별점순' },
  { value: 'REVIEW_COUNT', label: '후기 많은순' },
  { value: 'FOLLOWER_COUNT', label: '팔로워 순' },
  { value: 'RECENT_SUCCESS_COUNT', label: '최근 30일 성공 순' },
];

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: concertItem } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [request, setRequest] = useState({
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
    useGetUserListInfinite(request);

  // 스크롤 하단에 도달 시 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  // 정렬 옵션 선택 시 userListRequest 갱신 및 페이지 초기화
  const handleSelect = (value: string) => {
    setRequest((prev) => ({
      ...prev,
      sortField: value,
    }));
  };
  const isScrolled = useScroll({ threshold: 247 - 56 });
  return (
    <PageFrame
      appBar={{
        title: '공연 상세페이지',
        showBack: true,
        right: <ShareIcon />,
      }}
      bottomNav={false}
    >
      <Overlay isOpen={isBottomSheetOpen} onClose={toggleBottomSheet} />

      <div className={styles.container}>
        {concertItem && <ConcertInfo concertItem={concertItem} />}

        <div className={styles.list_container}>
          <div className={styles.title_container}>
            <span className={styles.subtitle}>대리인</span>

            <div className={styles.select_container}>
              <Select
                options={options}
                value={request.sortField || ''}
                onValueChange={(value: string) => handleSelect(value)}
                variant="filter"
              />
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
    </PageFrame>
  );
};

export default Page;
