import Link from 'next/link';

import { ArrowRightIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

const AccountPage = () => {
  const menuItems = [
    {
      title: '로그아웃',
      href: '/my/setting/account',
    },
    {
      title: '탈퇴하기',
      href: '/my/setting/account/withdrawal',
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
        {menuItems.map((item) => (
          <Link href={item.href} key={item.title} className={styles.item}>
            <span className={styles.item_title}>{item.title}</span>
            <div className={styles.item_trailing_container}>
              <ArrowRightIcon
                width={12}
                height={12}
                fill="var(--grayscale-500)"
              />
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
};

export default AccountPage;
