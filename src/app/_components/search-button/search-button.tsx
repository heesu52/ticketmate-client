'use client';

import { useRouter } from 'next/navigation';

import { SearchIcon } from '@/assets/icons';

const SearchButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/search');
  };

  return (
    <button aria-label="검색" onClick={handleClick}>
      <SearchIcon width={20} height={20} fill="var(--textColor-main)" />
    </button>
  );
};

export default SearchButton;
