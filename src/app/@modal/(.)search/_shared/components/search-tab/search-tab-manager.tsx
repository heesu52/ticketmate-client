'use client';

import { useMemo, useState } from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import UserCard from '@/app/concert/[id]/_shared/components/user-card/user-card';
import TabButton from '@/shared/components/ui/tab/tab';
import { TabItem } from '@/shared/components/ui/tab/tab.type';
import { AgentInfo, Concert } from '@/shared/types';

import styles from './search-tab-manager.module.scss';
import {
  useGetAgentSearchQuery,
  useGetConcertSearchQuery,
} from '../../services/query';
import { GetSearchRequest } from '../../services/type';

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
  const tabs: TabItem[] = useMemo(
    () => [
      { value: 'CONCERT', label: '공연', content: <div /> },
      { value: 'AGENT', label: '대리인', content: <div /> },
    ],
    [],
  );

  const keyword = searchRequest?.keyword ?? '';
  const request: GetSearchRequest = {
    keyword,
    searchType: active,
  };
  // enabled 조건: 키워드가 있고, 해당 탭이 활성화되어 있을 때만
  const enabledConcert = !!keyword && active === 'CONCERT';
  const enabledAgent = !!keyword && active === 'AGENT';

  // 공연 검색 조회(처음 검색을 제외하고 재검색 시 사용)
  const { data: concertRes, isFetching: isFetchingConcert } =
    useGetConcertSearchQuery(request, {
      enabled: enabledConcert,
    });

  // 대리인 검색 조회
  const { data: agentRes, isFetching: isFetchingAgent } =
    useGetAgentSearchQuery(request, {
      enabled: enabledAgent,
    });

  // 공연/대리인 정보 (타입이 달라서 별도로 지정)
  const concertList: Concert[] = concertRes?.content ?? [];
  const agentList: AgentInfo[] = agentRes?.content ?? [];

  const isFetching = active === 'CONCERT' ? isFetchingConcert : isFetchingAgent;

  console.log('keyword', keyword);
  console.log('searchRequest', searchRequest);

  return (
    <div className={styles.container}>
      {/* 탭 */}
      <TabButton
        items={tabs}
        value={active}
        onValueChange={(v) => setActive(v as 'CONCERT' | 'AGENT')}
      />

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
              {!isFetching && concertList.length === 0 && (
                <div className={styles.empty_container}>
                  <span>검색결과 없음</span>
                </div>
              )}
              {!isFetching && concertList.length > 0 && (
                <div className={styles.list_container}>
                  {concertList.map((concertItem) => (
                    <div
                      key={concertItem.concertId}
                      className={styles.card_wrapper}
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
              {!isFetching && agentList.length === 0 && (
                <div className={styles.empty_container}>
                  <span>검색결과 없음</span>
                </div>
              )}
              {!isFetching && agentList.length > 0 && (
                <div className={styles.list_container}>
                  {agentList.map((agent) => (
                    <div key={agent.agentId} className={styles.card_wrapper}>
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
  );
}
