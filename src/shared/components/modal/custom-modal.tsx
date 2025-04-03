'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import { createPortal } from 'react-dom';

import styles from './custom-modal.module.scss';

const cn = classNames.bind(styles);

interface ModalProps {
  children: ReactNode;
}

const CustomModal = ({ children }: ModalProps) => {
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

  return createPortal(
    <dialog ref={dialogRef} className={cn('container')}>
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <span className={cn('modal_title')}>{children}</span>;
};

interface DescriptionProps {
  children: ReactNode;
}

const Description = ({ children }: DescriptionProps) => {
  return <p className={cn('modal_description')}>{children}</p>;
};

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className={cn('modal_content')}>{children}</div>;
};

interface ActionProps {
  children: ReactNode;
}

const Action = ({ children }: ActionProps) => {
  return <div className={cn('modal_actions')}>{children}</div>;
};

CustomModal.Title = Title;
CustomModal.Description = Description;
CustomModal.Content = Content;
CustomModal.Action = Action;

export default CustomModal;
