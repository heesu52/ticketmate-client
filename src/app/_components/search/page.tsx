import styles from './page.module.scss';
import AppBarSetter from '../layout/header/app-bar/app-bar-setter';
import SearchSelection from './_shared/components/search-selection/search-selection';
import SearchTabManager from './_shared/components/search-tab/manager/search-tab-manager';

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
