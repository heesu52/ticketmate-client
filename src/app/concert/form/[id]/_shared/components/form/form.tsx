'use client';

import Link from 'next/link';

import Badge from '@/shared/components/ui/badge/badge';
import {
  TICKET_SITE_URL_MAP,
  TICKET_SITE_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import { TicketReservationSite, TicketOpenType, Concert } from '@/shared/types';
import { formatDate, getPerformancePeriod } from '@/shared/utils/dates';

import styles from './form.module.scss';

interface ConcertInfoProps {
  concertItem: Concert;
  ticketOpenType: TicketOpenType;
  isBankTransfer: boolean;
}

const Form = ({
  concertItem,
  ticketOpenType,
  isBankTransfer,
}: ConcertInfoProps) => {
  const {
    concertName,
    concertHallName,
    ticketReservationSite,
    ticketOpenDateInfoResponseList,
    concertThumbnailUrl,
    concertDateInfoResponseList,
    seatingChartUrl,
  } = concertItem;

  //type별 url과 사이트 이름 변환
  const sitekey = ticketReservationSite as TicketReservationSite;
  const siteUrl = TICKET_SITE_URL_MAP[sitekey] ?? '#';
  const siteLabel = TICKET_SITE_LABEL_MAP[sitekey] ?? '기타';

  //공연 시작 날짜, 종료날짜 계산
  const { startDate, endDate } = getPerformancePeriod(
    concertDateInfoResponseList,
  );

  return (
    <div className={styles.container}>
      {/* 태그 */}
      <div className={styles.tag_container}>
        {ticketOpenType === 'PRE_OPEN' && (
          <Badge variant="type-a">선예매</Badge>
        )}
        {ticketOpenType === 'GENERAL_OPEN' && (
          <Badge variant="type-c">일반예매</Badge>
        )}
        {isBankTransfer ? (
          <Badge variant="type-b">무통장 가능</Badge>
        ) : (
          <Badge variant="type-b">무통장 불가능</Badge>
        )}
      </div>

      {/* 제목 */}
      <div className={styles.title}>{concertName}</div>

      {/* 공연 상세정보 */}
      <div className={styles.detail_container}>
        <div className={styles.detail}>
          <span className={styles.category}>공연 일자</span>
          <span className={styles.info}>
            {startDate && endDate
              ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
              : '공연 날짜 미정'}
          </span>
        </div>

        <div className={styles.detail}>
          <span className={styles.category}>공연장</span>
          <span className={styles.info}>{concertHallName}</span>
        </div>

        <div className={styles.detail}>
          <span className={styles.category}>예매처</span>
          <Link className={styles.info} href={siteUrl}>
            {siteLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
