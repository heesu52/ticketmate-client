'use client';

import React from 'react';

import {
  useDeleteRecentSearchMutation,
  useRecentSearchQuery,
} from '@/app/@modal/(.)search/_shared/services/query';

import styles from './recent-search.module.scss';

interface RecentSearchProps {
  isLoggedIn: boolean;
  localRecent: string[];
  setLocalRecent: React.Dispatch<React.SetStateAction<string[]>>;
  onClickRecent?: (keyword: string) => void;
}

export default function RecentSearch({
  isLoggedIn,
  localRecent,
  setLocalRecent,
  onClickRecent,
}: RecentSearchProps) {
  const { data: recentSearch } = useRecentSearchQuery(isLoggedIn);
  const { mutate } = useDeleteRecentSearchMutation();

  // 로그인 여부에 따른 최근검색어 삭제
  const handleDeleteAll = () => {
    if (isLoggedIn) {
      mutate();
    } else {
      localStorage.removeItem('recentSearches');
      setLocalRecent([]);
    }
  };

  // 로그인 여부에 따라 데이터를 응답값 or localstorage
  const recentList = isLoggedIn ? recentSearch : localRecent;

  return (
    <div className={styles.container}>
      <div className={styles.span_container}>
        <span className={styles.title}>최근 검색어</span>
        <button className={styles.delete} onClick={handleDeleteAll}>
          전체삭제
        </button>
      </div>

      <div className={styles.tag_container}>
        {recentList?.map((tag, index) => (
          <div
            key={index}
            className={styles.tag}
            onClick={() => onClickRecent?.(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
