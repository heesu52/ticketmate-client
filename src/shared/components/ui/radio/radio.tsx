import React, { ReactNode, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';

import { RadioOption } from '@/shared/components/ui/radio/radio.type';

import styles from './radio.module.scss';

const cn = classNames.bind(styles);

interface RadioGroupProps {
  children: ReactNode;
  name: string;
  ariaLabel: string;
  value: string;
  onValueChange: (value: string) => void;
}

export const RadioGroup = ({
  children,
  name,
  ariaLabel,
  value,
  onValueChange,
}: RadioGroupProps) => {
  return (
    <RadixRadioGroup.Root
      className={cn('radio_group')}
      value={value}
      onValueChange={onValueChange}
      name={name}
      aria-label={ariaLabel}
    >
      {children}
    </RadixRadioGroup.Root>
  );
};

interface RadioProps {
  name: string;
  option: RadioOption;
  onOptionChange?: (option: RadioOption) => void;
}

const INPUT_MAX_LENGTH = 20;

export const Radio = ({ name, option, onOptionChange }: RadioProps) => {
  // 입력 가능한 라디오 입력 값 관리
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<Record<string, string>>({});
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 입력 가능한 라디오 입력 값 변경 시 처리
  const handleInputChange = (optionKey: string, inputValue: string) => {
    setInputValue((prev) => ({
      ...prev,
      [optionKey]: inputValue,
    }));

    // 입력값이 변경되면 옵션 업데이트
    const updatedOption = {
      ...option,
      value: inputValue,
    };

    onOptionChange?.(updatedOption);
  };

  const handleRadioItemClick = (e: React.MouseEvent) => {
    onOptionChange?.(option);

    if (option.type === 'input') {
      inputRef.current?.focus();
    } else {
      // 일반 라디오 선택 시 - input 타입 라디오의 값 초기화를 위해 부모에게 알림
      onOptionChange?.(option);
    }
  };

  // input 값이 변경될 때만 로컬 상태 동기화
  useEffect(() => {
    if (option.type === 'input' && option.value !== inputValue[option.key]) {
      setInputValue((prev) => ({
        ...prev,
        [option.key]: option.value || '',
      }));
    }
  }, [option.value, option.key, option.type]);

  if (option.type === 'input') {
    return (
      <RadixRadioGroup.Item
        className={cn('radio_item')}
        value={option.key}
        id={`${name}-${option.key}`}
        onClick={handleRadioItemClick}
      >
        <label
          className={cn('radio_label')}
          htmlFor={`${name}-${option.key}`}
          aria-label={option.label}
        >
          <input
            className={cn('radio_input')}
            id={`${name}-${option.key}`}
            ref={inputRef}
            type="text"
            value={inputValue[option.key] || ''}
            onChange={(e) => handleInputChange(option.key, e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder={option.label}
            maxLength={INPUT_MAX_LENGTH}
          />

          {isInputFocused && (
            <span className={cn('radio_input_length')}>
              {(inputValue[option.key] || '').length}/{INPUT_MAX_LENGTH}
            </span>
          )}
        </label>
      </RadixRadioGroup.Item>
    );
  }

  return (
    <RadixRadioGroup.Item
      key={option.key}
      className={cn('radio_item')}
      value={option.key}
      id={`${name}-${option.key}`}
      onClick={handleRadioItemClick}
    >
      <label className={cn('radio_label')} htmlFor={`${name}-${option.key}`}>
        {option.label}
      </label>
    </RadixRadioGroup.Item>
  );
};
