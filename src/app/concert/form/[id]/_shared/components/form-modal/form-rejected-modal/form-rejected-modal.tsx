'use client';

import { useState } from 'react';

import { usePatchFormRejectMutation } from '@/app/history/_shared/services/mutation';
import { PatchFormRequest } from '@/app/history/_shared/services/type';
import Button from '@/shared/components/ui/button/button';
import Modal from '@/shared/components/ui/modal/modal';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';
import { RadioGroup, Radio } from '@/shared/components/ui/radio/radio';
import { RadioOption } from '@/shared/components/ui/radio/radio.type';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { APPLICATION_REJECTED_LABEL_MAP } from '@/shared/constants/type-mapping';
import { ApplicationRejectedType } from '@/shared/types';

import styles from './form-rejected-modal.module.scss';

interface FormRejectedModalProps extends ModalControl<unknown> {
  applicationFormId: string;
}

const FormRejectedModal = ({
  onResolve,
  onReject,
  applicationFormId,
}: FormRejectedModalProps) => {
  const [selected, setSelected] = useState<string>('');
  const [otherMemo, setOtherMemo] = useState<string>('');
  const [error, setError] = useState('');
  const { mutate } = usePatchFormRejectMutation();

  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    if (!selected) {
      setError('거절 사유를 선택하거나 입력해주세요.');
      return;
    }
    if (
      selected === 'OTHER' &&
      (otherMemo.trim().length < 5 || otherMemo.trim().length > 20)
    ) {
      setError('기타 사유는 5자 이상 20자 이내여야 합니다.');
      return;
    }

    const applicationFormRejectedType = selected as
      | ApplicationRejectedType
      | 'OTHER';
    const memo = selected === 'OTHER' ? otherMemo.trim() : '';

    const requestBody: PatchFormRequest = {
      applicationFormId,
      applicationFormRejectedType,
      otherMemo: memo,
    };

    //거절 요청
    mutate(requestBody, {
      onSuccess: () => onResolve?.(true),
      onError: () => onReject?.(),
    });
  };

  // 라디오 옵션 배열
  const options: RadioOption[] = [
    {
      value: 'FEE_NOT_MATCHING_MARKET_PRICE',
      label: APPLICATION_REJECTED_LABEL_MAP.FEE_NOT_MATCHING_MARKET_PRICE,
    },
    {
      value: 'RESERVATION_CLOSED',
      label: APPLICATION_REJECTED_LABEL_MAP.RESERVATION_CLOSED,
    },
    {
      value: 'SCHEDULE_UNAVAILABLE',
      label: APPLICATION_REJECTED_LABEL_MAP.SCHEDULE_UNAVAILABLE,
    },
    {
      value: 'OTHER',
      label: APPLICATION_REJECTED_LABEL_MAP.OTHER,
      type: 'input',
    },
  ];

  return (
    <Modal className={styles.container}>
      <Modal.Title className={styles.modal_title}>
        의뢰를 거절하시겠습니까?
      </Modal.Title>

      <Spacer size={4} />

      <Modal.Description className={styles.modal_description}>
        의뢰를 거절할 시 복구할 수 없습니다.
      </Modal.Description>

      <Spacer size={16} />

      <RadioGroup
        name="rejectReason"
        ariaLabel="거절 사유 선택"
        value={selected}
        onValueChange={setSelected}
        inputValue={otherMemo}
        onInputChange={setOtherMemo}
      >
        {options.map((option) => (
          <Radio key={option.value} option={option} />
        ))}
      </RadioGroup>

      {error && <div className={styles.error}>{error}</div>}

      <Modal.Action className={styles.modal_actions}>
        <Button
          type="button"
          variant="fill"
          color="gray"
          onClick={handleFirstButtonClick}
        >
          다음에
        </Button>
        <Button
          type="button"
          variant="fill"
          color="gray"
          onClick={handleSecondButtonClick}
        >
          거절하기
        </Button>
      </Modal.Action>
    </Modal>
  );
};

export default FormRejectedModal;
