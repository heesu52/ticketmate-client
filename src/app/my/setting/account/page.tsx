'use client';

import { useLogoutMutation } from '@/app/my/setting/account/log-out/_shared/services/mutation';
import SettingItem from '@/shared/components/features/my/setting-item/setting-item';
import { SettingItem as SettingItemType } from '@/shared/components/features/my/setting-item/setting-item.type';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

const AccountPage = () => {
  const { mutate: logout } = useLogoutMutation();

  const menuItems: SettingItemType[] = [
    {
      title: '로그아웃',
      type: 'action',
      onClick: () => {
        logout();
      },
    },
    {
      title: '탈퇴하기',
      href: '/my/setting/account/delete',
      type: 'link',
    },
  ];

  return (
    <PageFrame
      appBar={{
        title: '계정 설정',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        {menuItems.map((item) => {
          return <SettingItem key={item.title} {...item} />;
        })}
      </div>
    </PageFrame>
  );
};

export default AccountPage;
