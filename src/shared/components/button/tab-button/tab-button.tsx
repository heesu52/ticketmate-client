import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './tab-button.module.scss';

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive: boolean;
  onClick: () => void;
  rightIcon?: ReactNode;
}

export default function TabButton({
  label,
  isActive,
  onClick,
  rightIcon,
  ...props
}: TabButtonProps) {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      {...props}
    >
      <span>{label}</span>
      {rightIcon && (
        <div
          className={`${styles.righticon_container} ${
            isActive ? styles.active_icon : ''
          }`}
        >
          {rightIcon}
        </div>
      )}
    </button>
  );
}
