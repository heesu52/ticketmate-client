'use client';

import React from 'react';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import AppBar from '@/shared/components/header/app-bar/app-bar';
import { useAppBarStore } from '@/shared/components/header/app-bar/use-app-bar-store';
import AppHeader from '@/shared/components/header/app-header/app-header';
import BottomNavigation from '@/shared/components/navigation/bottom-navigation/bottom-navigation';
import Spacer from '@/shared/components/spacer/spacer';

import styles from './responsive-root-layout.module.scss';

const cn = classNames.bind(styles);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isShowSpacer } = useAppBarStore();
  const pathname = usePathname();
  const { isShow } = useAppBarStore();

  // AppBar 숨길 경로
  const hiddenAppBarRoutes = ['/', '/404'];
  // BottomNavigation 보여줄 경로
  const showBottomNavRoutes = ['/', '/history'];

  const isShowBottomNav = showBottomNavRoutes.some(
    (route) => pathname === route,
  );

  const isShowAppHeader = pathname === '/';
  const isShowAppBar =
    isShow && !hiddenAppBarRoutes.some((route) => pathname === route);

  const spacerSize = isShowAppBar ? 54 : isShowAppHeader ? 56 : 0;

  return (
    <div className={styles.container}>
      {isShowAppHeader && <AppHeader />}
      {isShowAppBar && <AppBar />}
      <div
        className={cn(
          styles.content,
          isShowBottomNav ? styles.with_nav : styles.without_nav,
        )}
      >
        {isShowSpacer && <Spacer size={spacerSize} />}
        {children}
      </div>
      {isShowBottomNav && <BottomNavigation />}
    </div>
  );
}
