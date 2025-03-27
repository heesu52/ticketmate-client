import { ButtonHTMLAttributes } from 'react';

import styles from './border-button.module.scss';

interface BorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'medium' | 'small';
  label: string;
}

export default function BorderButton({
  size = 'medium',
  label,
  ...props
}: BorderButtonProps) {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      <span>{label}</span>
    </button>
  );
}
