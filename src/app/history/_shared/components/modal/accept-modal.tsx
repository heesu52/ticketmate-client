'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/shared/components/button/functional-button/functional-button';
import CustomModal from '@/shared/components/modal/custom-modal';

interface AccpetModalProps {
  title: string;
  message: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}

const AcceptModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}: AccpetModalProps) => {
  const router = useRouter(); // useRouter 훅을 사용하여 라우팅 처리

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    router.push(`/chat`);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    router.push('/history');
  };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{message}</CustomModal.Description>
      <CustomModal.Action>
        <Button size="medium" variant="back" onClick={handleCancel}>
          다음에
        </Button>
        <Button size="medium" variant="fill" onClick={handleConfirm}>
          수락
        </Button>
      </CustomModal.Action>
    </CustomModal>
  );
};

export default AcceptModal;
