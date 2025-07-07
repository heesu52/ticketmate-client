import SearchSelection from '@/app/(.)search/_shared/components/search-selection/search-selection';
import SearchTabManager from '@/app/(.)search/_shared/components/search-tab/search-tab-manager';
import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';

import styles from './page.module.scss';

export default function Search() {
  return (
    <>
      <AppBarSetter title="검색" />
      <div className={styles.container}>
        <SearchSelection />
        <SearchTabManager />
      </div>
    </>
  );
}
