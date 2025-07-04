import styles from './serach-list.module.scss';
import SearchTabManager from '../search-tab/manager/search-tab-manager';

export default function SearchList() {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <span className={styles.span}>대리인 검색결과</span>
        <span className={styles.asterisk}>0</span>
      </div>
      <div className={styles.list_container}>
        <div className={styles.tab_container}>
          <SearchTabManager />
        </div>
      </div>
    </div>
  );
}
