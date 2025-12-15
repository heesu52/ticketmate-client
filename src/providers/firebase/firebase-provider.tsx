'use client';

import { useEffect } from 'react';

/* eslint-disable import/named */
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging';

import { firebaseApp } from '@/providers/firebase/firebase-config';
import { usePostFCMToken } from '@/shared/services/etc/mutation';
import { getDeviceType } from '@/shared/utils/device';

const FirebaseProvider = () => {
  const postFCMToken = usePostFCMToken();

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker is not supported in this browser.');
      return;
    }

    if (!isSupported()) {
      throw new Error('This browser does not support notifications.');
    }

    const initializeMessaging = async () => {
      try {
        let registration;

        try {
          registration = await navigator.serviceWorker.register(
            '/firebase-messaging-sw.js',
          );
        } catch (registrationError) {
          console.error(
            'Service Worker registration failed:',
            registrationError,
          );
          return;
        }

        try {
          await navigator.serviceWorker.ready;
        } catch (readyError) {
          console.error('Service Worker ready check failed:', readyError);
          return;
        }

        if (!registration) {
          console.warn('Service Worker registration failed.');
          return;
        }

        let messagingResolve: ReturnType<typeof getMessaging> | null = null;

        try {
          messagingResolve = getMessaging(firebaseApp);
        } catch (error) {
          console.error('Failed to get messaging instance:', error);
          return;
        }

        if (!messagingResolve) {
          return;
        }

        const getFCMToken = async () => {
          if (!messagingResolve) {
            throw new Error('Failed to get messaging instance.');
          }

          const token = await getToken(messagingResolve, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (!token) {
            throw new Error('Failed to get token.');
          }

          return token;
        };

        // 알림 권한 요청
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            getFCMToken()
              .then((token) => {
                const deviceType = getDeviceType();

                const payload = {
                  fcmToken: token,
                  deviceType: deviceType,
                };

                postFCMToken.mutateAsync(payload);
              })
              .catch((error) => {
                console.error('Failed to get token:', error);
              });
          }
        });

        onMessage(messagingResolve, (payload) => {
          if (Notification.permission === 'granted') {
            console.log('Foreground Message:', payload);
            const title = payload.notification?.title;
            const body = payload.notification?.body;

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
  }, []);

  return <></>;
};

export default FirebaseProvider;
