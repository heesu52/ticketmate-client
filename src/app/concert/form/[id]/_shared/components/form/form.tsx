'use client';

import Image from 'next/image';
import Link from 'next/link';

import Badge from '@/shared/components/badge/badge';
import { useModal } from '@/shared/components/modal/use-modal';
import {
  TICKET_SITE_URL_MAP,
  TICKET_SITE_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import { TicketReservationSite, TicketOpenType, Concert } from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';

import styles from './form.module.scss';
import FormModal from '../form-modal/form-modal';
import FormTabManager from '../tab-button/manager/form-tab-manager';

interface ConcertInfoProps {
  concertItem: Concert;
  ticketOpenType?: TicketOpenType;
}

const Form = ({ concertItem, ticketOpenType }: ConcertInfoProps) => {
  const { open, closeTop } = useModal();
  const {
    concertName,
    concertHallName,
    ticketReservationSite,
    ticketOpenDateInfoResponses,
    concertThumbnailUrl,
    concertDateInfoResponseList,
  } = concertItem;

  //type별 url과 사이트 이름 변환
  const sitekey = ticketReservationSite as TicketReservationSite;
  const siteUrl = TICKET_SITE_URL_MAP[sitekey] ?? '#';
  const siteLabel = TICKET_SITE_LABEL_MAP[sitekey] ?? '기타';

  //공연 시작 날짜, 종료날짜 계산
  const sortedDates = concertDateInfoResponseList
    .slice()
    .sort(
      (a, b) =>
        new Date(a.performanceDate).getTime() -
        new Date(b.performanceDate).getTime(),
    );

  const startDate = sortedDates[0]?.performanceDate;
  const endDate = sortedDates[sortedDates.length - 1]?.performanceDate;

  const selectedOpenInfo = ticketOpenDateInfoResponses.find(
    (info) => info.ticketOpenType === ticketOpenType,
  );

  const handleOpenModal = () => {
    open({
      id: 'form-modal',
      content: (
        <FormModal
          title="일반예매 신청이 완료되었습니다."
          message={`대리인이 수락하게 되면 매칭이 완료됩니다.\n매칭이 완료되면 채팅을 통해 이야기를 나눠보세요.`}
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

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.tag}>
          {ticketOpenType === 'PRE_OPEN' && <Badge type="type-a">선예매</Badge>}
          {ticketOpenType === 'GENERAL_OPEN' && (
            <Badge type="type-a">일반예매</Badge>
          )}
          {selectedOpenInfo?.isBankTransfer && (
            <Badge type="type-b">무통장 가능</Badge>
          )}
        </div>
        <div className={styles.title}>{concertName}</div>
        <div className={styles.info_container}>
          <div className={styles.image}>
            {/* 추후 next의 Image 로 변경 예정 */}
            <Image
              className={styles.image}
              src={concertThumbnailUrl}
              alt={concertName}
              width={140}
              height={186}
            />
            <span>좌석배치도</span>
          </div>
          <div className={styles.detail_container}>
            <div className={styles.detail}>
              <span className={styles.category}>공연 일자</span>
              <span className={styles.info}>
                {`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
              </span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>공연장</span>
              <span className={styles.info}>{concertHallName}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>예매처</span>
              <Link className={styles.link} href={siteUrl}>
                {siteLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FormTabManager handleOpenModal={handleOpenModal} />
    </div>
  );
};

export default Form;
