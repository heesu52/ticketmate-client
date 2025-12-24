'use client';

import { useEffect, useState } from 'react';

import {
  checkNotificationSupport,
  disableNotifications,
  enableNotifications,
  getNotificationPermission,
} from '@/lib/firebase/notification-manager';
import SettingItem from '@/shared/components/features/my/setting-item/setting-item';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { toastify } from '@/shared/components/ui/toast/toastify';
import Toggle from '@/shared/components/ui/toggle/toggle';
import { usePostFCMToken } from '@/shared/services/etc/mutation';

import styles from './page.module.scss';

const NotificationPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const postFCMToken = usePostFCMToken();

  // 현재 알림 권한 상태 확인
  useEffect(() => {
    if (!checkNotificationSupport()) {
      setIsLoading(false);
      return;
    }

    // 현재 알림 권한 상태 확인
    const permission = getNotificationPermission();
    setIsEnabled(permission === 'granted');
    setIsLoading(false);
  }, []);

  // 알림 권한 요청 및 FCM 토큰 관리
  const handleToggleChange = async (pressed: boolean) => {
    // 알림 지원 여부 확인
    if (!checkNotificationSupport()) {
      toastify({
        variant: 'error',
        description: '이 브라우저는 알림을 지원하지 않습니다.',
      });
      return;
    }

    try {
      if (pressed) {
        // 알림 활성화
        const result = await enableNotifications((request) =>
          postFCMToken.mutateAsync(request),
        );

        if (result.success) {
          setIsEnabled(true);
          toastify({
            variant: 'success',
            description: '알림이 활성화되었습니다.',
          });
        } else {
          setIsEnabled(false);
          toastify({
            variant: 'error',
            description: result.error || '알림 활성화에 실패했습니다.',
          });
        }
      } else {
        // 알림 비활성화
        const result = await disableNotifications();

        if (result.success) {
          setIsEnabled(false);
          toastify({
            variant: 'info',
            description: '알림이 비활성화되었습니다.',
          });
        } else {
          toastify({
            variant: 'error',
            description: result.error || '알림 비활성화에 실패했습니다.',
          });
        }
      }
    } catch (error) {
      console.error('알림 설정 변경 실패:', error);
      toastify({
        variant: 'error',
        description: '알림 설정 변경 중 오류가 발생했습니다.',
      });
      setIsEnabled(false);
    }
  };

  return (
    <PageFrame
      appBar={{
        title: '알림 설정',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.setting_container}>
          <div className={styles.title}>전체</div>
          <SettingItem
            type="action"
            title="알림 설정"
            trailing={
              <Toggle
                pressed={isEnabled}
                onPressedChange={handleToggleChange}
                disabled={isLoading}
              />
            }
          />
        </div>
      </div>
    </PageFrame>
  );
};

export default NotificationPage;
