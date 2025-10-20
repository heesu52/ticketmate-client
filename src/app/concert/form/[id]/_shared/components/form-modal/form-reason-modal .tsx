'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getRejectionReason } from '@/app/history/_shared/services/api';
import { GetRejectionReasonResponse } from '@/app/history/_shared/services/type';
import Button from '@/shared/components/ui/button/button';
import Modal from '@/shared/components/ui/modal/modal';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { APPLICATION_REJECTED_LABEL_MAP } from '@/shared/constants/type-mapping';

import styles from './form-reason-modal.module.scss';

interface FormReasonModalProps extends ModalControl<unknown> {
  applicationFormId: string;
  agentNickname?: string;
}

const FormReasonModal = ({
  onReject,
  applicationFormId,
  agentNickname,
}: FormReasonModalProps) => {
  const [mappedMessage, setMappedMessage] = useState<string>('');
  const [otherMemo, setOtherMemo] = useState<string>('');

  const { data, isError } = useQuery<GetRejectionReasonResponse>({
    queryKey: ['rejectionReason', applicationFormId],
    queryFn: () => getRejectionReason(applicationFormId),
  });

  useEffect(() => {
    if (data) {
      const message =
        APPLICATION_REJECTED_LABEL_MAP[data.applicationFormRejectedType] ??
        '거절 사유를 불러올 수 없음';
      setMappedMessage(message);
      const memo = data.otherMemo;
      setOtherMemo(memo);
    } else if (isError) {
      toastify({
        variant: 'error',
        description: '거절 사유 조회를 실패했습니다.',
      });
    }
  }, [data, isError]);

  const handleFirstButtonClick = () => {
    onReject?.();
  };

  return (
    <Modal className={styles.container}>
      <Modal.Title
        className={styles.modal_title}
      >{`${agentNickname}의 거절사유`}</Modal.Title>

      <Spacer size={4} />

      <Modal.Description className={styles.modal_description}>
        {`작성한 신청양식을 통해 동일한 대리인에게 \n다시 티켓팅을 의뢰할 수 있습니다.`}
      </Modal.Description>

      <Spacer size={16} />

      <div className={styles.message}>{`"${mappedMessage}"`}</div>

      <Spacer size={4} />

      <div className={styles.modal_description}>{`${otherMemo}`}</div>

      <Spacer size={32} />

      <Modal.Action className={styles.modal_actions}>
        <Button
          type="button"
          variant="fill"
          color="gray"
          onClick={handleFirstButtonClick}
        >
          {`확인했어요`}
        </Button>
      </Modal.Action>
    </Modal>
  );
};

export default FormReasonModal;
