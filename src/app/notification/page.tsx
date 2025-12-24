'use client';

import NotificationContent from '@/app/notification/notification-content/notification-content';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function NotificationPage() {
  const data = [
    {
      index: 1,
      title: '알림 1',
      message: '알림 1 내용',
      time: '2025-01-01 12:00:00',
      isRead: false,
    },
    {
      index: 2,
      title: '알림 2',
      message: '알림 2 내용',
      time: '2025-01-01 12:00:00',
      isRead: false,
    },
  ];
  return (
    <PageFrame appBar={{ title: '알림', showBack: true }} bottomNav={false}>
      <div className={styles.container}>
        <div className={styles.list_container}>
          {data.map((item) => (
            <NotificationContent key={item.index} {...item} />
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
