'use client';

import React, { useState } from 'react';

import styles from './recent-search.module.scss';

export default function RecentSearch() {
  const [inputMessage, setInputMessage] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      if (!recentSearches.includes(inputMessage.trim())) {
        setRecentSearches([inputMessage.trim(), ...recentSearches]);
      }
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.span_container}>
        <span className={styles.title}>최근 검색어</span>
        <button className={styles.delete} onClick={() => setRecentSearches([])}>
          전체삭제
        </button>
      </div>
      <div className={styles.tag_container}>
        {recentSearches.map((term, index) => (
          <div
            key={index}
            className={styles.tag}
            onClick={() => setInputMessage(term)}
          >
            {term}
          </div>
        ))}
      </div>
    </div>
  );
}
