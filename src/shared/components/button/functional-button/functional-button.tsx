import { ButtonHTMLAttributes } from 'react';

import styles from './functional-button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  variant?: 'border' | 'fill' | 'back';
  label: string;
}

export default function Button({
  size = 'large',
  variant = 'border',
  label,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]}`}
      {...props}
    >
      <span>{label}</span>
    </button>
  );
}
