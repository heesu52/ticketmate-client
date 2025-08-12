'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from '@/app/history/_shared/components/modal/rejected-modal/rejected-modal.module.scss';
import Button from '@/shared/components/button/functional-button/functional-button';
import CustomModal from '@/shared/components/modal/custom-modal';
import RadioGroup from '@/shared/components/radio/radio';
import { APPLICATION_REJECTED_LABEL_MAP } from '@/shared/constants/type-mapping';
import { ApplicationRejectedType } from '@/shared/types';

interface RejectedModalProps {
  title: string;
  description?: string;
  onConfirm?: (params: {
    applicationFormRejectedType: ApplicationRejectedType | 'OTHER';
    otherMemo: string;
  }) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

const RejectedModal = ({
  title,
  description,
  onConfirm,
  onCancel,
}: RejectedModalProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [error, setError] = useState('');

  // 제출 시 조건 확인하는 핸들러
  const handleConfirm = async () => {
    if (!selected) {
      setError('거절 사유를 선택하거나 입력해주세요.');
      return;
    }
    if (
      selected === 'OTHER' &&
      (customText.trim().length < 5 || customText.trim().length > 50)
    ) {
      setError('기타 사유는 5자 이상 50자 이내여야 합니다.');
      return;
    }

    const applicationFormRejectedType = selected as
      | ApplicationRejectedType
      | 'OTHER';
    const otherMemo = selected === 'OTHER' ? customText.trim() : '';

    if (onConfirm) {
      await onConfirm({ applicationFormRejectedType, otherMemo });
    }
    router.push(`/history`);
  };

  // 취소하는 핸들러
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // 라디오 버튼 변경할 때 초기화하는 핸들러
  const handleRadioChange = (value: string) => {
    setSelected(value);
    setError('');
    if (value !== 'OTHER') {
      setCustomText('');
    }
  };

  // 추후 추가할 얘정
  // const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCustomText(e.target.value);
  //   if (e.target.value.length < 5) {
  //     setError('최소 5자 이상 입력해야 합니다.');
  //   } else if (e.target.value.length > 50) {
  //     setError('최대 50자 이내여야 합니다.');
  //   } else {
  //     setError('');
  //   }
  // };

  return (
    <CustomModal>
      <CustomModal.Title>{title}</CustomModal.Title>
      <CustomModal.Description>{description}</CustomModal.Description>
      <CustomModal.Description>
        <span className={styles.reason}>거절 사유를 선택해주세요.</span>
        <CustomModal.Action>
          <RadioGroup
            name="rejectReason"
            value={selected}
            onChange={handleRadioChange}
          >
            <RadioGroup.Radio
              value="FEE_NOT_MATCHING_MARKET_PRICE"
              label={
                APPLICATION_REJECTED_LABEL_MAP.FEE_NOT_MATCHING_MARKET_PRICE
              }
            />
            <RadioGroup.Radio
              value="RESERVATION_CLOSED"
              label={APPLICATION_REJECTED_LABEL_MAP.RESERVATION_CLOSED}
            />
            <RadioGroup.Radio
              value="SCHEDULE_UNAVAILABLE"
              label={APPLICATION_REJECTED_LABEL_MAP.SCHEDULE_UNAVAILABLE}
            />
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
