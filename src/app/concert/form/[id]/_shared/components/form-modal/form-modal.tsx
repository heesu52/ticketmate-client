'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/shared/components/ui/button/button';
import Modal from '@/shared/components/ui/modal/modal';

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
    <Modal>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Description>{message}</Modal.Description>
      <Modal.Action>
        <Button variant="fill" color="gray" onClick={handleConfirm}>
          다음에
        </Button>
        <Button variant="fill" onClick={handleCheck}>
          신청하기
        </Button>
      </Modal.Action>
    </Modal>
  );
};

export default FormModal;
