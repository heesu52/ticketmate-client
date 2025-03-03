import { ReactNode } from 'react';

import cn from 'classnames';

import styles from './tag.module.scss';

interface TagComponentProps {
  children: ReactNode | string;
  type?: 'bank-positive' | 'bank-negative' | 'd-day';
}

const Tag = ({ children, type = 'bank-positive' }: TagComponentProps) => {
  const buttonClass = cn(styles.button, styles[type]);

  return (
    <button className={buttonClass}>
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Tag;
