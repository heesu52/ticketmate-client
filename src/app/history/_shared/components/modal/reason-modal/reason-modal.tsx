'use client';

import React from 'react';

import styles from '@/app/history/_shared/components/modal/reason-modal/reason-modal.module.scss';
import Button from '@/shared/components/button/functional-button/functional-button';
import CustomModal from '@/shared/components/modal/custom-modal';

interface ReasonModalProps {
  title: string;
  reason: string;
  description?: string;
  onConfirm?: () => Promise<void> | void;
}

const ReasonModal = ({
  title,
  reason,
  description,
  onConfirm,
}: ReasonModalProps) => {
  const handelConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{description}</CustomModal.Description>
      <CustomModal.Description>
        <span className={styles.reason}>“{reason}”</span>
      </CustomModal.Description>
      <CustomModal.Action>
        <Button size="large" variant="back" onClick={handelConfirm}>
          확인했어요
        </Button>
      </CustomModal.Action>
    </CustomModal>
  );
};

export default ReasonModal;
