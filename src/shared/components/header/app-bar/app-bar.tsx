'use client';

import { ReactNode, useEffect } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '@/assets/icons';
import { useAppBarStore } from '@/shared/components/header/app-bar/use-app-bar-store';

import styles from './app-bar.module.scss';

const cn = classNames.bind(styles);

interface AppBarProps {
  title: string;
  backURL?: string;
  action?: ReactNode;
  hasBackground?: boolean;
  isDynamicColor?: boolean;
}

const AppBar = ({
  title,
  backURL,
  action,
  hasBackground = true,
  isDynamicColor = false,
}: AppBarProps) => {
  const router = useRouter();
  const { setHasAppBar } = useAppBarStore();

  useEffect(() => {
    if (isDynamicColor) {
      setHasAppBar(false);
    } else {
      setHasAppBar(hasBackground);
    }

    return () => setHasAppBar(false);
  }, [hasBackground, isDynamicColor, setHasAppBar]);

  // 뒤로가기 버튼
  const handleBack = () => {
    if (backURL) {
      router.push(backURL);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        styles.container,
        hasBackground ? styles.has_background : styles.transparent,
      )}
    >
      <div className={cn(styles.left_container)}>
        <button
          className={styles.back_button}
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          <LeftArrowIcon
            width={16}
            height={16}
            fill={hasBackground ? `var(--textColor-main)` : `var(--white)`}
          />
          {title && <span className={styles.title}>{title}</span>}
        </button>
      </div>

      <div className={cn(styles.right_container)}>{action}</div>
    </div>
  );
};

export default AppBar;
