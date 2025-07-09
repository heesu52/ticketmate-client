'use client';

import { useEffect } from 'react';

import SearchSelection from '@/app/@modal/(.)search/_shared/components/search-selection/search-selection';
import SearchTabManager from '@/app/@modal/(.)search/_shared/components/search-tab/search-tab-manager';
import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';

import styles from './page.module.scss';

export default function Search() {
  useEffect(() => {
    // 모달이 열릴 때 스크롤 상단 고정
    window.scrollTo(0, 0);

    // body 스크롤 잠금
    document.body.style.overflow = 'hidden';

    return () => {
      // 모달이 닫힐 때 원래대로 복원
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <AppBarSetter title="검색" />
      <div className={styles.container}>
        <SearchSelection />
        <SearchTabManager />
      </div>
    </>
  );
}
