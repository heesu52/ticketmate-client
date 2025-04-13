'use client';

import React from 'react';

import classNames from 'classnames/bind';

import CustomModal from '@/shared/components/modal/custom-modal';

import styles from './example-modal.module.scss';

const cn = classNames.bind(styles);

interface ExampleModalProps {
  title: string;
  message: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}

const ExampleModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ExampleModalProps) => {
  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{message}</CustomModal.Description>
      <CustomModal.Action>
        <button
          type="button"
          onClick={handleConfirm}
          className={cn('modal_button', 'confirm')}
        >
          확인
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={cn('modal_button', 'cancel')}
        >
          취소
        </button>
      </CustomModal.Action>
    </CustomModal>
  );
};

export default ExampleModal;
