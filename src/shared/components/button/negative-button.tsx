import { ButtonHTMLAttributes } from 'react';

import styles from './negative-button.module.scss';

interface NegativeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'medium' | 'small';
  label: string;
}

export default function NegativeButton({
  size = 'medium',
  label,
  ...props
}: NegativeButtonProps) {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      <span>{label}</span>
    </button>
  );
}
