import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import SearchSelection from '@/app/_components/search/_shared/components/search-selection/search-selection';
import SearchTabManager from '@/app/_components/search/_shared/components/search-tab/manager/search-tab-manager';

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
