'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import SearchBar from '@/app/@modal/(.)search/_shared/components/search-input/search-bar';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import RecentSearch from './_shared/components/recent-search/recent-search';
import SearchTabManager from './_shared/components/search-tab/search-tab-manager';
import { useGetConcertSearchQuery } from './_shared/services/query';
import { GetSearchRequest } from './_shared/services/type';
import styles from './page.module.scss';

export default function Search() {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState('');
  const [searchRequest, setSearchRequest] = useState<GetSearchRequest | null>(
    null,
  );
  const { data, refetch } = useGetConcertSearchQuery(
    searchRequest ?? { keyword: '', searchType: 'CONCERT' },
  );

  const searchData = data?.content ?? [];

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;

    const request: GetSearchRequest = {
      keyword,
      searchType: 'CONCERT',
    };
    setSearchRequest(request);
    refetch();
    queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
  };

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
        <SearchBar
          keyword={keyword} // <-- 여기로 내려주기
          onChange={setKeyword} // <-- SearchBar에서 keyword를 바꾸면 상태 업데이트
          onSearch={() => handleSearch(keyword)}
        />
        <RecentSearch />
        <SearchTabManager searchData={searchData} />
      </div>
    </PageFrame>
  );
}
