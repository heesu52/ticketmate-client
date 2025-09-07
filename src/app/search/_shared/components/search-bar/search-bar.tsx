'use client';

import React from 'react';

import { SearchIcon } from '@/assets/icons';
import Input from '@/shared/components/ui/input/input';

import styles from './search-bar.module.scss';

interface SearchBarProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (value: string) => void;
}

export default function SearchBar({
  inputMessage,
  setInputMessage,
  onSearch,
}: SearchBarProps) {
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <div className={styles.container}>
      <Input
        label="검색"
        placeholder="검색어를 입력해주세요"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        icon={<SearchIcon />}
        onIconClick={handleSubmit}
      />
    </div>
  );
}
