'use client';

import { useState } from 'react';

import NotificationContent from '@/app/notification/notification-content/notification-content';
import httpClient from '@/lib/http-client/http-client';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function Notification() {
  const [notifications, setNotifications] = useState<
    {
      title: string;
      message: string;
    }[]
  >([]);

  const sendTestNotification = async () => {
    try {
      await httpClient({
        method: 'post',
        url: 'mock/notification',
        options: {
          json: {
            title: '테스트 제목입니다.',
            body: '테스트 본문입니다.',
          },
        },
      });

      setNotifications((prev) => [
        {
          title: '테스트 제목입니다.',
          message: '테스트 본문입니다.',
        },
        ...prev,
      ]);
    } catch (error) {
      console.error('테스트 알림 발송 실패:', error);
    }
  };

  return (
    <PageFrame appBar={{ title: '알림', showBack: true }} bottomNav={false}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={sendTestNotification}
          style={{
            marginBottom: 16,
            padding: '8px 12px',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          테스트 알림 발송
        </button>

        <div className={styles.list_container}>
          {notifications.map((item, index) => (
            <NotificationContent
              key={index}
              index={index}
              title={item.title}
              message={item.message}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
