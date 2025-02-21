import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent,
  JSX,
} from 'react';

import styles from './dropdown.module.scss';

export interface DropdownContextType {
  selected: string;
  setSelected: (value: string) => void;
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
const useDropdownContext = () => useContext(DropdownContext);

const Dropdown = ({
  children,
  defaultValue = '',
  onSelect,
}: DropdownProps): JSX.Element | null => {
  const [selected, setSelected] = useState(defaultValue);
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
      onSelect(selected);
    }
  }, [selected, onSelect]);

  return (
    <DropdownContext.Provider
      value={{ selected, setSelected, options, addOption }}
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
  const context = useDropdownContext();
  if (!context)
    throw new Error('DropdownTrigger는 Dropdown 내부에서만 사용 가능합니다.');

  return (
    <>
      <label className={styles.dropdown_label} htmlFor={label}>
        {label}
      </label>

      <select
        className={styles.dropdown_select}
        id={label}
        value={context.selected}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          context.setSelected(e.target.value)
        }
      >
        {!context.selected && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {context.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
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
  const context = useDropdownContext();
  if (!context)
    throw new Error('DropdownOption은 Dropdown 내부에서만 사용 가능합니다.');

  useEffect(() => {
    context.addOption(value, String(children), disabled);
  }, [context, value, children, disabled]);

  return null;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Option = DropdownOption;

export default Dropdown;
