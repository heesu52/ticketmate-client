'use client';

import React from 'react';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import AppBar from '@/shared/components/header/app-bar/app-bar';
import AppHeader from '@/shared/components/header/app-header/app-header';
import BottomNavigation from '@/shared/components/navigation/bottom-navigation/bottom-navigation';

import styles from './responsive-root-layout.module.scss';

const cn = classNames.bind(styles);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // bottom navigation 숨길 경로
  const hiddenRoutes = ['/404'];

  const isShowBottomNav = !hiddenRoutes.some((route) =>
    pathname.includes(route),
  );

  const isShowAppHeader = pathname === '/';

  return (
    <div className={styles.container}>
      {isShowAppHeader ? <AppHeader /> : <AppBar />}
      <div
        className={cn(
          styles.content,
          isShowBottomNav ? styles.with_nav : styles.without_nav,
          isShowAppHeader ? styles.with_app_header : styles.without_app_header,
        )}
      >
        {children}
      </div>
      {isShowBottomNav && <BottomNavigation />}
    </div>
  );
}
