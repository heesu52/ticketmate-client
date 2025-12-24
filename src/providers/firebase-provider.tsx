'use client';

import { useEffect } from 'react';

/* eslint-disable import/named */
import { getMessaging, onMessage } from 'firebase/messaging';

import { firebaseApp } from '@/lib/firebase/firebase-config';
import {
  checkNotificationSupport,
  getNotificationPermission,
  resendFCMTokenIfNeeded,
} from '@/lib/firebase/notification-manager';
import { usePostFCMToken } from '@/shared/services/etc/mutation';

const FirebaseProvider = () => {
  const postFCMToken = usePostFCMToken();

  useEffect(() => {
    // 알림 지원 여부 확인
    if (!checkNotificationSupport()) {
      return;
    }

    const initializeMessaging = async () => {
      try {
        // 현재 권한 상태 확인
        const permission = getNotificationPermission();

        // 권한이 이미 허용된 경우에만 FCM 토큰 재전송 시도
        if (permission === 'granted') {
          await resendFCMTokenIfNeeded((request) =>
            postFCMToken.mutateAsync(request),
          );
        }

        // Foreground 메시지 리스너 설정
        const messaging = getMessaging(firebaseApp);

        onMessage(messaging, (payload) => {
          if (Notification.permission === 'granted') {
            console.log('Foreground Message:', payload);
            const title = payload.data?.title;
            const body = payload.data?.body;

            const notificationOptions = {
              body: body,
              icon: '/app-assets/icons/icon-192.png',
              badge: '/app-assets/icons/icon-192.png',
            };

            const notification = new Notification(title!, notificationOptions);

            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          }
        });
      } catch (error) {
        console.error('Failed to initialize Firebase messaging:', error);
      }
    };

    initializeMessaging();
  }, [postFCMToken]);

  return <></>;
};

export default FirebaseProvider;
