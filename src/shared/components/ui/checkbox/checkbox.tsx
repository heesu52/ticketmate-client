import React from 'react';

import styles from './checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  id,
  label,
  checked,
  disabled,
  ...props
}: CheckboxProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.checkbox_label} htmlFor={id}>
        {label}
      </label>

      <input
        className={styles.checkbox_input}
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default Checkbox;
