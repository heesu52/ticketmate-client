'use client';

import { useEffect } from 'react';

import { getApps, initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

const FirebaseProvider = () => {
  useEffect(() => {
    let messaging: ReturnType<typeof getMessaging> | null = null;

    if (typeof window !== 'undefined' && 'Notification' in window) {
      messaging = getMessaging(firebaseApp);
    }

    if (Notification.permission === 'granted') return;

    Notification.requestPermission().then((permission) => {
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
