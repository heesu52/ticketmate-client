'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import styles from './global-loading.module.scss';

const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  // fetching 또는 mutating이 진행 중일 때만 로딩 표시
  if (isFetching || isMutating) {
    return (
      <div
        className={styles.container}
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label="로딩중"
      >
        <div className={styles.loading_spinner}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M38.5 19.6689C38.5 23.1845 37.4983 26.6272 35.6123 29.594C33.7262 32.5608 31.0339 34.9288 27.8506 36.4206C24.6673 37.9124 21.1249 38.4664 17.6381 38.0176C14.1513 37.5687 10.8646 36.1357 8.16293 33.8863C5.46122 31.6369 3.45636 28.6643 2.38314 25.3166C1.30992 21.9689 1.21278 18.3847 2.10309 14.9838C2.9934 11.5829 4.83431 8.50602 7.41021 6.1136C9.98611 3.72119 13.1904 2.11224 16.6477 1.47521"
              stroke="#FF6A6A"
              strokeWidth="3"
            />
          </svg>
        </div>
        <span className={styles.sr_only}>로딩 중입니다</span>
      </div>
    );
  }

  return null;
};

export default GlobalLoading;
