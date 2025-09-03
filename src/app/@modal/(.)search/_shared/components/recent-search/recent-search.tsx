'use client';

import React from 'react';

import {
  useDeleteRecentSearchMutation,
  useRecentSearchQuery,
} from '@/app/@modal/(.)search/_shared/services/query';

import styles from './recent-search.module.scss';

export default function RecentSearch() {
  const { data: recentSearch } = useRecentSearchQuery();
  const { mutate } = useDeleteRecentSearchMutation();

  const handleDeleteAll = () => {
    mutate();
  };

  console.log(recentSearch);
  return (
    <div className={styles.container}>
      <div className={styles.span_container}>
        <span className={styles.title}>최근 검색어</span>
        <button className={styles.delete} onClick={handleDeleteAll}>
          전체삭제
        </button>
      </div>
      <div className={styles.tag_container}>
        {recentSearch?.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
