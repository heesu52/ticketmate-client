'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChatIcon, HomeIcon, ListIcon, MyIcon } from '@/assets/icons';

import styles from './bottom-navigation.module.scss';

function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈', Icon: HomeIcon },
    { href: '/chat', label: '채팅', Icon: ChatIcon },
    { href: '/history', label: '신청내역', Icon: ListIcon },
    { href: '/my', label: '마이', Icon: MyIcon },
  ];

  return (
    <nav className={styles.container}>
      <ul>
        {navItems.map(({ href, label, Icon }) => (
          <li key={href} className={styles.nav_item}>
            <Link
              href={href}
              className={`${styles.nav_link} ${
                pathname === href ? styles.active : ''
              }`}
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
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
