import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import { SearchIcon } from '@/assets/icons';

import styles from './search-selection.module.scss';

export default function SearchSelection() {
  return (
    <>
      <AppBarSetter title="검색" />
      <div className={styles.container}>
        <div className={styles.search}>
          <span>검색어를 입력해주세요.</span>
          <SearchIcon width={16} height={16} fill="var(--gray-4)" />
        </div>
        <div className={styles.recent_serarch_container}>
          <div className={styles.span_container}>
            <span className={styles.title}>최근 검색어</span>
            <span className={styles.delete}>전체삭제</span>
          </div>
          <div className={styles.tag_container}>
            <div className={styles.tag}>권진아</div>
            <div className={styles.tag}>지드래곤</div>
            <div className={styles.tag}>의문의 티켓터</div>
            <div className={styles.tag}>티켓터</div>
            <div className={styles.tag}>티켓터</div>
          </div>
        </div>
      </div>
    </>
  );
}
