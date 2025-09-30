import React, { ReactNode } from 'react';

import classNames from 'classnames/bind';

import styles from './input.module.scss';

interface IconProps {
  icon: ReactNode;
  onIconClick?: () => void;
  iconAriaLabel?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  /** 라벨 */
  label: string;
  /** 에러 상태 */
  isError?: boolean;
  /** ref 참조 */
  ref?: React.Ref<HTMLInputElement>;
  iconProps?: IconProps;
}

const cn = classNames.bind(styles);

const Input = ({
  id,
  label,
  isError,
  ref,
  iconProps,
  ...props
}: InputProps) => {
  const inputType = props.type || 'text';
  const inputPlaceholder = props.placeholder || '';

  const handleIconMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleIconClick = () => {
    if (iconProps?.onIconClick) {
      iconProps.onIconClick();
    } else {
      (document.getElementById(id) as HTMLInputElement | null)?.focus();
    }
  };

  return (
    <div className={cn('container')}>
      <label htmlFor={id}>{label}</label>
      <div className={cn('input_wrapper')}>
        <input
          id={id}
          ref={ref}
          type={inputType}
          placeholder={inputPlaceholder}
          aria-invalid={!!isError}
          data-error={!!isError}
          {...props}
        />
        {iconProps?.icon && (
          <button
            type="button"
            className={cn('input_icon')}
            onMouseDown={handleIconMouseDown}
            onClick={handleIconClick}
            tabIndex={-1}
            aria-label={iconProps?.iconAriaLabel}
            disabled={props.disabled}
          >
            {iconProps?.icon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
