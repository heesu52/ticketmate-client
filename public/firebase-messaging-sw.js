importScripts(
  'https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.6.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  messagingSenderId: '6603871566',
});

// 백그라운드 알림 처리
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  try {
    const notificationTitle =
      payload.notification?.title || payload.data?.title || 'New Notification';
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || '',
      icon:
        payload.notification?.icon || payload.data?.icon || '/icon-192x192.png',
      badge: '/badge-72x72.png',
      data: payload.data,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error('Failed to show notification:', error);
  }
});
