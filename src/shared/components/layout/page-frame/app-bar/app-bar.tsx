import classNames from 'classnames/bind';

import { LeftArrowIcon } from '@/assets/icons';

import styles from './app-bar.module.scss';
import { AppBarProps } from './app-bar.type';

const cn = classNames.bind(styles);

const AppBar = ({
  variant = 'default',
  title,
  showBack,
  onBack,
  right,
}: AppBarProps) => {
  return (
    <div className={cn('container')} data-variant={variant}>
      <div
        className={cn('left_container')}
        role={showBack ? 'button' : undefined}
        onClick={showBack ? onBack : undefined}
      >
        {showBack && (
          <div className={cn('back_icon')} aria-hidden="true">
            <LeftArrowIcon width={16} height={16} />
          </div>
        )}
        {title && <div className={cn('title')}>{title}</div>}
      </div>

      {right && (
        <div className={cn('right_container')}>
          {right.map((item, index) => (
            <button
              key={index}
              className={cn('right_button')}
              onClick={item.onClick}
              aria-label={item.ariaLabel}
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppBar;
