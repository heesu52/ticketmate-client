'use client';

import { useMemo, useState } from 'react';

import {
  useGetAgentSearchQuery,
  useGetConcertSearchQuery,
} from '@/app/@modal/(.)search/_shared/services/query';
import { GetSearchRequest } from '@/app/@modal/(.)search/_shared/services/type';
import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import TabButton from '@/shared/components/ui/tab/tab';
import { TabItem } from '@/shared/components/ui/tab/tab.type';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { AgentInfo, Concert } from '@/shared/types';

import styles from './search-tab-manager.module.scss';

interface SearchTabManagerProps {
  searchRequest: GetSearchRequest | null;
}

export default function SearchTabManager({
  searchRequest,
}: SearchTabManagerProps) {
  // 탭의 기본값은 CONCERT로 설정 -> 탭 클릭 시 상태 값 변경
  const [active, setActive] = useState<'CONCERT' | 'AGENT'>(
    searchRequest?.searchType ?? 'CONCERT',
  );

  // 탭 변경 시 호출되는 api의 요청값
  const keyword = searchRequest?.keyword ?? '';
  const request = useMemo<GetSearchRequest>(
    () => ({
      keyword,
      searchType: active,
    }),
    [keyword, active],
  );
  // enabled 조건: 키워드가 있고, 해당 탭이 활성화되어 있을 때만
  const enabledConcert = !!keyword && active === 'CONCERT';
  const enabledAgent = !!keyword && active === 'AGENT';

  // 공연 검색 조회 (처음 검색을 제외하고 사용)
  const {
    data: concertRes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetConcertSearchQuery(request, {
    enabled: enabledConcert,
  });

  // 대리인 검색 조회 (현재 서버 500 에러 발생 -> 백엔드에서 수정 중)
  const { data: agentRes } = useGetAgentSearchQuery(request, {
    enabled: enabledAgent,
  });

  // 공연/대리인 정보 (타입이 달라서 별도로 지정)
  const concertList: Concert[] = concertRes?.content ?? [];
  const agentList: AgentInfo[] = agentRes?.content ?? [];
  const concertCount =
    active === 'CONCERT'
      ? (concertRes?.concertCount ?? 0)
      : (agentRes?.concertCount ?? 0);

  const agentCount =
    active === 'AGENT'
      ? (agentRes?.agentCount ?? 0)
      : (concertRes?.agentCount ?? 0);

  // const isFetching = active === 'CONCERT' ? isFetchingConcert : isFetchingAgent;

  const tabs: TabItem[] = useMemo(
    () => [
      { value: 'CONCERT', label: `공연 ${concertCount}` },
      { value: 'AGENT', label: `대리인 ${agentCount}` },
    ],
    [concertCount, agentCount],
  );

  const { lastElementRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  return (
    <div className={styles.container}>
      {/* 탭 */}
      <TabButton
        items={tabs}
        value={active}
        onValueChange={(v) => setActive(v as 'CONCERT' | 'AGENT')}
      />

      <div className={styles.tab_content_container}>
        {/* 검색결과 리스트 */}
        {/* 검색을 안했다면 컴포넌트 노출x */}
        {searchRequest && (
          <>
            {active === 'CONCERT' ? (
              <>
                {/* 로딩을 확인하기 위해 넣었는데 추후 icon으로 수정필요
              {isFetching && (
                <div className={styles.skeleton}>로딩중/div>
              )} */}
                {concertList.length === 0 && (
                  <div className={styles.empty_container}>
                    <span>검색결과 없음</span>
                  </div>
                )}
                {concertList.length > 0 && (
                  <div className={styles.list_container}>
                    {concertList.map((concertItem, index) => (
                      <div
                        className={styles.card_wrapper}
                        key={concertItem.concertId}
                        ref={
                          index === concertList.length - 1
                            ? lastElementRef
                            : undefined
                        }
                      >
                        <ConcertCard concertItem={concertItem} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* 로딩을 확인하기 위해 넣었는데 추후 icon으로 수정필요
              {isFetching && (
                <div className={styles.skeleton}>로딩중/div>
              )} */}
                {agentList.length === 0 && (
                  <div className={styles.empty_container}>
                    <span>검색결과 없음</span>
                  </div>
                )}
                {agentList.length > 0 && (
                  <div className={styles.list_container}>
                    {agentList.map((agent, index) => (
                      <div
                        className={styles.card_wrapper}
                        key={agent.agentId}
                        ref={
                          index === agentList.length - 1
                            ? lastElementRef
                            : undefined
                        }
                      >
                        <UserCard user={agent} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
