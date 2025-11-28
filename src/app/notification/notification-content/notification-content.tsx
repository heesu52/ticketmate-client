'use client';

import { ArrowRightIcon } from '@/assets/icons';

import styles from './notification-content.module.scss';

interface NotificationContentProps {
  index: number;
  isRead: boolean;
  title: string;
  message: string;
  time: string;
  onClick: (index: number) => void;
}

export default function NotificationContent({
  index,
  isRead,
  title,
  message,
  time,
  onClick,
}: NotificationContentProps) {
  return (
    <div
      key={index}
      className={`${styles.notification_container} ${isRead ? styles.read : ''}`}
      onClick={() => onClick(index)}
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
          <span className={styles.button_label}>채팅하기</span>
          <ArrowRightIcon width={16} height={16} />
        </div>
      </div>
    </div>
  );
}
