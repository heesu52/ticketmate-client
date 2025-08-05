'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from '@/app/history/_shared/components/modal/rejected-modal/rejected-modal.module.scss';
import Button from '@/shared/components/button/functional-button/functional-button';
import CustomModal from '@/shared/components/modal/custom-modal';
import RadioGroup from '@/shared/components/radio/radio';

interface RejectedModalProps {
  title: string;
  description?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

const RejectedModal = ({
  title,
  description,
  onConfirm,
  onCancel,
}: RejectedModalProps) => {
  const router = useRouter(); // useRouter 훅을 사용하여 라우팅 처리
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    router.push(`/history`);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleRadioChange = (value: string) => {
    setSelected(value);

    if (!value.startsWith('option')) {
      if (value.length < 5) {
        setError('최소 5자 이상 입력해야 합니다.');
      } else if (value.length > 50) {
        setError('최대 50자 이내여야 합니다.');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{description}</CustomModal.Description>
      <CustomModal.Description>
        <span className={styles.reason}>거절 사유를 선택해주세요.</span>
        <CustomModal.Action>
          <RadioGroup
            name="example"
            value={selected}
            onChange={handleRadioChange}
          >
            <RadioGroup.Radio
              value="option1"
              label="수고비가 시세와 맞지않음"
            />
            <RadioGroup.Radio value="option2" label="예약이 마감됨" />
            <RadioGroup.Radio value="option3" label="티켓팅 일정이 안됨" />
            <RadioGroup.RadioInput placeholder="기타" error={error} />
          </RadioGroup>
        </CustomModal.Action>
      </CustomModal.Description>
      <CustomModal.Action>
        <Button size="large" variant="back" onClick={handleCancel}>
          다음에
        </Button>
        <Button size="large" variant="fill" onClick={handleConfirm}>
          거절
        </Button>
      </CustomModal.Action>
    </CustomModal>
  );
};

export default RejectedModal;
