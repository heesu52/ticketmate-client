/* eslint-disable import/named */
import {
  getMessaging,
  getToken,
  isSupported,
  deleteToken,
  Messaging,
} from 'firebase/messaging';

import { firebaseApp } from '@/lib/firebase/firebase-config';
import { notificationStorage } from '@/lib/firebase/notification-storage';
import { PostFCMTokenRequest } from '@/shared/services/etc/type';
import { getDeviceType } from '@/shared/utils/device';

type NotificationPermissionType = 'granted' | 'denied' | 'default';

/**
 * 알림 지원 여부 확인
 */
export const checkNotificationSupport = (): boolean => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  return 'serviceWorker' in navigator;
};

/**
 * Service Worker 등록 및 준비
 */
export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration> => {
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js',
    );
    await navigator.serviceWorker.ready;
    return registration;
  };

/**
 * Firebase Messaging 인스턴스 가져오기
 */
export const getMessagingInstance = (): Messaging => {
  return getMessaging(firebaseApp);
};

/**
 * FCM 토큰 가져오기 및 저장
 */
export const getAndSaveFCMToken = async (
  messaging: Messaging,
): Promise<string | null> => {
  try {
    const isMessagingSupported = await isSupported();
    if (!isMessagingSupported) {
      throw new Error('Firebase Messaging을 지원하지 않습니다.');
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      // 로컬 스토리지에 토큰 저장
      notificationStorage.saveToken(token);
      return token;
    }

    return null;
  } catch (error) {
    console.error('FCM 토큰 가져오기 실패:', error);
    throw error;
  }
};

/**
 * FCM 토큰을 서버에 전송
 */
export const sendFCMTokenToServer = async (
  token: string,
  postFCMTokenFn: (request: PostFCMTokenRequest) => Promise<unknown>,
): Promise<void> => {
  try {
    const deviceType = getDeviceType();
    await postFCMTokenFn({
      fcmToken: token,
      deviceType: deviceType,
    });
  } catch (error) {
    console.error('FCM 토큰 서버 전송 실패:', error);
    throw error;
  }
};

/**
 * FCM 토큰 삭제
 */
export const removeFCMToken = async (messaging: Messaging): Promise<void> => {
  try {
    const isMessagingSupported = await isSupported();
    if (isMessagingSupported) {
      await deleteToken(messaging);
      // 로컬 스토리지에서 토큰 제거
      notificationStorage.removeToken();
    }
  } catch (error) {
    console.error('FCM 토큰 삭제 실패:', error);
    throw error;
  }
};

/**
 * 알림 권한 요청 및 FCM 토큰 초기화
 */
export const requestNotificationPermission =
  async (): Promise<NotificationPermissionType> => {
    const permission = await Notification.requestPermission();
    // 권한 상태를 로컬 스토리지에 저장
    notificationStorage.saveStatus(permission);
    return permission;
  };

/**
 * 현재 알림 권한 상태 확인
 */
export const getNotificationPermission = (): NotificationPermissionType => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  const permission = Notification.permission as NotificationPermissionType;
  // 권한 상태를 로컬 스토리지에 저장
  notificationStorage.saveStatus(permission);
  return permission;
};

/**
 * 알림 활성화 (권한 요청 + FCM 토큰 가져오기 + 서버 전송)
 */
export const enableNotifications = async (
  postFCMTokenFn: (request: PostFCMTokenRequest) => Promise<unknown>,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. 알림 권한 요청
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
      return {
        success: false,
        error:
          permission === 'denied'
            ? '알림 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.'
            : '알림 권한이 허용되지 않았습니다.',
      };
    }

    // 2. Service Worker 등록
    await registerServiceWorker();

    // 3. Messaging 인스턴스 가져오기
    const messaging = getMessagingInstance();

    // 4. FCM 토큰 가져오기 및 저장
    const token = await getAndSaveFCMToken(messaging);

    if (!token) {
      return {
        success: false,
        error: 'FCM 토큰을 가져올 수 없습니다.',
      };
    }

    // 5. 서버에 FCM 토큰 전송
    await sendFCMTokenToServer(token, postFCMTokenFn);

    return { success: true };
  } catch (error) {
    console.error('알림 활성화 실패:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : '알림 활성화 중 오류가 발생했습니다.',
    };
  }
};

/**
 * 알림 비활성화 (FCM 토큰 삭제)
 */
export const disableNotifications = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const messaging = getMessagingInstance();
    await removeFCMToken(messaging);
    // 권한 상태를 denied로 저장
    notificationStorage.saveStatus('denied');
    return { success: true };
  } catch (error) {
    console.error('알림 비활성화 실패:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : '알림 비활성화 중 오류가 발생했습니다.',
    };
  }
};

/**
 * 저장된 토큰으로 서버에 재전송 (권한이 이미 있는 경우)
 */
export const resendFCMTokenIfNeeded = async (
  postFCMTokenFn: (request: PostFCMTokenRequest) => Promise<unknown>,
): Promise<void> => {
  try {
    const permission = getNotificationPermission();
    if (permission !== 'granted') {
      return;
    }

    // 저장된 토큰 확인
    const stored = notificationStorage.getTokenAndStatus();
    if (stored?.token) {
      // 이미 토큰이 있고 서버에 전송된 상태일 수 있으므로
      // 필요시에만 재전송 (중복 방지)
      return;
    }

    // 토큰이 없으면 새로 가져오기
    await registerServiceWorker();
    const messaging = getMessagingInstance();
    const token = await getAndSaveFCMToken(messaging);

    if (token) {
      await sendFCMTokenToServer(token, postFCMTokenFn);
    }
  } catch (error) {
    console.error('FCM 토큰 재전송 실패:', error);
  }
};
