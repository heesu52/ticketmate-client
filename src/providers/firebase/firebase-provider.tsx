'use client';

import { useEffect } from 'react';

// eslint-disable-next-line import/named
import { getMessaging } from 'firebase/messaging';

import { firebaseApp } from '@/providers/firebase/firebase-config';

const FirebaseProvider = () => {
  useEffect(() => {
    let messaging: ReturnType<typeof getMessaging> | null = null;

    if (typeof window !== 'undefined' && 'Notification' in window) {
      messaging = getMessaging(firebaseApp);
    }

    if (Notification.permission === 'granted') return;

    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === 'granted') {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    });
  }, []);

  return <></>;
};

export default FirebaseProvider;
