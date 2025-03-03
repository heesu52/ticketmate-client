import TicketMateLogoIcon from '@/assets/icons/main_logo.svg';
import NotificationIcon from '@/assets/icons/notification.svg';
import SearchIcon from '@/assets/icons/search.svg';

import styles from './app-header.module.scss';

const AppHeader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} aria-label="티켓메이트 로고">
        <TicketMateLogoIcon
          width={102}
          height={16}
          role="img"
          aria-hidden="true"
        />
      </h1>
      <div className={styles.button_group}>
        <button className={styles.button} aria-label="검색">
          <SearchIcon width={24} height={24} fill="var(--gray-5)" />
        </button>
        <button className={styles.button} aria-label="알림">
          <NotificationIcon width={24} height={24} fill="var(--gray-5)" />
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
