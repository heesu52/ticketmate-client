'use client';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { LeftArrowIcon, ShareIcon } from '@/assets/icons';
import { useAppBarStore } from '@/shared/components/header/app-bar/use-app-bar-store';

import styles from './app-bar.module.scss';

const cn = classNames.bind(styles);

const AppBar = () => {
  const { title, backURL, hasShareButton, backgroundColor } = useAppBarStore();
  const router = useRouter();

  const handleBack = () => {
    if (backURL) {
      router.push(backURL);
    } else {
      router.back();
    }
  };

  const handleShare = () => {
    console.log('more');
  };

  return (
    <div
      className={cn(
        styles.container,
        backgroundColor && styles[backgroundColor],
      )}
    >
      <div className={cn(styles.left_container)}>
        <button
          className={styles.back_button}
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          <LeftArrowIcon
            className={styles.icon}
            width={16}
            height={16}
            fill={
              backgroundColor === 'transparent'
                ? `var(--white)`
                : `var(--textColor-main)`
            }
          />
        </button>
        {title && <span className={styles.title}>{title}</span>}
      </div>

      <div className={cn(styles.right_container)}>
        {hasShareButton && (
          <button
            className={styles.more_button}
            onClick={handleShare}
            aria-label="공유하기"
          >
            <ShareIcon
              className={styles.icon}
              width={20}
              height={20}
              fill={
                backgroundColor === 'transparent'
                  ? `var(--white)`
                  : `var(--textColor-main)`
              }
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
