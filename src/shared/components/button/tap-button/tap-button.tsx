import { ButtonHTMLAttributes } from 'react';

import styles from './tap-button.module.scss';

interface TapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small';
  label: string;
  isActive: boolean; // 활성화 여부를 부모에서 전달받음
  onClick: () => void; // 클릭 시 부모에서 상태 변경
}

export default function TapButton({
  size = 'large',
  label,
  isActive,
  onClick,
  ...props
}: TapButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      {...props}
    >
      <span>{label}</span>
    </button>
  );
}
