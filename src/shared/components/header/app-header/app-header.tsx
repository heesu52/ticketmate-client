import TicketMateLogoIcon from '@/assets/icons/main_logo.svg';
import NotificationIcon from '@/assets/icons/notification.svg';

import styles from './app-header.module.scss';

const AppHeader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} aria-label="티켓메이트 로고">
        <TicketMateLogoIcon role="img" aria-hidden="true" />
      </h1>
      <button className={styles.button} aria-label="알림">
        <span className={styles.icon}>
          <NotificationIcon width={24} height={24} fill="var(--gray-5)" />
        </span>
      </button>
    </div>
  );
};

export default AppHeader;
