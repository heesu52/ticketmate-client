'use client';

import React, { useState } from 'react';

import { SearchIcon } from '@/assets/icons';

import styles from './search-selection.module.scss';

export default function SearchSelection() {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
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
      <div className={styles.search}>
        <textarea
          className={styles.message_input}
          id="message-input"
          placeholder="검색어를 입력해주세요"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
        />
        <SearchIcon width={16} height={16} fill="var(--gray-4)" />
      </div>
      <div className={styles.recent_search_container}>
        <div className={styles.span_container}>
          <span className={styles.title}>최근 검색어</span>
          <span className={styles.delete}>전체삭제</span>
        </div>
        <div className={styles.tag_container}>
          <div className={styles.tag}>권진아</div>
          <div className={styles.tag}>지드래곤</div>
          <div className={styles.tag}>의문의 티켓터</div>
          <div className={styles.tag}>티켓터</div>
        </div>
      </div>
    </div>
  );
}
