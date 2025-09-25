'use client';

import { useState } from 'react';

import { useGetAgentList } from '@/app/concert/[id]/_shared/services/agent-card/query';
import AgentCard from '@/shared/components/features/agent/agent-card/agent-card';
import Select from '@/shared/components/ui/select/select';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import styles from './agent-list.module.scss';

const options = [
  { value: 'TOTAL_SCORE', label: 'AI 추천순' },
  { value: 'AVERAGE_RATING', label: '별점순' },
  { value: 'REVIEW_COUNT', label: '후기 많은순' },
  { value: 'FOLLOWER_COUNT', label: '팔로워 순' },
  { value: 'RECENT_SUCCESS_COUNT', label: '최근 30일 성공 순' },
];

type AgentListProps = {
  id: string;
  onAgentClick: (agentId: string) => void;
};

const AgentList = ({ id, onAgentClick }: AgentListProps) => {
  const [request, setRequest] = useState({
    concertId: id,
    pageSize: 10,
    sortField: 'TOTAL_SCORE',
    sortDirection: 'DESC',
  });

  // 유저 리스트 무한 조회 (정렬 변경 시 자동으로 재요청됨)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAgentList(request);

  const { lastElementRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const handleSelect = (value: string) => {
    setRequest((prev) => ({
      ...prev,
      sortField: value,
    }));
  };

  const agentList = data?.content;

  return (
    <div className={styles.container}>
      <div className={styles.list_container}>
        <div className={styles.title_container}>
          <span className={styles.title}>대리인</span>

          <div className={styles.select_container}>
            <Select
              options={options}
              value={request.sortField || ''}
              onValueChange={(value: string) => handleSelect(value)}
              variant="filter"
            />
          </div>
        </div>

        {agentList?.map((agentInfo, index) => (
          <div
            key={agentInfo.agentId}
            ref={index === agentList.length - 1 ? lastElementRef : undefined}
            className={styles.card_wrapper}
            onClick={() => onAgentClick(agentInfo.agentId)}
          >
            <AgentCard agent={agentInfo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
