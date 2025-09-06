// SearchInput.tsx
'use client';

import React from 'react';

import { SearchIcon } from '@/assets/icons';

import styles from './search-bar.module.scss';

type SearchBarProps = {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (value: string) => void;
};

export default function SearchBar({
  inputMessage,
  setInputMessage,
  onSearch,
}: SearchBarProps) {
  const handleSendMessage = () => {
    const trimmed = inputMessage.trim();
    if (!trimmed) return;
    onSearch(trimmed);
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
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SearchIcon className={styles.icon} onClick={handleSendMessage} />
      </div>
    </div>
  );
}
