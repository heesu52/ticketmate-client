import { ButtonHTMLAttributes } from 'react';

import styles from './positive-button.module.scss';

interface PositiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  label: string;
}

export default function PositiveButton({
  size = 'large',
  label,
  ...props
}: PositiveButtonProps) {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      <span>{label}</span>
    </button>
  );
}
