'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getRejectionReason } from '@/app/history/_shared/services/api';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { APPLICATION_REJECTED_LABEL_MAP } from '@/shared/constants/type-mapping';
import { ApplicationRejectedType } from '@/shared/types';

interface FormReasonModalProps extends ModalControl<unknown> {
  applicationFormId: string;
}

interface GetRejectionReasonResponse {
  applicationFormRejectedType: ApplicationRejectedType;
  otherMemo: string;
}

const FormReasonModal = ({
  onReject,
  applicationFormId,
}: FormReasonModalProps) => {
  const [mappedMessage, setMappedMessage] = useState<string>('');

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
    <ModalTemplate
      title="대리인 닉네임의 거절사유"
      description={`작성한 신청양식을 통해 동일한 대리인에게 다시 티켓팅을 의뢰할 수 있습니다.`}
      firstButtonLabel="확인했어요"
      onFirstButtonClick={handleFirstButtonClick}
    >
      {mappedMessage && <p>{mappedMessage}</p>}
    </ModalTemplate>
  );
};

export default FormReasonModal;
