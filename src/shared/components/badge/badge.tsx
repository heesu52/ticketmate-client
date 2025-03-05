import { ReactNode } from 'react';

import cn from 'classnames';

import styles from './badge.module.scss';

interface BadgeComponentProps {
  children: ReactNode | string;
  type?: 'bank-positive' | 'bank-negative' | 'd-day';
}

const Badge = ({ children, type = 'bank-positive' }: BadgeComponentProps) => {
  const BadgeClass = cn(styles.button, styles[type]);

  return (
    <div className={BadgeClass}>
      <span className={styles.label}>{children}</span>
    </div>
  );
};

export default Badge;
