import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './functional-button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  variant?: 'border' | 'fill' | 'back';
  children: ReactNode;
}

export default function Button({
  size = 'large',
  variant = 'border',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
