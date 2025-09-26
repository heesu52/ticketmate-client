'use client';

import { useState } from 'react';

import SettingItem from '@/shared/components/features/my/setting-item/setting-item';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Toggle from '@/shared/components/ui/toggle/toggle';

import styles from './page.module.scss';

const NotificationPage = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <PageFrame
      appBar={{
        title: '알림 설정',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.notification_container}>
          <div className={styles.title}>전체</div>
          <div className={styles.content}>
            <SettingItem
              type="action"
              title="알림 설정"
              trailing={
                <Toggle pressed={isPressed} onPressedChange={setIsPressed} />
              }
            />
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default NotificationPage;
