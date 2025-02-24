import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent,
  JSX,
} from 'react';

import classNames from 'classnames/bind';

import BottomArrowIcon from '@/assets/icons/left_arrow.svg';

import styles from './dropdown.module.scss';

const cn = classNames.bind(styles);

export interface DropdownContextType {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  addOption: (value: string, label: string, disabled?: boolean) => void;
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
  if (!context)
    throw new Error(
      'Dropdown 컴포넌트는 Dropdown.Provider 하위에서 사용되어야 합니다.',
    );
  return context;
};

const Dropdown = ({
  children,
  defaultValue = '',
  onSelect,
}: DropdownProps): JSX.Element | null => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [options, setOptions] = useState<
    { value: string; label: string; disabled?: boolean }[]
  >([]);

  const addOption = (value: string, label: string, disabled?: boolean) => {
    setOptions((prev) => {
      if (prev.some((option) => option.value === value)) return prev;
      return [...prev, { value, label, disabled }];
    });
  };

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedValue);
    }
  }, [selectedValue, onSelect]);

  return (
    <DropdownContext.Provider
      value={{ selectedValue, setSelectedValue, options, addOption }}
    >
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  label: string;
  placeholder?: string;
}

const DropdownTrigger = ({
  label,
  placeholder = '선택해주세요.',
}: DropdownTriggerProps): JSX.Element => {
  const { selectedValue, setSelectedValue, options } = useDropdownContext();

  return (
    <>
      <label className={styles.dropdown_label} htmlFor={label}>
        {label}
      </label>

      <select
        className={cn(
          styles.dropdown_select,
          selectedValue === '' && styles.placeholder,
        )}
        id={label}
        value={selectedValue}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedValue(e.target.value)
        }
      >
        <option
          className={cn(styles.option, styles.placeholder)}
          value=""
          disabled
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            className={styles.option}
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      <BottomArrowIcon
        className={styles.icon}
        width={16}
        height={16}
        fill={'var(--gray-4)'}
      />
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
