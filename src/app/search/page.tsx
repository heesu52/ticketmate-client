import SearchSelection from '@/app/(.)search/_shared/components/search-selection/search-selection';
import SearchTabManager from '@/app/(.)search/_shared/components/search-tab/search-tab-manager';
import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';

import styles from './page.module.scss';

interface Props {
  isOpen: boolean;
}

export default function Search({ isOpen }: Props) {
  if (!isOpen) return null;
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
