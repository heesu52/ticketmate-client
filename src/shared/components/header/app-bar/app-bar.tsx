'use client';

import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '@/assets/icons';

import styles from './app-bar.module.scss';

const cn = classNames.bind(styles);

interface AppBarProps {
  title: string;
  backURL?: string;
  action?: ReactNode;
  hasBackground?: boolean;
}

const AppBar = ({
  title,
  backURL,
  action,
  hasBackground = true,
}: AppBarProps) => {
  const router = useRouter();

  // 뒤로가기 버튼
  const handleBack = () => {
    if (backURL) {
      router.push(backURL);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.left_container)}>
        <button
          className={styles.back_button}
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          <LeftArrowIcon
            width={16}
            height={16}
            fill={hasBackground ? `var(--white)` : `var(--textColor-main)`}
          />
          {title && <span className={styles.title}>{title}</span>}
        </button>
      </div>

      <div className={cn(styles.right_container)}>{action}</div>
    </div>
  );
};

export default AppBar;
