'use client';

import Image from 'next/image';

import CancelModal from '@/app/history/_shared/components/modal/common-modal';
import ReasonModal from '@/app/history/_shared/components/modal/reason-modal/reason-modal';
import { usePatchFormCancel } from '@/app/history/_shared/services/mutation';
import { useGetRejectedReason } from '@/app/history/_shared/services/query';
import { ArrowRightIcon } from '@/assets/icons';
import { MODAL_ID } from '@/shared/components/modal/modal-constants';
import { useModal } from '@/shared/components/modal/use-modal';
import {
  APPLICATION_STATUS_LABEL_MAP,
  APPLICATION_REJECTED_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import {
  Form,
  ApplicationFormStatus,
  ApplicationRejectedType,
} from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';

import styles from './history-card.module.scss';

interface FormCardProps {
  formItem: Form;
}

const HistoryCard = ({ formItem }: FormCardProps) => {
  const {
    applicationFormId,
    concertName,
    concertThumbnailUrl,
    agentNickname,
    submittedDate,
    applicationFormStatus,
    ticketOpenType,
  } = formItem;

  const { mutateAsync: cancelFormAsync } = usePatchFormCancel();
  const { data: rejectReason } = useGetRejectedReason(applicationFormId);
  const { open, closeTop } = useModal();
  const { applicationFormRejectedType, otherMemo } = rejectReason ?? {};

  //type별 status 이름 변환
  const statusKey = applicationFormStatus as ApplicationFormStatus;
  const statusLabel = APPLICATION_STATUS_LABEL_MAP[statusKey] ?? '';

  //type별 reject 이유 변환
  const reasonKey = applicationFormRejectedType as ApplicationRejectedType;
  const rejectLabel =
    reasonKey === 'OTHER'
      ? (otherMemo ?? '')
      : (APPLICATION_REJECTED_LABEL_MAP[reasonKey] ?? '');

  const handleOpenCancelModal = () => {
    open({
      id: MODAL_ID.CANCEL_MODAL,
      content: (
        <CancelModal
          title="신청을 취소하시겠습니까?"
          message={`취소 시 신청했던 내역은 \n과거신청내역에서 확인가능합니다.`}
          confirmbtn={`취소하기`}
          onConfirm={async () => {
            try {
              await cancelFormAsync(applicationFormId);
              closeTop();
            } catch {
              // 에러 토스트는 훅에서 처리 중
            }
          }}
          onCancel={() => {
            closeTop();
          }}
        />
      ),
    });
  };

  const handleOpenReasonModal = () => {
    open({
      id: MODAL_ID.REASON_MODAL,
      content: (
        <ReasonModal
          title="대리인 닉네임님의 거절 사유"
          description={`작성한 신청양식을 통해 동일한 대리인에게 다시 티켓팅을 의뢰할 수 있습니다.\n`}
          reason={rejectLabel}
          onConfirm={() => {
            closeTop();
          }}
        />
      ),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper_container}>
        <div className={styles.tag}>뱃지자리</div>
        <ArrowRightIcon
          width={12}
          height={12}
          fill="var(--grayscale-500)"
          // onClick={addInput}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className={styles.info_container}>
        <Image
          className={styles.image}
          src={concertThumbnailUrl}
          alt={'공연썸네일이미지'}
          width={48}
          height={48}
        />
        <div className={styles.detail_container}>
          <div className={styles.title}>{concertName}</div>
          <div className={styles.footer_container}>
            <span className={styles.info}>{agentNickname}</span>
            <span
              className={styles.info}
            >{`${formatDate(submittedDate)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
