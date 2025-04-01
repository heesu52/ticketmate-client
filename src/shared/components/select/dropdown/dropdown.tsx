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

import styles from './dropdown.module.scss';

const cn = classNames.bind(styles);

export interface DropdownContextType {
  selectedValue: string; // 선택된 값
  setSelectedValue: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[]; // 옵션 목록
  addOption: (value: string, label: string, disabled?: boolean) => void; // 옵션 추가 함수
  isOpen: boolean; // 드롭다운 열림 여부
  setIsOpen: (open: boolean) => void;
  focusedIndex: number; // 현재 포커스된 옵션 인덱스
  setFocusedIndex: (index: number | ((prev: number) => number)) => void;
}

export interface DropdownProps {
  children: ReactNode;
  defaultValue?: string;
  onSelect?: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'Dropdown 컴포넌트는 Dropdown.Provider 하위에서 사용되어야 합니다.',
    );
  }
  return context;
};

const Dropdown = ({
  children,
  defaultValue = '',
  onSelect,
}: DropdownProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [options, setOptions] = useState<
    { value: string; label: string; disabled?: boolean }[]
  >([]);
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

  useEffect(() => {
    if (onSelect) onSelect(selectedValue);
  }, [selectedValue, onSelect]);

  return (
    <DropdownContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        options,
        addOption,
        isOpen,
        setIsOpen,
        focusedIndex,
        setFocusedIndex,
      }}
    >
      <div className={cn('dropdown')} ref={wrapperRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  label: string;
  placeholder?: string;
  maxHeight?: string;
}

const DropdownTrigger = ({
  label,
  placeholder = '선택해주세요.',
  maxHeight = '200px',
}: DropdownTriggerProps): JSX.Element => {
  const {
    selectedValue,
    setSelectedValue,
    options,
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
  } = useDropdownContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

  // 고유한 ID 생성 (label이 있으면 이를 기반으로, 없으면 기본값)
  const triggerId = label
    ? `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`
    : 'dropdown-trigger';

  // 다음 disabled 되지 않은 index를 return
  const findNextEnabledIndex = (start: number, direction: 'up' | 'down') => {
    let nextIndex = start;
    const step = direction === 'down' ? 1 : -1;

    do {
      nextIndex += step;
      if (nextIndex < 0 || nextIndex >= options.length) return start; // 범위를 벗어나면 현재 인덱스 유지
    } while (options[nextIndex]?.disabled); // disabled가 아닌 옵션을 찾을 때까지 반복

    return nextIndex;
  };

  // 접근성을 위한 키보드 접근
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(-1);
        }
        setFocusedIndex((prev) => {
          const nextIndex = findNextEnabledIndex(prev, 'down');
          return nextIndex < options.length ? nextIndex : prev;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const nextIndex = findNextEnabledIndex(prev, 'up');
          return nextIndex >= 0 ? nextIndex : prev;
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
      <label className={cn('dropdown_label')} htmlFor={triggerId}>
        {label}
      </label>

      <button
        type="button"
        id={triggerId}
        ref={triggerRef}
        className={cn('dropdown_select', !selectedValue && 'placeholder')}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label ? `${label}, 현재 선택: ${selectedLabel}` : undefined}
      >
        {selectedLabel}
        <BottomArrowIcon
          className={cn('icon', { open: isOpen })}
          width={16}
          height={16}
          fill="var(--gray-4)"
        />
      </button>

      {isOpen && (
        <ul
          className={cn('options_list')}
          style={{ maxHeight }}
          role="listbox"
          aria-activedescendant={
            focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
          }
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              id={`option-${index}`}
              className={cn('option', {
                selected: option.value === selectedValue,
                focused: index === focusedIndex,
              })}
              role="option"
              aria-selected={option.value === selectedValue}
              aria-disabled={option.disabled}
              onClick={() => {
                if (!option.disabled) {
                  setSelectedValue(option.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

interface DropdownOptionProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

const DropdownOption = ({
  value,
  children,
  disabled = false,
}: DropdownOptionProps) => {
  const { addOption } = useDropdownContext();

  useEffect(() => {
    addOption(value, String(children), disabled);
  }, [value, children, disabled, addOption]);

  return null;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Option = DropdownOption;

export default Dropdown;
