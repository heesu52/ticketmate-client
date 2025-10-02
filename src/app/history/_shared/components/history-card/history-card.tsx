'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { usePatchFormCancel } from '@/app/history/_shared/services/mutation';
// import { useGetRejectedReason } from '@/app/history/_shared/services/query';
import { ArrowRightIcon } from '@/assets/icons';
import Badge from '@/shared/components/ui/badge/badge';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import {
  APPLICATION_STATUS_LABEL_MAP,
  // APPLICATION_REJECTED_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import {
  Form,
  ApplicationFormStatus,
  // ApplicationRejectedType,
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
  // const { data: rejectReason } = useGetRejectedReason(applicationFormId);
  const router = useRouter();
  const { open } = useModalStore();
  // const { applicationFormRejectedType, otherMemo } = rejectReason ?? {};

  //type별 status 이름 변환
  const statusKey = applicationFormStatus as ApplicationFormStatus;
  const statusLabel = APPLICATION_STATUS_LABEL_MAP[statusKey] ?? '';
  const statusBadgeMap: Record<
    ApplicationFormStatus,
    'type-a' | 'type-b' | 'type-c'
  > = {
    PENDING: 'type-c',
    APPROVED: 'type-a',
    REJECTED: 'type-b',
    CANCELED: 'type-b',
    CANCELED_IN_PROCESS: 'type-b',
  };
  const badgeVariant = statusBadgeMap[statusKey] ?? 'type-a';

  // //type별 reject 이유 변환
  // const reasonKey = applicationFormRejectedType as ApplicationRejectedType;
  // const rejectLabel =
  //   reasonKey === 'OTHER'
  //     ? (otherMemo ?? '')
  //     : (APPLICATION_REJECTED_LABEL_MAP[reasonKey] ?? '');

  return (
    <div className={styles.container}>
      <div className={styles.upper_container}>
        <Badge variant={badgeVariant}>{statusLabel}</Badge>
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
