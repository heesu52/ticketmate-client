importScripts(
  'https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.6.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyCKlGh__FG-2pje_U8NJ-2o5cFz52FJ8gQ',
  authDomain: 'ticketmate-bafbb.firebaseapp.com',
  projectId: 'ticketmate-bafbb',
  storageBucket: 'ticketmate-bafbb.firebasestorage.app',
  messagingSenderId: '6603871566',
  appId: '1:6603871566:web:07a3600333e48fb3d87a1f',
  measurementId: 'G-XLH4GH51JR',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 알림 처리
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);

  const title = payload.data.title || '새 알림';
  const body = payload.data.body || '내용이 없습니다.';

  const notificationOptions = {
    body: body,
    icon: '/app-assets/icons/icon-192.png',
    badge: '/app-assets/icons/icon-192.png',
  };

  self.registration.showNotification(title, notificationOptions);
});

// 알림 클릭 로직 추가
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const data = event.notification.data;
  const redirectUrl = data?.redirectUrl || '/my';

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        let clientToFocus = clientList.find(
          (client) => client.url.includes(redirectUrl) && 'focus' in client,
        );

        if (clientToFocus) {
          // 이미 열려있는 창이 있다면 포커스
          return clientToFocus.focus();
        }

        // 열려있는 창이 없다면 새 창 열기
        if (clients.openWindow) {
          return clients.openWindow(redirectUrl);
        }
      }),
  );
});
