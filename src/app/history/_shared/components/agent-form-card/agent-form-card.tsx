'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import AcceptModal from '@/app/history/_shared/components/modal/common-modal';
import RejectedModal from '@/app/history/_shared/components/modal/rejected-modal/rejected-modal';
import {
  usePutFormApprove,
  usePutFormReject,
} from '@/app/history/_shared/services/mutation';
import Button from '@/shared/components/button/functional-button/functional-button';
import { MODAL_ID } from '@/shared/components/modal/modal-constants';
import { useModal } from '@/shared/components/modal/use-modal';
import { Form } from '@/shared/types';

import styles from './agent-form-card.module.scss';

interface FormCardProps {
  formItem: Form;
}

const AgentFormCard = ({ formItem }: FormCardProps) => {
  const {
    applicationFormId,
    clientId,
    agentId,
    concertId,
    applicationFormStatus,
  } = formItem;
  const { mutate: approveForm } = usePutFormApprove();
  const { mutate: rejectForm } = usePutFormReject();

  const { data: concertItem } = useGetConcertDetail({ concertId });
  const { open, closeTop } = useModal();

  if (!concertItem) {
    return null;
  }
  const { concertName, concertHallName, concertThumbnailUrl } = concertItem;

  const handleOpenAcceptModal = () => {
    open({
      id: MODAL_ID.ACCEPT_MODAL,
      content: (
        <AcceptModal
          title="요청을 수락하시겠습니까?"
          message={`의뢰인 닉네임의 요청을 수락할 시 의뢰인과 매칭이 성사되어 채팅이 가능해집니다`}
          confirmbtn={`수락`}
          onConfirm={async () => {
            await approveForm({ applicationFormId });
            closeTop();
          }}
          onCancel={() => {
            closeTop();
          }}
        />
      ),
    });
  };

  const handleOpenRejectModal = () => {
    open({
      id: MODAL_ID.REJECTED_MODAL,
      content: (
        <RejectedModal
          title="요청을 거절하시겠습니까?"
          description={`의뢰인 닉네임의 요청을 거절할 시 해당 신청내역이 삭제되고 복구할 수 없습니다.\n`}
          onConfirm={async () => {
            await rejectForm({ applicationFormId });
            closeTop();
          }}
          onCancel={() => {
            closeTop();
          }}
        />
      ),
    });
  };
  return (
    <div className={styles.container}>
      <Link className={styles.upper_container} href={`concert/form/}`}>
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
            <span className={styles.category}>의뢰 일자</span>
            {/* 현재 신청일자에 대한 data가 없음 */}
            <span className={styles.info}>의뢰 일자</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.category}>의뢰인</span>
            {/* 추후 대리인 닉네임을 변경 */}
            <span className={styles.info}>{agentId}</span>
          </div>
        </div>
      </Link>
      <div className={styles.footer_container}>
        <button className={styles.link}>자세히 보기</button>
        <div className={styles.footer_button}>
          <Button size="large" variant="border" onClick={handleOpenRejectModal}>
            거절
          </Button>
          <Button size="large" variant="fill" onClick={handleOpenAcceptModal}>
            수락
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentFormCard;
