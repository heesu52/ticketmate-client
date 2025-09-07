'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/@modal/(.)search/_shared/services/query-key';
import { GetSearchRequest } from '@/app/@modal/(.)search/_shared/services/type';
import RecentSearch from '@/app/search/_shared/components/recent-search/recent-search';
import SearchBar from '@/app/search/_shared/components/search-bar/search-bar';
import SearchTabManager from '@/app/search/_shared/components/search-tab/search-tab-manager';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function Search() {
  const queryClient = useQueryClient();
  const [inputMessage, setInputMessage] = useState('');
  const [localRecent, setLocalRecent] = useState<string[]>([]);
  const [searchRequest, setSearchRequest] = useState<GetSearchRequest | null>(
    null,
  );

  // 로그인 여부에 따라 최근검색어 저장 및 조회(지금은 ENV로 로그인을 하기 때문에 테스트용으로 작성)
  const isLoggedIn = !!process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  // 최초 검색 시 searchBar와 searchTab에 요청값 전달
  const handleSearch = (input: string) => {
    if (!input.trim()) return;

    const request: GetSearchRequest = {
      keyword: input,
      searchType: 'CONCERT',
    };
    setSearchRequest(request);

    if (isLoggedIn) {
      // 캐시를 업데이트 해서 캐시에 저장된 데이터를 불러옴
      queryClient.setQueryData<string[]>(
        queryKey.getRecentSearches(),
        (old = []) => {
          const updated = [input, ...old.filter((item) => item !== input)];
          return updated;
        },
      );
    } else {
      // 비로그인 상태면 localStorage에 저장
      const recent: string[] = JSON.parse(
        localStorage.getItem('recentSearches') || '[]',
      );
      const updatedRecent = [input, ...recent.filter((item) => item !== input)];
      setLocalRecent(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    }
  };

  const handleRecentClick = (keyword: string) => {
    setInputMessage(keyword);
    handleSearch(keyword);
  };

  // 최근검색어 업데이트해서 UI에 반영
  useEffect(() => {
    if (!isLoggedIn) {
      const stored = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      setLocalRecent(stored);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // 모달이 열릴 때 스크롤 상단 고정
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      // 모달이 닫힐 때 원래대로 복원
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <PageFrame appBar={{ title: '검색', showBack: true }} bottomNav={false}>
      <div className={styles.container}>
        <div className={styles.search_container}>
          <SearchBar
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSearch={(value) => handleSearch(value)}
          />

          <RecentSearch
            isLoggedIn={isLoggedIn}
            localRecent={localRecent}
            setLocalRecent={setLocalRecent}
            onClickRecent={handleRecentClick}
          />
        </div>

        <div className={styles.tab_container}>
          <SearchTabManager searchRequest={searchRequest} />
        </div>
      </div>
    </PageFrame>
  );
}
