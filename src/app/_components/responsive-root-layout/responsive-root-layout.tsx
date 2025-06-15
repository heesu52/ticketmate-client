'use client';

import React from 'react';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import { useAppBarStore } from '@/shared/components/header/app-bar/use-app-bar-store';
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
  const { hasAppBar } = useAppBarStore();

  // BottomNavigation 보여줄 경로
  const showBottomNavRoutes = ['/', '/history'];

  const hasBottomNav = showBottomNavRoutes.some((route) => pathname === route);

  const hasAppHeader = pathname === '/';

  return (
    <div className={styles.container}>
      {hasAppHeader && <AppHeader />}
      <div
        className={cn(
          styles.content,
          hasBottomNav ? styles.with_nav : styles.without_nav,
          hasAppHeader ? styles.with_app_header : '',
          hasAppBar ? styles.with_app_bar : '',
        )}
      >
        {children}
      </div>
      {hasBottomNav && <BottomNavigation />}
    </div>
  );
}
