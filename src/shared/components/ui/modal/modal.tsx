'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';

import styles from './modal.module.scss';

const cn = classNames.bind(styles);

interface ModalProps {
  children: ReactNode;
  className?: string;
}

const Modal = ({ children, className }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog) dialog.close();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className={cn('container', className)}>
      {children}
    </dialog>
  );
};

interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return <span className={cn('modal_title', className)}>{children}</span>;
};

interface DescriptionProps {
  children: ReactNode;
  className?: string;
}

const Description = ({ children, className }: DescriptionProps) => {
  return <span className={cn('modal_description', className)}>{children}</span>;
};

interface ContentProps {
  children: ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  return <div className={cn('modal_content', className)}>{children}</div>;
};

interface ActionProps {
  children: ReactNode;
  className?: string;
}

const Action = ({ children, className }: ActionProps) => {
  return <div className={cn('modal_actions', className)}>{children}</div>;
};

Modal.Title = Title;
Modal.Description = Description;
Modal.Content = Content;
Modal.Action = Action;

export default Modal;
