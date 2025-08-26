import { ReactNode } from 'react';

import cn from 'classnames';

import styles from './badge.module.scss';

interface BadgeComponentProps {
  children: ReactNode | string;
  variant?: 'type-a' | 'type-b' | 'type-c';
}

const Badge = ({ children, variant = 'type-a' }: BadgeComponentProps) => {
  return (
    <div className={cn(styles.badge)} data-variant={variant}>
      {children}
    </div>
  );
};

export default Badge;
