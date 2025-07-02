'use client';

import React, { useEffect } from 'react';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import AppBar from '@/app/_components/layout/header/app-bar/app-bar';
import { useAppBarStore } from '@/app/_components/layout/header/app-bar/use-app-bar-store';
import AppHeader from '@/app/_components/layout/header/app-header/app-header';
import { useGetMember } from '@/app/_shared/services/query';
import BottomNavigation from '@/shared/components/navigation/bottom-navigation/bottom-navigation';

import styles from './responsive-root-layout.module.scss';

const cn = classNames.bind(styles);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { hasAppBar, appBarTitle, hasBackground, action } = useAppBarStore();

  // BottomNavigation 보여줄 경로
  const showBottomNavRoutes = ['/', '/history', '/chat'];

  const hasBottomNav = showBottomNavRoutes.some((route) => pathname === route);

  const hasAppHeader = pathname === '/';

  const hasNoPadding = pathname.includes('/chat/');

  const { data, isSuccess } = useGetMember();

  //accesstoken이 존재한다면 정보조회 api 요청해서 session에 저장
  useEffect(() => {
    if (isSuccess && data?.memberId) {
      sessionStorage.setItem('memberId', data.memberId);
      sessionStorage.setItem('memberType', data.memberType);
    }
  }, [isSuccess, data]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
          hasNoPadding ? styles.no_padding : '',
        )}
      >
        {children}
      </div>
      {hasBottomNav && <BottomNavigation />}
    </div>
  );
}
