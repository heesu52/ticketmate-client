'use client';

import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  JSX,
  Ref,
  ButtonHTMLAttributes,
} from 'react';

import classNames from 'classnames/bind';

import styles from './dialog-modal.module.scss';

const cn = classNames.bind(styles);

export interface DialogModalContextType {
  open: () => void;
  close: () => void;
}

export interface DialogModalProps {
  children: ReactNode;
  defaultOpen?: boolean;
  modalRef?: Ref<DialogModalContextType>;
}

const DialogModalContext = createContext<DialogModalContextType | undefined>(
  undefined,
);
const useDialogModal = () => useContext(DialogModalContext);

// 모달 컴포넌트
const DialogModal = ({
  children,
  defaultOpen = false,
  modalRef,
}: DialogModalProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState<boolean>(defaultOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 모달 열기
  const open = () => {
    setIsMounted(true);
    // DOM에 반영된 후 showModal 호출
    setTimeout(() => {
      dialogRef.current?.showModal();
    }, 0);
  };

  // 모달 닫기
  const close = () => {
    dialogRef.current?.close();
    setIsMounted(false);
  };

  // modalRef에 open/close 메서드 할당
  useEffect(() => {
    if (modalRef) {
      if (typeof modalRef === 'function') {
        modalRef({ open, close });
      } else {
        (modalRef as React.RefObject<DialogModalContextType | null>).current = {
          open,
          close,
        };
      }
    }
  }, [modalRef]);

  useEffect(() => {
    if (defaultOpen) open();
  }, [defaultOpen]);

  if (!isMounted) return null;

  return (
    <dialog ref={dialogRef} className={styles.dialog_modal}>
      <DialogModalContext.Provider value={{ open, close }}>
        {children}
      </DialogModalContext.Provider>
    </dialog>
  );
};

// 모달의 본문 영역
interface DialogModalContentProps {
  children: ReactNode;
}

const Content = ({ children }: DialogModalContentProps): JSX.Element => {
  const context = useDialogModal();

  if (!context) {
    throw new Error(
      'Content는 DialogModal 컴포넌트 내부에서만 사용 가능합니다.',
    );
  }

  return <div className={styles.dialog_content}>{children}</div>;
};

// 모달의 액션 영역
interface DialogModalActionsProps {
  children: ReactNode;
}

const Action = ({ children }: DialogModalActionsProps): JSX.Element => {
  const context = useDialogModal();

  if (!context) {
    throw new Error(
      'Action은 DialogModal 컴포넌트 내부에서만 사용 가능합니다.',
    );
  }

  return <div className={styles.dialog_actions}>{children}</div>;
};

// 모달 버튼
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  buttonType?: 'positive' | 'negative';
  buttonSize?: 'large' | 'medium' | 'small';
}

const Button = ({
  children,
  onClick,
  buttonType = 'negative',
  buttonSize = 'medium',
  ...props
}: ButtonProps): JSX.Element => {
  const context = useDialogModal();

  if (!context) {
    throw new Error(
      'Button은 DialogModal 컴포넌트 내부에서만 사용 가능합니다.',
    );
  }

  const handleClick = () => {
    if (onClick) onClick();
    context.close();
  };

  return (
    <button
      className={cn(styles[buttonType], styles[buttonSize])}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

DialogModal.Content = Content;
DialogModal.Action = Action;
DialogModal.Button = Button;

export default DialogModal;
