import { ReactNode } from 'react';

import cn from 'classnames';

import styles from './badge.module.scss';

interface BadgeComponentProps {
  children: ReactNode | string;
  type?: 'type-b' | 'type-a';
}

const Badge = ({ children, type = 'type-a' }: BadgeComponentProps) => {
  const BadgeClass = cn(styles.button, styles[type]);

  return (
    <div className={BadgeClass}>
      <span className={styles.label}>{children}</span>
    </div>
  );
};

export default Badge;
