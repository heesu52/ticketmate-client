import React, {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames/bind';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';

import { RadioOption } from '@/shared/components/ui/radio/radio.type';

import styles from './radio.module.scss';

const cn = classNames.bind(styles);

interface RadioGroupContextType {
  /** 현재 선택된 라디오의 값 */
  value: string;
  /** 라디오의 값을 설정하는 함수 */
  setValue: (v: string) => void;
  /** 현재 선택된 input radio의 값 */
  inputValue: string; // 현재 선택된 input radio의 값
  /** input radio의 값을 설정하는 함수 */
  setInputValue: (inputValue: string) => void;
  /** 라디오의 이름(그룹) */
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error('Radio 컴포넌트는 RadioGroup 내부에서 사용해야 합니다.');
  return context;
};

interface RadioGroupProps {
  children: ReactNode;
  /** 라디오의 이름(그룹) */
  name: string;
  /** 라디오의 라벨 */
  ariaLabel: string;
  /** 현재 선택된 라디오의 값 */
  value: string;
  /** 라디오의 값을 설정하는 함수 */
  onValueChange: (value: string) => void;
  /** 현재 선택된 input radio의 값 */
  inputValue?: string;
  /** input radio의 값을 설정하는 함수 */
  onInputChange?: (inputValue: string) => void;
}

export const RadioGroup = ({
  children,
  name,
  ariaLabel,
  value,
  onValueChange,
  inputValue,
  onInputChange,
}: RadioGroupProps) => {
  // ✅ 내부 상태 fallback (부모가 안 주면 이걸로 동작)
  const [innerInputValue, setInnerInputValue] = useState<string>('');

  // 부모가 controlled로 값을 넘겨주면 내부 상태와 동기화
  useEffect(() => {
    if (inputValue !== undefined) {
      setInnerInputValue(inputValue);
    }
  }, [inputValue]);

  const handleSetInputValue = useCallback(
    (inputValue: string) => {
      if (onInputChange) {
        onInputChange(inputValue);
      } else {
        setInnerInputValue(inputValue);
      }
    },
    [onInputChange],
  );

  const ctxValue = useMemo<RadioGroupContextType>(() => {
    const ctx = {
      value: value,
      setValue: onValueChange,
      inputValue: inputValue ?? innerInputValue,
      setInputValue: handleSetInputValue,
      name,
    };

    return ctx;
  }, [
    value,
    onValueChange,
    inputValue,
    innerInputValue,
    name,
    handleSetInputValue,
  ]);

  return (
    <RadixRadioGroup.Root
      className={cn('radio_group')}
      value={value}
      onValueChange={onValueChange}
      name={name}
      aria-label={ariaLabel}
    >
      <RadioGroupContext.Provider value={ctxValue}>
        {children}
      </RadioGroupContext.Provider>
    </RadixRadioGroup.Root>
  );
};

interface RadioProps {
  option: RadioOption;
}

/** 입력 가능한 라디오의 최대 길이 */
const INPUT_MAX_LENGTH = 20;

/**
 * 라디오 컴포넌트
 * @description 라디오 컴포넌트는 라디오 그룹 내부에서 사용되어야 합니다.
 *
 * @example
 * ```tsx
 * const options = [
 *  { value: 'option1', label: '옵션 1' },
 *  { value: 'option2', label: '옵션 2' },
 *  { value: 'option3', label: '기타', type: 'input' },
 *  { value: 'option4', label: '기타', type: 'input', disabled: true },
 * ];
 *
 * <RadioGroup
 *  name="radioGroup"
 *  ariaLabel="radioGroup"
 *  value="option1"
 *  onValueChange={(value) => console.log(value)}
 *  inputValue="option1"
 *  onInputChange={(value) => console.log(value)}
 * >
 * {options.map((option) => (
 *  <Radio key={option.value} option={option} />
 * ))}
 * </RadioGroup>
 * ```
 */
export const Radio = ({ option }: RadioProps) => {
  const { value, setValue, inputValue, setInputValue, name } = useRadioGroup();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isSelected = value === option.value;
  const isInputType = option.type === 'input';

  // 전 상태 기억해서 "선택 → 비선택" 전이 때만 초기화
  const wasSelectedRef = useRef(isSelected);
  useEffect(() => {
    if (isInputType && wasSelectedRef.current && !isSelected) {
      // 선택되어 있던 입력형이 다른 라디오로 변경되어 비선택이 된 순간
      setInputValue('');
      setIsInputFocused(false);
    }

    wasSelectedRef.current = isSelected;
  }, [isSelected, isInputType, setInputValue]);

  // 입력 반영은 선택된 상태에서만
  const handleInputChange = (value: string) => {
    if (isSelected) setInputValue(value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    // 포커스 시 선택 보장
    if (!isSelected) setValue(option.value);
  };

  // input radio가 선택되었을 때 포커스 처리
  const handleClickRadio = () => {
    if (isInputType) {
      inputRef.current?.focus();
    }
  };

  if (isInputType) {
    return (
      <RadixRadioGroup.Item
        className={cn('radio_item')}
        value={option.value}
        id={`${name}-${option.value}`}
        onClick={handleClickRadio}
        disabled={option.disabled}
      >
        <input
          className={cn('radio_input')}
          id={`${name}-${option.value}`}
          ref={inputRef}
          type="text"
          value={isSelected ? inputValue : ''} // 비선택이면 화면도 비움
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={() => setIsInputFocused(false)}
          placeholder={option.label}
          maxLength={INPUT_MAX_LENGTH}
          aria-label={option.label}
        />

        {isInputFocused && isSelected && (
          <span className={cn('radio_input_length')}>
            {inputValue.length}/{INPUT_MAX_LENGTH}
          </span>
        )}
      </RadixRadioGroup.Item>
    );
  }

  return (
    <RadixRadioGroup.Item
      className={cn('radio_item')}
      value={option.value}
      id={`${name}-${option.value}`}
    >
      <span className={cn('radio_label')}>{option.label}</span>
    </RadixRadioGroup.Item>
  );
};
