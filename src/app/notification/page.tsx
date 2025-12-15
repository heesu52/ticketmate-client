'use client';

import ky from 'ky';

import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function NotificationPage() {
  const sendTestNotification = async () => {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한 허용');
        } else {
          console.log('알림 권한 거절');
        }
      });

      const created = ky.create({
        prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
        credentials: 'include',
      });

      const extended = created.post('mock/notification', {
        hooks: {
          beforeRequest: [
            (request) => {
              request.headers.set(
                'Authorization',
                `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
              );
            },
          ],
        },
        json: {
          title: '테스트 제목입니다.',
          body: '테스트 본문입니다.',
        },
      });

      await extended;
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
      </div>
    </PageFrame>
  );
}
