importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyCKlGh__FG-2pje_U8NJ-2o5cFz52FJ8gQ',
  authDomain: 'ticketmate-bafbb.firebaseapp.com',
  projectId: 'ticketmate-bafbb',
  storageBucket: 'ticketmate-bafbb.firebasestorage.app',
  messagingSenderId: '6603871566',
  appId: '1:6603871566:web:07a3600333e48fb3d87a1f',
  measurementId: 'G-XLH4GH51JR',
});

// 백그라운드 알림 처리
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
