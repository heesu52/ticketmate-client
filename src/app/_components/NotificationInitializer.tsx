// 'use client';

// import { useEffect } from 'react';

// import { getToken, onMessage } from 'firebase/messaging';

// import { messaging } from '@/firebase/firebaseConfig';
// import httpClient from '@/lib/http-client/http-client';

// export default function NotificationInitializer() {
//   useEffect(() => {
//     if (!messaging) return;

//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         (async () => {
//           // 중복 전송 방지
//           const tokenSent = localStorage.getItem('fcmTokenSent');
//           if (tokenSent) return;

//           try {
//             const token = await getToken(messaging!, {
//               vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//             });
//             if (!token) return;

//             await httpClient({
//               method: 'post',
//               url: 'fcm',
//               options: {
//                 json: {
//                   fcmToken: token,
//                   deviceType: 'WEB',
//                 },
//               },
//             });
//             localStorage.setItem('fcmTokenSent', 'true');
//             console.log('FCM 토큰 서버 전송 완료');
//           } catch (error) {
//             console.error('FCM 토큰 전송 실패:', error);
//           }
//         })();
//       }
//     });

//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log('Foreground message:', payload);
//     });

//     return () => unsubscribe();
//   }, []);

//   return null;
// }
