'use client';

import { useEffect } from 'react';

import ConcertList from '@/app/_components/concert/concert-list/concert-list';
import NotificationButton from '@/app/_components/notification-button/notification-button';
import SearchButton from '@/app/_components/search-button/search-button';
import { MainLogoIcon as TicketMateLogoIcon } from '@/assets/icons';
import { getFcmToken } from '@/lib/firebase-Messaging';
import httpClient from '@/lib/http-client/http-client';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useMember } from '@/shared/context/member-context';

import styles from './page.module.scss';

export default function Home() {
  const { member } = useMember();

  // 로그인 완료하고 메인페이지에서 접속 시 FCM 토큰 전송
  useEffect(() => {
    // if (!member?.memberId) return;

    async function sendToken() {
      // 이미 토큰을 전송했는지 확인
      const tokenSent = localStorage.getItem('fcmTokenSent');
      if (tokenSent) return;

      const token = await getFcmToken();
      if (token) {
        try {
          await httpClient({
            method: 'post',
            url: 'fcm',
            options: {
              json: {
                fcmToken: token,
                deviceType: 'WEB',
              },
            },
          });
          // 토큰 전송 여부를 확인
          localStorage.setItem('fcmTokenSent', 'true');
          console.log('FCM 토큰 서버 전송 완료');
        } catch (error) {
          console.error('FCM 토큰 전송 실패:', error);
        }
      }
    }

    sendToken();
  }, [member?.memberId]);

  return (
    <PageFrame
      appBar={{
        title: (
          <TicketMateLogoIcon
            width={102}
            height={22}
            aria-hidden="true"
            aria-label="티켓메이트 로고"
          />
        ),
        right: (
          <div style={{ display: 'flex', gap: 16 }}>
            <NotificationButton />
            <SearchButton />
          </div>
        ),
      }}
    >
      <div className={styles.container}>
        <ConcertList />
      </div>
    </PageFrame>
  );
}
