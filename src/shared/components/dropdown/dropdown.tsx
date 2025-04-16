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
}

const Dropdown = ({ children }: DropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const items = dropdownRef.current?.querySelectorAll(
        `.${styles.item}, .${styles.subTrigger}`,
      );
      if (!items) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedItem((prev) => {
            const next = Math.min(prev + 1, items.length - 1);
            (items[next] as HTMLElement)?.focus();
            return next;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedItem((prev) => {
            const next = Math.max(prev - 1, 0);
            (items[next] as HTMLElement)?.focus();
            return next;
          });
          break;
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
      value={{ isOpen, setIsOpen, focusedItem, setFocusedItem }}
    >
      <div ref={dropdownRef} className={styles.dropdown}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  ariaLabel?: string;
}

const DropdownTrigger = ({
  children,
  asChild,
  ariaLabel,
}: DropdownTriggerProps): JSX.Element => {
  const { isOpen, setIsOpen } = useDropdownContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (asChild) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => setIsOpen(!isOpen),
      'aria-haspopup': 'menu',
      'aria-expanded': isOpen,
      'aria-controls': 'dropdown-content',
      'aria-label': ariaLabel,
      ref: triggerRef,
      className: styles.trigger,
    });
  }

  return (
    <button
      ref={triggerRef}
      onClick={() => setIsOpen(!isOpen)}
      className={styles.trigger}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls="dropdown-content"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
}

const DropdownContent = ({
  children,
  className,
}: DropdownContentProps): JSX.Element => {
  const { isOpen } = useDropdownContext();
  return isOpen ? (
    <div
      className={`${styles.content} ${className || ''}`}
      role="menu"
      id="dropdown-content"
      aria-labelledby="dropdown"
    >
      {children}
    </div>
  ) : (
    <></>
  );
};

interface DropdownGroupProps {
  children: ReactNode;
}

const DropdownGroup = ({ children }: DropdownGroupProps): JSX.Element => {
  return <div className={styles.group}>{children}</div>;
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
        triggerRef.current.parentElement?.querySelectorAll(
          `.${styles.item}, .${styles.subTrigger}`,
        ) || [],
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
      className={`${styles.item} ${disabled ? styles.disabled : ''}`}
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
Dropdown.Group = DropdownGroup;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
