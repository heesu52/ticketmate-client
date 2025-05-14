'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/query';
import { APPLICATION_STATUS_LABEL_MAP } from '@/shared/constants/type-mapping';
import { Form, ApplicationFormStatus } from '@/shared/types';

// import { formatDate } from '@/shared/utils/dates';
import styles from './form-card.module.scss';

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

  if (!concertItem) {
    return null;
  }
  const { concertName, concertHallName, concertThumbnailUrl } = concertItem;

  //type별 status 이름 변환
  const statusKey = applicationFormStatus as ApplicationFormStatus;
  const statusLabel = APPLICATION_STATUS_LABEL_MAP[statusKey] ?? '';

  const isCurrent = applicationFormStatus === 'PENDING';

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
                  <div className={styles.link}>신청취소</div>
                  <span className={styles.default}>{statusLabel}</span>
                </>
              ) : (
                <>
                  {statusKey === 'APPROVED' && (
                    <>
                      <div className={styles.link}>채팅하기</div>
                      <span className={styles.approved}>{statusLabel}</span>
                    </>
                  )}
                  {statusKey === 'REJECTED' && (
                    <>
                      <div />
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
