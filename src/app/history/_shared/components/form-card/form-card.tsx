'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/query';
import { MODAL_ID } from '@/shared/components/modal/modal-constants';
import { useModal } from '@/shared/components/modal/use-modal';
import { APPLICATION_STATUS_LABEL_MAP } from '@/shared/constants/type-mapping';
import { Form, ApplicationFormStatus } from '@/shared/types';

import styles from './form-card.module.scss';
import CancelModal from '../modal/cancel-modal';
import RejectedModal from '../modal/rejected-modal';
// import { formatDate } from '@/shared/utils/dates';

interface FormCardProps {
  formItem: Form;
}

const FormCard = ({ formItem }: FormCardProps) => {
  const {
    applicationFormId,
    clientId,
    agentId,
    concertId,
    requestCount,
    hopeAreaResponseList,
    requestDetails,
    applicationFormStatus,
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

  const isCurrent = applicationFormStatus === 'PENDING';

  const handleOpenCancelModal = () => {
    open({
      id: MODAL_ID.CANCEL_MODAL,
      content: (
        <CancelModal
          title="신청을 취소하시겠습니까?"
          message={`취소 시 신청했던 내역은 \n과거신청내역에서 확인가능합니다.`}
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

  const handleOpenRejectedModal = () => {
    open({
      id: MODAL_ID.REJECTED_MODAL,
      content: (
        <RejectedModal
          title="대리인 닉네임님의 거절 사유"
          description={`작성한 신청양식을 통해 동일한 대리인에게 다시 티켓팅을 의뢰할 수 있습니다.\n`}
          reason={`수고비가 단가랑 맞지 않음`}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            closeTop();
          }}
        />
      ),
    });
  };
  return (
    <>
      <Link href={`concert/form/${applicationFormId}`}>
        <div className={styles.container}>
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
          <div className={styles.footer_container}>
            <div className={styles.footer_container}>
              {isCurrent ? (
                <>
                  <button
                    className={styles.link}
                    onClick={handleOpenCancelModal}
                  >
                    신청취소
                  </button>
                  <span className={styles.default}>{statusLabel}</span>
                </>
              ) : (
                <>
                  {statusKey === 'APPROVED' && (
                    <>
                      <a className={styles.link} href="/chat">
                        채팅하기
                      </a>
                      <span className={styles.approved}>{statusLabel}</span>
                    </>
                  )}
                  {statusKey === 'REJECTED' && (
                    <>
                      <button onClick={handleOpenRejectedModal} />
                      <span className={styles.rejected}>{statusLabel}</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FormCard;
