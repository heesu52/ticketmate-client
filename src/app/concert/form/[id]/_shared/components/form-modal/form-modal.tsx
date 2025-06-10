'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/shared/components/button/functional-button/functional-button';
import CustomModal from '@/shared/components/modal/custom-modal';

interface FormeModalProps {
  title: string;
  message: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  concertId: string;
}

const FormModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  concertId,
}: FormeModalProps) => {
  const router = useRouter(); // useRouter 훅을 사용하여 라우팅 처리

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    router.push(`/concert/${concertId}`);
  };

  const handleCheck = () => {
    if (onCancel) onCancel();
    router.push('/history');
  };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{message}</CustomModal.Description>
      <CustomModal.Action>
        <Button size="medium" variant="border" onClick={handleConfirm}>
          확인했어요
        </Button>
        <Button size="medium" variant="fill" onClick={handleCheck}>
          신청내역 보러가기
        </Button>
      </CustomModal.Action>
    </CustomModal>
  );
};

export default FormModal;
