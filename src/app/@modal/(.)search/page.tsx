'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import SearchBar from '@/app/@modal/(.)search/_shared/components/search-input/search-bar';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import RecentSearch from './_shared/components/recent-search/recent-search';
import SearchTabManager from './_shared/components/search-tab/search-tab-manager';
import { GetSearchRequest } from './_shared/services/type';
import styles from './page.module.scss';

export default function Search() {
  const queryClient = useQueryClient();
  const [searchRequest, setSearchRequest] = useState<GetSearchRequest | null>(
    null,
  );

  const handleSearch = (input: string) => {
    if (!input.trim()) return;

    const request: GetSearchRequest = {
      keyword: input,
      searchType: 'CONCERT',
    };
    setSearchRequest(request);
    //  검색하고 바로 최근검색어 추가되게 하는건데 일단 보류
    // queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
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
        <SearchBar onSearch={(value) => handleSearch(value)} />
        <RecentSearch />
        <SearchTabManager searchRequest={searchRequest} />
      </div>
    </PageFrame>
  );
}
