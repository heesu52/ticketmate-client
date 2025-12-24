export type NotificationPermissionType = 'granted' | 'denied' | 'default';

// 로컬 스토리지 키 정의
const STORAGE_KEYS = {
  FCM_TOKEN: 'FCM_TOKEN',
  NOTIFICATION_STATUS: 'NOTIFICATION_STATUS',
} as const;

export const notificationStorage = {
  // 토큰 저장
  saveToken: (token: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.FCM_TOKEN, token);
  },

  // 권한 상태 저장
  saveStatus: (status: NotificationPermissionType) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_STATUS, status);
  },

  // 토큰 조회
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.FCM_TOKEN);
  },

  // 권한 상태 조회
  getStatus: (): NotificationPermissionType | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(
      STORAGE_KEYS.NOTIFICATION_STATUS,
    ) as NotificationPermissionType | null;
  },

  // 토큰과 권한 상태 조회
  getTokenAndStatus: () => {
    if (typeof window === 'undefined') return null;
    return {
      token: localStorage.getItem(STORAGE_KEYS.FCM_TOKEN),
      status: localStorage.getItem(
        STORAGE_KEYS.NOTIFICATION_STATUS,
      ) as NotificationPermissionType | null,
    };
  },

  // 토큰 제거
  removeToken: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.FCM_TOKEN);
  },

  // 모든 알림 관련 데이터 제거
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.FCM_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATION_STATUS);
  },
};
