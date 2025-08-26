'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChatIcon, HomeIcon, ListIcon, MyIcon } from '@/assets/icons';

import styles from './bottom-navigation.module.scss';

const cn = classNames.bind(styles);

function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈', Icon: HomeIcon },
    { href: '/chat', label: '채팅', Icon: ChatIcon },
    { href: '/history', label: '신청내역', Icon: ListIcon },
    { href: '/my', label: '마이', Icon: MyIcon },
  ];

  return (
    <div className={styles.container}>
      {navItems.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn('item', { active: pathname === href })}
        >
          <Icon
            stroke={
              pathname === href
                ? 'var(--brandColor-main)'
                : 'var(--textColor-less)'
            }
            width={24}
            height={24}
          />
          <span className={styles.label}>{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default BottomNavigation;
