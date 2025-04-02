import { forwardRef } from 'react';

import classNames from 'classnames/bind';

import { AlertCircleIcon } from '@/assets/icons';
import { InputProps } from '@/shared/components/input/input.type';

import styles from './input.module.scss';

const cn = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, iconProps, error, errorMessage, ...props }, ref) => {
    const position = iconProps?.position || 'right';
    const errorMessageId = error && errorMessage ? `${id}-error` : undefined;

    return (
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className={styles.input_container}>
          <input
            ref={ref}
            className={cn(
              styles.input,
              styles[position],
              iconProps ? styles.with_icon : styles.without_icon,
            )}
            id={id}
            aria-invalid={error ? 'true' : 'false'} // 에러 상태
            aria-describedby={errorMessageId} // 에러 메시지 연결
            {...props}
          />
          {iconProps && (
            <button
              className={cn(styles.icon, styles[position])}
              onClick={iconProps.onIconClick}
            >
              {iconProps.icon}
            </button>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && errorMessage && (
          <span id={errorMessageId} className={styles.error_message}>
            <AlertCircleIcon
              width={16}
              height={16}
              fill="var(--brandColor-main)"
            />
            <p>{errorMessage}</p>
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
