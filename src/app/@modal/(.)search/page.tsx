'use client';

import { useEffect } from 'react';

import RecentSearch from '@/app/@modal/(.)search/_shared/components/recent-search/recent-search';
import SearchInput from '@/app/@modal/(.)search/_shared/components/search-input/search-input';
import SearchTabManager from '@/app/@modal/(.)search/_shared/components/search-tab/search-tab-manager';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function Search() {
  useEffect(() => {
    // 모달이 열릴 때 스크롤 상단 고정
    window.scrollTo(0, 0);

    return () => {
      // 모달이 닫힐 때 원래대로 복원
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <PageFrame appBar={{ title: '검색', showBack: true }} bottomNav={false}>
      <div className={styles.container}>
        <SearchInput />
        <RecentSearch />
        <SearchTabManager />
      </div>
    </PageFrame>
  );
}
