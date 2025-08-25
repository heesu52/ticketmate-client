import { ReactNode } from 'react';

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
  bottomNav?: false;
  /** 본문 컨텐츠 */
  children: ReactNode;
}

const PageFrame = ({ appBar, bottomNav, children }: PageFrameProps) => {
  return (
    <div
      className={cn('container')}
      data-app-bar-visible={!!appBar || undefined}
      data-app-bar-transparent={
        (appBar && 'variant' in appBar && appBar.variant === 'transparent') ||
        undefined
      }
      data-bottom-nav-visible={bottomNav !== false || undefined}
    >
      {/* 상단 앱바 */}
      {appBar && (
        <header className={cn('app_bar')}>
          <AppBar
            variant={appBar.variant}
            title={appBar.title}
            showBack={appBar.showBack}
            onBack={appBar.onBack}
            right={appBar.right}
          />
        </header>
      )}

      {/* 본문 컨텐츠 */}
      <main className={cn('content')}>{children}</main>

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
