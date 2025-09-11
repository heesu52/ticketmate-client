'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { RadioGroup } from 'radix-ui';

import { RadioOption } from '@/shared/components/ui/radio/radio.type';

import styles from './radio.module.scss';

const cn = classNames.bind(styles);

interface RadioProps {
  options: RadioOption[];
  onOptionsChange?: (options: RadioOption[]) => void;
  name?: string;
  'aria-label'?: string;
}
const INPUT_MAX_LENGTH = 20;

const Radio = ({
  options,
  onOptionsChange,
  name,
  'aria-label': ariaLabel,
}: RadioProps) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // checked 상태가 변경될 때 input 타입이 아닌 다른 옵션으로 변경되면 input value 초기화
  useEffect(() => {
    const checkedOption = options.find((opt) => opt.checked);
    if (checkedOption?.type !== 'input') {
      // input 타입이 아닌 옵션으로 변경되면 모든 input value 초기화
      setInputValues({});
      setFocusedInput(null);
    }
  }, [options]);

  const handleInputChange = (optionKey: string, inputValue: string) => {
    setInputValues((prev) => ({
      ...prev,
      [optionKey]: inputValue,
    }));

    // 입력값이 있으면 해당 옵션을 선택하고 value를 업데이트
    if (inputValue.trim()) {
      const updatedOptions = options.map((opt) => ({
        ...opt,
        checked: opt.key === optionKey,
        value: opt.key === optionKey ? inputValue : opt.value,
      }));
      onOptionsChange?.(updatedOptions);
    }
  };

  // checked된 옵션의 key를 찾는 함수
  const getCheckedValue = () => {
    const checkedOption = options.find((opt) => opt.checked);

    return checkedOption?.key || '';
  };

  // 옵션 선택 핸들러
  const handleOptionChange = (selectedKey: string) => {
    const updatedOptions = options.map((opt) => ({
      ...opt,
      checked: opt.key === selectedKey,
    }));
    onOptionsChange?.(updatedOptions);
  };

  return (
    <RadioGroup.Root
      className={cn('radio_group')}
      value={getCheckedValue()}
      onValueChange={handleOptionChange}
      name={name}
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        // input 타입일 때: 클릭하면 input 필드가 표시됨
        if (option.type === 'input') {
          return (
            <RadioGroup.Item
              key={option.key}
              className={cn('radio_item')}
              value={option.key}
              id={`radio-${option.key}`}
              onClick={() => {
                inputRef.current?.focus();
              }}
            >
              <label
                className={cn('radio_label')}
                htmlFor={`radio-${option.key}`}
                aria-label={option.label}
              >
                <input
                  className={cn('radio_input')}
                  id={`radio-${option.key}`}
                  ref={inputRef}
                  type="text"
                  value={inputValues[option.key] || ''}
                  onChange={(e) =>
                    handleInputChange(option.key, e.target.value)
                  }
                  onFocus={() => setFocusedInput(option.key)}
                  onBlur={() => setFocusedInput(null)}
                  placeholder={option.label}
                  autoFocus
                  maxLength={INPUT_MAX_LENGTH}
                />

                {focusedInput === option.key && (
                  <span className={cn('radio_input_length')}>
                    {(inputValues[option.key] || '').length}/{INPUT_MAX_LENGTH}
                  </span>
                )}
              </label>
            </RadioGroup.Item>
          );
        }

        // 기본 라디오 타입
        return (
          <RadioGroup.Item
            key={option.key}
            className={cn('radio_item')}
            value={option.key}
            id={`radio-${option.key}`}
          >
            <label
              className={cn('radio_label')}
              htmlFor={`radio-${option.key}`}
            >
              {option.label}
            </label>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
};

export default Radio;
