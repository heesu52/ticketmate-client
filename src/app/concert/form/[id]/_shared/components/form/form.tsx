'use client';

import Image from 'next/image';
import Link from 'next/link';

import Badge from '@/shared/components/badge/badge';
import {
  TICKET_SITE_URL_MAP,
  TICKET_SITE_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import { TicketReservationSite, TicketOpenType, Concert } from '@/shared/types';
import { formatDate, getPerformancePeriod } from '@/shared/utils/dates';
import {
  getTicketOpenInfoByType,
  getPreOpenInfo,
  getGeneralOpenInfo,
} from '@/shared/utils/tickets';

import styles from './form.module.scss';

interface ConcertInfoProps {
  concertItem: Concert;
  ticketOpenType: TicketOpenType;
}

const Form = ({ concertItem, ticketOpenType }: ConcertInfoProps) => {
  const {
    concertName,
    concertHallName,
    ticketReservationSite,
    ticketOpenDateInfoResponses,
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

  // 선택된 티켓 오픈 정보
  const preOpen = getPreOpenInfo(ticketOpenDateInfoResponses ?? []);
  const generalOpen = getGeneralOpenInfo(ticketOpenDateInfoResponses ?? []);
  const matchedOpenInfo = getTicketOpenInfoByType(
    ticketOpenDateInfoResponses,
    ticketOpenType,
  );

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.tag}>
          {ticketOpenType === 'PRE_OPEN' && preOpen && (
            <Badge type="type-a">선예매</Badge>
          )}
          {ticketOpenType === 'GENERAL_OPEN' && generalOpen && (
            <Badge type="type-a">일반예매</Badge>
          )}
          {matchedOpenInfo?.isBankTransfer ? (
            <Badge type="type-b">무통장 가능</Badge>
          ) : (
            <Badge type="type-b">무통장 불가능</Badge>
          )}
        </div>
        <div className={styles.title}>{concertName}</div>
        <div className={styles.info_container}>
          <div className={styles.image}>
            <Image
              className={styles.image}
              src={concertThumbnailUrl}
              alt={concertName}
              width={140}
              height={186}
              unoptimized
            />
            {/* 좌석배치도의 디자인이 결정되면 반영예정 */}
            <span className={styles.link}>좌석배치도</span>
          </div>
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
              <Link className={styles.link} href={siteUrl}>
                {siteLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
