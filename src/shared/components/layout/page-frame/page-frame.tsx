'use client';

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import { AppBarProps } from '@/shared/components/layout/page-frame/app-bar/app-bar.type';

import AppBar from './app-bar/app-bar';
import BottomNavigation from './bottom-navigation/bottom-navigation';
import styles from './page-frame.module.scss';

const cn = classNames.bind(styles);

interface PageFrameProps {
  /** AppBar를 숨기려면 false, 보이려면 AppBar 설정 객체 */
  appBar?:
    | false
    | (Partial<AppBarProps> & {
        /** AppBar를 직접 렌더하고 싶으면 사용 */
        render?: (props: Partial<AppBarProps>) => ReactNode;
      });
  /** 하단 네비를 숨기려면 false, 보이려면 ReactNode (기본 BottomNavigation) */
  bottomNav?: boolean;
  /** 본문 컨텐츠 */
  children: ReactNode;
}

const PageFrame = ({ appBar, bottomNav, children }: PageFrameProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const appBarRef = useRef<HTMLElement>(null);

  // AppBar 높이 계산
  useLayoutEffect(() => {
    if (!appBar || !appBarRef.current) {
      setAppBarHeight(0);
      return;
    }

    const updateAppBarHeight = () => {
      if (appBarRef.current) {
        const height = appBarRef.current.offsetHeight;
        setAppBarHeight(height);
      }
    };

    // 초기 높이 계산
    updateAppBarHeight();

    // ResizeObserver로 높이 변화 감지
    const resizeObserver = new ResizeObserver(updateAppBarHeight);
    if (appBarRef.current) {
      resizeObserver.observe(appBarRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [appBar]);

  // 스크롤 상태 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // 초기 스크롤 상태 확인
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      className={cn('container')}
      data-bottom-nav-visible={bottomNav !== false || undefined}
    >
      {/* 상단 앱바 */}
      {appBar && (
        <header
          ref={appBarRef}
          className={cn('app_bar')}
          data-scrolled={isScrolled}
        >
          <AppBar
            variant={appBar.variant}
            title={appBar.title}
            showBack={appBar.showBack}
            backHref={appBar.backHref}
            right={appBar.right}
            additionalContent={appBar.additionalContent}
          />
        </header>
      )}

      {/* 본문 컨텐츠 */}
      <main
        className={cn('content')}
        style={{
          paddingTop:
            appBar && appBar.variant !== 'transparent' && appBarHeight > 0
              ? `${appBarHeight}px`
              : undefined,
        }}
      >
        {children}
      </main>

      {/* 하단 네비게이션 */}
      {bottomNav !== false && (
        <nav className={cn('bottom_nav')}>
          <BottomNavigation />
        </nav>
      )}
    </div>
  );
};

export default PageFrame;
