/* eslint-disable import/named */
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

import { firebaseApp } from '@/firebase/firebaseConfig';

export async function getFcmToken() {
  try {
    const supported = await isSupported();
    if (!supported) return null;

    const messaging = getMessaging(firebaseApp);

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log('FCM Token: ', token);
    return token;
  } catch (err) {
    console.error('FCM 토큰 발급 실패:', err);
    return null;
  }
}
