'use client';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import AppBar from '@/app/_components/layout/header/app-bar/app-bar';
import { useAppBarStore } from '@/app/_components/layout/header/app-bar/use-app-bar-store';
import AppHeader from '@/app/_components/layout/header/app-header/app-header';
import Search from '@/app/_components/search/page';
import { useGetMember } from '@/app/my/_shared/services/query';
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
  // 검색 페이지 오버레이 여부
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // BottomNavigation 보여줄 경로
  const showBottomNavRoutes = ['/', '/history', '/chat'];

  const hasBottomNav = showBottomNavRoutes.some((route) => pathname === route);

  // 검색페이지로 이동했을 때는 AppBar가 출력되어야 하므로 조건 추가
  const hasAppHeader = pathname === '/' && !isSearchOpen;

  const hasNoPadding = pathname.includes('/chat/');

  const { data, isSuccess } = useGetMember();

  //accesstoken이 존재한다면 정보조회 api 요청해서 session에 저장
  useEffect(() => {
    if (isSuccess && data?.memberId) {
      sessionStorage.setItem('memberId', data.memberId);
      sessionStorage.setItem('memberType', data.memberType);
    }
  }, [isSuccess, data]);

  // body 스크롤 잠금 효과 추가
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {!isSearchOpen && hasAppHeader ? (
          <AppHeader onSearchClick={() => setIsSearchOpen(true)} />
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

      <Search isOpen={isSearchOpen} />
    </div>
  );
}
