'use client';

import { use, useState } from 'react';

import AgentList from '@/app/concert/[id]/_shared/components/agent-list/agent-list';
import BottomSheet from '@/app/concert/[id]/_shared/components/bottom-sheet/bottom-sheet';
import ConcertInfo from '@/app/concert/[id]/_shared/components/concert-info/concert-info';
import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import { ShareIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Overlay from '@/shared/components/overlay/overlay';

import styles from './page.module.scss';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: concertItem } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // 바텀 시트 토글
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  // 특정 유저카드 클릭 시 바텀시트 열기
  const handleAgentCardClick = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsBottomSheetOpen(true);
  };

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
        {/* 공연정보 */}
        {concertItem && <ConcertInfo concertItem={concertItem} />}

        {/* 대리인 리스트 */}
        <AgentList id={id} onAgentClick={handleAgentCardClick} />

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
