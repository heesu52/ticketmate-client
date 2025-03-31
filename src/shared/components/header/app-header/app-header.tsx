import TicketMateLogoIcon from '@/assets/icons/main_logo.svg';
import SearchIcon from '@/assets/icons/search.svg';

import styles from './app-header.module.scss';

const AppHeader = () => {
  return (
    <div className={styles.container}>
      <TicketMateLogoIcon
        width={102}
        height={22}
        role="img"
        aria-hidden="true"
        aria-label="티켓메이트 로고"
      />

      <div className={styles.button_group}>
        <button className={styles.button} aria-label="검색">
          <SearchIcon width={20} height={20} fill="var(--textColor-main)" />
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
