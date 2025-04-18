import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
  JSX,
} from 'react';

import { useClickOutside } from '@/shared/hooks/use-click-outside';

import styles from './dropdown.module.scss';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  focusedItem: number;
  setFocusedItem: (index: number) => void;
  label: string;
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

interface DropdownProps {
  children: ReactNode;
  label: string;
}

const Dropdown = ({ children, label }: DropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const items = dropdownRef.current?.querySelectorAll(`.${styles.item}`);
      if (!items) return;

      switch (event.key) {
        case 'Tab': {
          const activeElement = document.activeElement;
          const lastItem = items[items.length - 1];

          // 마지막 index에서 tab누르면 dropdown 닫기
          if (activeElement === lastItem) {
            setIsOpen(false);
            setFocusedItem(-1);
          }
          break;
        }

        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setFocusedItem(-1);
          triggerRef.current?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, focusedItem, setFocusedItem, label }}
    >
      <div ref={dropdownRef} className={styles.dropdown}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  children: ReactNode;
}

const DropdownTrigger = ({ children }: DropdownTriggerProps): JSX.Element => {
  const { isOpen, setIsOpen, label } = useDropdownContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      onClick={() => setIsOpen(!isOpen)}
      className={styles.trigger}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={`dropdown-content-${label}`}
      aria-label={label}
    >
      {children}
    </button>
  );
};

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
  listMaxHeight?: string;
  listMinWidth?: string;
}

const DropdownContent = ({
  children,
  className,
  listMaxHeight = 'auto',
  listMinWidth = 'auto',
}: DropdownContentProps): JSX.Element => {
  const { isOpen, label } = useDropdownContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [positionClass, setPositionClass] = useState<string>('left');

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const rect = contentRef.current.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // 화면의 50% 기준으로 위치 결정
    if (rect.left + rect.width / 2 < screenWidth / 2) {
      setPositionClass('left');
    } else {
      setPositionClass('right');
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      ref={contentRef}
      className={`${styles.content} ${styles[positionClass]} ${className || ''}`}
      style={{ maxHeight: listMaxHeight, minWidth: listMinWidth }}
      role="menu"
      id={`dropdown-content-${label}`}
      aria-labelledby={label}
    >
      {children}
    </div>
  ) : (
    <></>
  );
};

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const DropdownItem = ({
  children,
  onClick,
  disabled = false,
}: DropdownItemProps): JSX.Element => {
  const { setIsOpen, setFocusedItem } = useDropdownContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current && !disabled) {
      const index = Array.from(
        triggerRef.current.parentElement?.querySelectorAll(`.${styles.item}`) ||
          [],
      ).indexOf(triggerRef.current);
      setFocusedItem(index);
      triggerRef.current.focus();
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <button
      ref={triggerRef}
      className={`${styles.item}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
};

const DropdownSeparator = (): JSX.Element => {
  return <hr className={styles.separator} />;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
