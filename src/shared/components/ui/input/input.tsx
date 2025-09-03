import { type RefObject, useId, type InputHTMLAttributes } from 'react';

import classNames from 'classnames/bind';

import styles from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 라벨 */
  label: string;
  /** 에러 상태 */
  isError?: boolean;
  /** ref 참조 */
  ref?: RefObject<HTMLInputElement | null>;
}

const cn = classNames.bind(styles);

const Input = ({ label, isError, ref, ...props }: InputProps) => {
  const generatedId = useId();

  const inputId = props.id ?? generatedId;
  const inputType = props.type || 'text';
  const inputPlaceholder = props.placeholder || '';

  return (
    <div className={cn('input_wrapper')}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        ref={ref}
        type={inputType}
        placeholder={inputPlaceholder}
        aria-invalid={!!isError}
        data-error={!!isError}
        {...props}
      />
    </div>
  );
};

export default Input;
