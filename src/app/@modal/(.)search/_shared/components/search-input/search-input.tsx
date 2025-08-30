'use client';

import React, { useState } from 'react';

import { SearchIcon } from '@/assets/icons';

import styles from './search-input.module.scss';

export default function SearchInput() {
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
      <div className={styles.search_container}>
        <input
          className={styles.search_input}
          id="message-input"
          placeholder="검색어를 입력해주세요"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <SearchIcon className={styles.icon} />
      </div>
    </div>
  );
}
