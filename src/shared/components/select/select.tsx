import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  KeyboardEvent,
  JSX,
} from 'react';

import classNames from 'classnames/bind';

import BottomArrowIcon from '@/assets/icons/left_arrow.svg';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import styles from './select.module.scss';

const cn = classNames.bind(styles);

interface OptionType {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectContextType {
  selectedValue: string; // 선택된 값
  setSelectedValue: (value: string) => void;
  options: OptionType[]; // 옵션 목록
  setOptions: (value: string, label: string, disabled?: boolean) => void; // 옵션 추가 함수
  isOpen: boolean; // 드롭다운 열림 여부
  setIsOpen: (open: boolean) => void;
  focusedIndex: number; // 현재 포커스된 옵션 인덱스
  setFocusedIndex: (index: number | ((prev: number) => number)) => void;
  disabled: boolean;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'Select 컴포넌트는 Select.Provider 하위에서 사용되어야 합니다.',
    );
  }
  return context;
};

interface SelectProps {
  children: ReactNode;
  defaultValue?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
}
const Select = ({
  children,
  defaultValue = '',
  onSelect,
  disabled = false,
}: SelectProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 옵션 목록을 동적으로 추가
  const addOption = (value: string, label: string, disabled?: boolean) => {
    setOptions((prev) => {
      if (prev.some((option) => option.value === value)) return prev;
      return [...prev, { value, label, disabled }];
    });
  };

  // 외부 클릭 시 드롭다운 닫기
  useClickOutside(wrapperRef, () => setIsOpen(false));

  // selectedValue가 변경될 때 focusedIndex를 업데이트
  useEffect(() => {
    const index = options.findIndex((option) => option.value === selectedValue);
    setFocusedIndex(index);
  }, [selectedValue, options]);

  useEffect(() => {
    if (onSelect) onSelect(selectedValue);
  }, [selectedValue, onSelect]);

  return (
    <SelectContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        options,
        setOptions: addOption,
        isOpen,
        setIsOpen,
        focusedIndex,
        setFocusedIndex,
        disabled,
      }}
    >
      <div className={cn('select')} ref={wrapperRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  label: string;
  icon?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
}
const SelectTrigger = ({
  label,
  icon,
  placeholder = '선택해주세요.',
}: SelectTriggerProps): JSX.Element => {
  const {
    selectedValue,
    setSelectedValue,
    options,
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
    disabled,
  } = useSelectContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const triggerId = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const findNextEnabledIndex = (
    start: number,
    direction: 'up' | 'down',
  ): number => {
    let next = start;
    const step = direction === 'down' ? 1 : -1;
    do {
      next += step;
      if (next < 0 || next >= options.length) return start; // 범위를 벗어나면 현재 인덱스 유지
    } while (options[next]?.disabled); // disabled가 아닌 옵션을 찾을 때까지 반복
    return next;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(-1);
        }
        setFocusedIndex((prev) => {
          const next = findNextEnabledIndex(prev, 'down');
          return next < options.length ? next : prev;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = findNextEnabledIndex(prev, 'up');
          return next >= 0 ? next : prev;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = options[focusedIndex];
          if (!option.disabled) {
            setSelectedValue(option.value);
            setIsOpen(false);
          }
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <>
      <label className={cn('select_label')} htmlFor={triggerId}>
        {label}
      </label>

      <button
        type="button"
        id={triggerId}
        ref={triggerRef}
        className={cn(
          'select_trigger',
          !selectedValue ? 'placeholder' : '',
          icon ? 'has_icon' : '',
          disabled && 'disabled',
        )}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${label}, 현재 선택: ${selectedLabel}`}
      >
        <span>{selectedLabel}</span>
        {!disabled &&
          (icon ?? (
            <BottomArrowIcon
              className={cn('icon', { open: isOpen })}
              width={16}
              height={16}
              fill="var(--gray-4)"
            />
          ))}
      </button>
    </>
  );
};

interface SelectOptionListProps {
  children: ReactNode;
  className?: string;
  listMaxHeight?: string;
  listMinWidth?: string;
}

const SelectOptionList = ({
  children,
  className,
  listMaxHeight = 'auto',
  listMinWidth = 'auto',
}: SelectOptionListProps) => {
  const { isOpen, focusedIndex } = useSelectContext();

  return (
    <ul
      className={cn('options_list', className)}
      style={{
        maxHeight: listMaxHeight,
        minWidth: listMinWidth,
        display: isOpen ? 'block' : 'none',
      }}
      role="listbox"
      aria-activedescendant={
        focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
      }
    >
      {children}
    </ul>
  );
};

interface SelectOptionProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}
const SelectOption = ({
  value,
  children,
  disabled = false,
}: SelectOptionProps) => {
  const {
    setOptions,
    selectedValue,
    setSelectedValue,
    setIsOpen,
    focusedIndex,
    options,
  } = useSelectContext();

  useEffect(() => {
    setOptions(value, String(children), disabled);
  }, [value, children, disabled, setOptions]);

  const index = options.findIndex((opt) => opt.value === value);

  return (
    <li
      id={`option-${index}`}
      className={cn('option', {
        selected: selectedValue === value,
        focused: focusedIndex === index,
        disabled,
      })}
      role="option"
      aria-selected={selectedValue === value}
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) {
          setSelectedValue(value);
          setIsOpen(false);
        }
      }}
    >
      {children}
    </li>
  );
};

Select.Trigger = SelectTrigger;
Select.OptionList = SelectOptionList;
Select.Option = SelectOption;

export default Select;
