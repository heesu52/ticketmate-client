'use client';

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
  additionalContent,
}: AppBarProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('container')} data-variant={variant}>
      <div className={cn('wrapper')}>
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

      {additionalContent && (
        <div className={cn('additional_content')}>{additionalContent}</div>
      )}
    </div>
  );
};

export default AppBar;
