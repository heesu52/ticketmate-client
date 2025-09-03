// SearchInput.tsx
'use client';

import React, { useState } from 'react';

import { SearchIcon } from '@/assets/icons';

import styles from './search-bar.module.scss';

type SearchBarProps = {
  keyword: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  keyword,
  onChange,
  onSearch,
}: SearchBarProps) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setInputMessage('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_container}>
        <input
          className={styles.search_input}
          id="message-input"
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <SearchIcon className={styles.icon} onClick={handleSendMessage} />
      </div>
    </div>
  );
}
