'use client';

import React, { ReactNode, useContext, ChangeEvent, useState } from 'react';

import classNames from 'classnames/bind';

import { AlertCircleIcon } from '@/assets/icons';

import styles from './radio.module.scss';

const cn = classNames.bind(styles);

interface RadioGroupContextType {
  name: string;
  value: string | null;
  onChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<
  RadioGroupContextType | undefined
>(undefined);

interface RadioProps {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

const Radio = ({ value, label, disabled = false }: RadioProps) => {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error('Radio 컴포넌트는 RadioGroup 내부에서 사용해야 합니다.');

  const { name, value: selectedValue, onChange } = context;
  const isChecked = selectedValue === value;

  const handleChange = () => {
    if (!disabled) onChange(value);
  };

  return (
    <label className={cn('radio_container', { checked: isChecked, disabled })}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={cn('radio_button')}
      />
      <span className={cn('radio_label', { checked: isChecked })}>{label}</span>
    </label>
  );
};

interface RadioInputProps {
  placeholder?: string;
  disabled?: boolean;
}

const RadioInput = ({
  placeholder = '직접 입력',
  disabled = false,
}: RadioInputProps) => {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error(
      'RadioInput 컴포넌트는 RadioGroup 내부에서 사용해야 합니다.',
    );

  const { name, value, onChange } = context;
  const isChecked = value !== null && !context.value?.startsWith('option');
  const [error, setError] = useState('');

  const handleRadioChange = () => {
    if (!disabled) onChange('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = e.target.value;

    if (newValue.length < 10) {
      setError('최소 10자 이상 입력해야합니다.');
    } else if (newValue.length > 50) {
      setError('최대 50자까지만 입력할 수 있습니다.');
    } else {
      setError('');
    }

    onChange(newValue);
  };

  return (
    <>
      <label
        className={cn('radio_container', { checked: isChecked, disabled })}
      >
        <input
          type="radio"
          name={name}
          checked={isChecked}
          onChange={handleRadioChange}
          disabled={disabled}
          className={cn('radio_button')}
        />
        <input
          type="text"
          value={isChecked ? value || '' : ''}
          onChange={handleInputChange}
          onClick={() => !isChecked && onChange('')}
          disabled={disabled}
          placeholder={placeholder}
          className={cn('radio_input', { checked: isChecked })}
          minLength={10}
          maxLength={50}
        />
      </label>
      <>
        {isChecked && error && (
          <div className={cn('error_container')}>
            <AlertCircleIcon
              width={16}
              height={16}
              fill="var(--brandColor-main)"
            />
            <span className={cn('error_message')}>{error}</span>
          </div>
        )}
      </>
    </>
  );
};

interface RadioGroupProps {
  name?: string;
  value: string | null;
  onChange: (value: string) => void;
  children: ReactNode;
}

const RadioGroup = ({
  name = 'radio-group',
  value,
  onChange,
  children,
}: RadioGroupProps) => {
  return (
    <div className={cn('radio_group')} role="radiogroup">
      <RadioGroupContext.Provider value={{ name, value, onChange }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

RadioGroup.Radio = Radio;
RadioGroup.RadioInput = RadioInput;

export default RadioGroup;
