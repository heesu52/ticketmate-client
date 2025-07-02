'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import CancelModal from '@/app/history/_shared/components/modal/common-modal';
import ReasonModal from '@/app/history/_shared/components/modal/reason-modal/reason-modal';
import { MODAL_ID } from '@/shared/components/modal/modal-constants';
import { useModal } from '@/shared/components/modal/use-modal';
import { APPLICATION_STATUS_LABEL_MAP } from '@/shared/constants/type-mapping';
import { Form, ApplicationFormStatus } from '@/shared/types';

import styles from './client-form-card.module.scss';
// import { formatDate } from '@/shared/utils/dates';
interface FormCardProps {
  formItem: Form;
}

const ClientFormCard = ({ formItem }: FormCardProps) => {
  const {
    applicationFormId,
    clientId,
    agentId,
    concertId,
    applicationFormStatus,
    ticketOpenType,
  } = formItem;

  const { data: concertItem } = useGetConcertDetail({ concertId });
  const { open, closeTop } = useModal();

  if (!concertItem) {
    return null;
  }
  const { concertName, concertHallName, concertThumbnailUrl } = concertItem;

  //type별 status 이름 변환
  const statusKey = applicationFormStatus as ApplicationFormStatus;
  const statusLabel = APPLICATION_STATUS_LABEL_MAP[statusKey] ?? '';

  const handleOpenCancelModal = () => {
    open({
      id: MODAL_ID.CANCEL_MODAL,
      content: (
        <CancelModal
          title="신청을 취소하시겠습니까?"
          message={`취소 시 신청했던 내역은 \n과거신청내역에서 확인가능합니다.`}
          confirmbtn={`취소하기`}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
          reason={`수고비가 단가랑 맞지않음`}
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
            alt={concertHallName}
            width={48}
            height={48}
          />
        </div>

        <div className={styles.info_container}>
          <div className={styles.detail}>
            <span className={styles.category}>신청 일자</span>
            {/* 현재 신청일자에 대한 data가 없음 */}
            <span className={styles.info}>신청 일자</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.category}>대리인</span>
            {/* 추후 대리인 닉네임을 변경 */}
            <span className={styles.info}>{agentId}</span>
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
