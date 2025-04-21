import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './form-tab-button.module.scss';

interface FormTapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive: boolean;
  onClick: () => void;
  rightIcon?: ReactNode;
}

export default function FormTapButton({
  label,
  isActive,
  onClick,
  rightIcon,
  ...props
}: FormTapButtonProps) {
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
