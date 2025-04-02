'use client';

import React, { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';

import ModalContent from '@/shared/components/modal';
import { useModalStore } from '@/shared/components/modal/modal-store';

import styles from './custom-modal.module.scss';

const cn = classNames.bind(styles);

interface CustomModalProps {
  id: string;
  modalKey?: string;
  props?: Record<string, unknown>;
  onClose?: () => void;
}

const CustomModal = ({ id, modalKey, props, onClose }: CustomModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { closeModal } = useModalStore();

  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      modal.showModal();
    }

    const handleClose = () => {
      closeModal(id);
      if (onClose) onClose();
    };

    modal?.addEventListener('close', handleClose);
    return () => modal?.removeEventListener('close', handleClose);
  }, [id, closeModal, onClose]);

  const modalRoot = document.body;

  return ReactDOM.createPortal(
    <dialog ref={dialogRef} className={cn('custom_modal')}>
      <div className={cn('custom_content')}>
        {modalKey ? (
          <ModalContent modalKey={modalKey} props={props} />
        ) : (
          <div>모달 키가 제공되지 않았습니다.</div>
        )}
      </div>
    </dialog>,
    modalRoot,
  );
};

export const ModalProvider = () => {
  const { modals } = useModalStore();

  return (
    <>
      {modals.map((modal) => (
        <CustomModal
          key={modal.id}
          id={modal.id}
          modalKey={modal.id} // id를 modalKey로 사용
          props={modal.props}
        />
      ))}
    </>
  );
};

export default CustomModal;
