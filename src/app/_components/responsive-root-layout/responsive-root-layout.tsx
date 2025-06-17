'use client';

import React from 'react';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import AppBar from '@/app/_components/layout/header/app-bar/app-bar';
import { useAppBarStore } from '@/app/_components/layout/header/app-bar/use-app-bar-store';
import AppHeader from '@/app/_components/layout/header/app-header/app-header';
import BottomNavigation from '@/shared/components/navigation/bottom-navigation/bottom-navigation';

import styles from './responsive-root-layout.module.scss';

const cn = classNames.bind(styles);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { hasAppBar, appBarTitle, hasBackground, isDynamicColor, action } =
    useAppBarStore();

  // BottomNavigation 보여줄 경로
  const showBottomNavRoutes = ['/', '/history'];

  const hasBottomNav = showBottomNavRoutes.some((route) => pathname === route);

  const hasAppHeader = pathname === '/';

  return (
    <div className={styles.container}>
      <header>
        {hasAppHeader ? (
          <AppHeader />
        ) : hasAppBar ? (
          <AppBar
            title={appBarTitle}
            hasBackground={hasBackground}
            action={action}
          />
        ) : null}
      </header>
      <div
        className={cn(
          styles.content,
          hasBottomNav ? styles.with_nav : styles.without_nav,
          hasAppHeader ? styles.with_app_header : '',
          hasAppBar ? (isDynamicColor ? '' : styles.with_app_bar) : '',
        )}
      >
        {children}
      </div>
      {hasBottomNav && <BottomNavigation />}
    </div>
  );
}
