import styles from './page.module.scss';
import AppBarSetter from '../layout/header/app-bar/app-bar-setter';
import SearchList from './_shared/components/search-list/search-list';
import SearchSelection from './_shared/components/search-selection/search-selection';

interface Props {
  isOpen: boolean;
}

export default function Search({ isOpen }: Props) {
  if (!isOpen) return null;
  return (
    <div className={styles.container}>
      <AppBarSetter title="검색" />
      <SearchSelection />
      <SearchList />
    </div>
  );
}
