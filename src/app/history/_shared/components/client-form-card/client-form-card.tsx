'use client';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import queryKey from '@/app/_shared/services/query-key';
import CancelModal from '@/app/history/_shared/components/modal/common-modal';
import ReasonModal from '@/app/history/_shared/components/modal/reason-modal/reason-modal';
import { usePutFormCancel } from '@/app/history/_shared/services/mutation';
import { useGetRejectedReason } from '@/app/history/_shared/services/query';
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

import styles from './client-form-card.module.scss';
interface FormCardProps {
  formItem: Form;
}

const ClientFormCard = ({ formItem }: FormCardProps) => {
  const {
    applicationFormId,
    concertName,
    concertThumbnailUrl,
    agentNickname,
    submittedDate,
    applicationFormStatus,
    ticketOpenType,
  } = formItem;

  const { mutate: cancelForm } = usePutFormCancel();
  const { data: rejectReason } = useGetRejectedReason({ applicationFormId });
  const queryClient = useQueryClient();
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
            await cancelForm(
              { applicationFormId },
              {
                onSuccess: () => {
                  // 캐시를 무효화하고 리스트를 다시 요청해 최신 상태로 반영
                  queryClient.invalidateQueries({
                    queryKey: queryKey.getConcertList(),
                  });
                },
              },
            );
            closeTop();
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
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            closeTop();
          }}
        />
      ),
    });
  };
  return (
    <div className={styles.container}>
      <Link
        className={styles.upper_container}
        href={`/concert/form/${applicationFormId}?ticketOpenType=${ticketOpenType}&status=${applicationFormStatus}`}
      >
        <div className={styles.title_container}>
          <div className={styles.title}>{concertName}</div>
          <Image
            className={styles.image}
            src={concertThumbnailUrl}
            alt={'공연썸네일이미지'}
            width={48}
            height={48}
          />
        </div>

        <div className={styles.info_container}>
          <div className={styles.detail}>
            <span className={styles.category}>신청 일자</span>
            <span
              className={styles.info}
            >{`${formatDate(submittedDate)}`}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.category}>대리인</span>
            <span className={styles.info}>{agentNickname}</span>
          </div>
        </div>
      </Link>
      <div className={styles.footer_container}>
        {statusKey === 'ACCEPTED' ? (
          <>
            <Link className={styles.link} href="/chat">
              채팅하기
            </Link>
            <span className={styles.accepted}>{statusLabel}</span>
          </>
        ) : statusKey === 'PENDING' ? (
          <>
            <button className={styles.link} onClick={handleOpenCancelModal}>
              신청취소
            </button>
            <span className={styles.pending}>{statusLabel}</span>
          </>
        ) : statusKey === 'REJECTED' ? (
          <>
            <button className={styles.link} onClick={handleOpenReasonModal}>
              거절사유
            </button>
            <span className={styles.canceled}>{statusLabel}</span>
          </>
        ) : (
          <>
            <button onClick={handleOpenReasonModal} />
            <span className={styles.canceled}>{statusLabel}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientFormCard;
