'use client';

import styles from './notification-content.module.scss';

interface NotificationContentProps {
  index: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationContent({
  index,
  title,
  message,
  time,
  isRead,
}: NotificationContentProps) {
  return (
    <div
      key={index}
      className={`${styles.notification_container} ${isRead ? styles.read : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.notification_icon} />
        </div>

        <span className={styles.message}>{message}</span>
      </div>

      <div className={styles.footer}>
        <span className={styles.time}>{time}</span>
        <div className={styles.button}>
          {/* <Link href="/chat" className={styles.button_label}>
            채팅하기
          </Link>
          <ArrowRightIcon width={16} height={16} /> */}
        </div>
      </div>
    </div>
  );
}
