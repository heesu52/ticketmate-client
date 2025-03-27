import { ButtonHTMLAttributes } from 'react';

import styles from './fill-button.module.scss';

interface FillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  label: string;
}

export default function FillButton({
  size = 'large',
  label,
  ...props
}: FillButtonProps) {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      <span>{label}</span>
    </button>
  );
}
