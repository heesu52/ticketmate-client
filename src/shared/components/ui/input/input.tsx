import React, { useId } from 'react';

import classNames from 'classnames/bind';

import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 라벨 */
  label: string;
  /** 에러 상태 */
  isError?: boolean;
  /** ref 참조 */
  ref?: React.RefObject<HTMLInputElement | null>;
  /** 오른쪽 아이콘 */
  icon?: React.ReactNode;
  /** 아이콘 클릭 동작 */
  onIconClick?: () => void;
  /** 아이콘 버튼 aria-label */
  iconAriaLabel?: string;
}

const cn = classNames.bind(styles);

const Input = ({
  label,
  isError,
  ref,
  icon,
  onIconClick,
  iconAriaLabel = '아이콘 버튼',
  ...props
}: InputProps) => {
  const generatedId = useId();

  const inputId = props.id ?? generatedId;
  const inputType = props.type || 'text';
  const inputPlaceholder = props.placeholder || '';

  const handleIconMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick();
    } else {
      (document.getElementById(inputId) as HTMLInputElement | null)?.focus();
    }
  };

  return (
    <div className={cn('container')}>
      <label htmlFor={inputId}>{label}</label>
      <div className={cn('input_wrapper')}>
        <input
          id={inputId}
          ref={ref}
          type={inputType}
          placeholder={inputPlaceholder}
          aria-invalid={!!isError}
          data-error={!!isError}
          {...props}
        />
        {icon && (
          <button
            type="button"
            className={cn('input_icon')}
            onMouseDown={handleIconMouseDown}
            onClick={handleIconClick}
            tabIndex={-1}
            aria-label={iconAriaLabel}
            disabled={props.disabled}
          >
            {icon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
