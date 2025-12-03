importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  messagingSenderId: '6603871566',
});

// 백그라운드 알림 처리
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
