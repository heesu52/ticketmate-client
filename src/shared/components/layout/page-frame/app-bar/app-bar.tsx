'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '@/assets/icons';

import styles from './app-bar.module.scss';
import { AppBarProps } from './app-bar.type';

const cn = classNames.bind(styles);

const AppBar = ({
  variant = 'default',
  title,
  showBack,
  backHref,
  right,
}: AppBarProps) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

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
      data-variant={variant}
      data-scrolled={isScrolled}
    >
      <div
        className={cn('left_container')}
        role={showBack ? 'button' : undefined}
        onClick={showBack ? handleBack : undefined}
      >
        {showBack && (
          <div className={cn('back_icon')} aria-hidden="true">
            <LeftArrowIcon width={16} height={16} />
          </div>
        )}
        {title && <div className={cn('title')}>{title}</div>}
      </div>

      {right && <div className={cn('right_container')}>{right}</div>}
    </div>
  );
};

export default AppBar;
