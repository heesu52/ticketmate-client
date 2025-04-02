import { forwardRef } from 'react';

import classNames from 'classnames/bind';

import { InputProps } from '@/shared/components/input/input.type';

import styles from './input.module.scss';

const cn = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, iconProps, ...props }, ref) => {
    const position = iconProps?.position || 'right';

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
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
