'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import styles from '@/app/history/_shared/components/modal/rejected-modal.module.scss';
import Button from '@/shared/components/button/functional-button/functional-button';
import CustomModal from '@/shared/components/modal/custom-modal';

interface RejectedModalProps {
  title: string;
  reason: string;
  description?: string;
  onConfirm?: () => Promise<void> | void;
}

const RejectedModal = ({
  title,
  reason,
  description,
  onConfirm,
}: RejectedModalProps) => {
  const router = useRouter(); // useRouter 훅을 사용하여 라우팅 처리

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    router.push(`/history`);
  };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{description}</CustomModal.Description>
      <CustomModal.Description>
        <p className={styles.reason}>“{reason}”</p>
      </CustomModal.Description>
      <CustomModal.Action>
        <Button size="large" variant="back" onClick={handleConfirm}>
          확인했어요
        </Button>
      </CustomModal.Action>
    </CustomModal>
  );
};

export default RejectedModal;
