import { ButtonHTMLAttributes } from 'react';

import styles from './tap-button.module.scss';

interface TapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  label: string;
}

export default function TapButton({
  size = 'large',
  label,
  ...props
}: TapButtonProps) {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      <span>{label}</span>
    </button>
  );
}
