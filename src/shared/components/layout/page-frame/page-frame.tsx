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
  bottomNav?: false | ReactNode;
  /** 본문 컨텐츠 */
  children: ReactNode;
}

const PageFrame = ({ appBar, bottomNav, children }: PageFrameProps) => {
  const isTransparent =
    appBar && 'variant' in appBar && appBar.variant === 'transparent';

  return (
    <div className={cn('container')} data-app-bar-transparent={isTransparent}>
      {/* 상단 앱바 */}
      {appBar && (
        <div className={cn('app_bar')}>
          <AppBar
            variant={appBar.variant}
            title={appBar.title}
            showBack={appBar.showBack}
            onBack={appBar.onBack}
            right={appBar.right}
          />
        </div>
      )}

      {/* 본문 컨텐츠 */}
      <main className={cn('content')}>{children}</main>

      {/* 하단 네비게이션 */}
      {bottomNav !== false && (
        <div className={cn('bottom_nav')}>
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default PageFrame;
