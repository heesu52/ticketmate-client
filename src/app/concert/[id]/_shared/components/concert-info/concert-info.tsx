'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Badge from '@/shared/components/badge/badge';
import {
  TICKET_SITE_URL_MAP,
  TICKET_SITE_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import { TicketReservationSite, Concert } from '@/shared/types';
import {
  formatDate,
  calculateDday,
  getPerformancePeriod,
} from '@/shared/utils/dates';
import { getPreOpenInfo, getGeneralOpenInfo } from '@/shared/utils/tickets';

import styles from './concert-info.module.scss';

interface ConcertInfoProps {
  concertItem: Concert;
}

const ConcertInfo = ({ concertItem }: ConcertInfoProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    concertName,
    concertHallName,
    ticketReservationSite,
    concertThumbnailUrl,
    ticketOpenDateInfoResponseList,
    concertDateInfoResponseList,
  } = concertItem;

  //type별 url과 사이트 이름 변환
  const sitekey = ticketReservationSite as TicketReservationSite;
  const siteUrl = TICKET_SITE_URL_MAP[sitekey] ?? '#';
  const siteLabel = TICKET_SITE_LABEL_MAP[sitekey] ?? '기타';

  //공연 시작 날짜, 종료날짜 계산
  const { startDate, endDate } = getPerformancePeriod(
    concertDateInfoResponseList,
  );

  //선예매, 일반예매 계산
  const preOpen = getPreOpenInfo(ticketOpenDateInfoResponseList ?? []);
  const generalOpen = getGeneralOpenInfo(ticketOpenDateInfoResponseList ?? []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background_container}>
          <Image
            className={styles.background_image}
            src={concertThumbnailUrl}
            alt={concertName}
            fill
            unoptimized
          />
        </div>
        <div className={styles.title_container}>
          <Image
            className={styles.image}
            src={concertThumbnailUrl}
            alt={concertName}
            width={140}
            height={186}
            unoptimized
          />
          <div className={styles.tag}>
            {preOpen && (
              <Badge type="type-a">
                선예매까지 {calculateDday(preOpen.openDate)}
              </Badge>
            )}
            {generalOpen && (
              <Badge type="type-a">
                일반예매까지 {calculateDday(generalOpen.openDate)}
              </Badge>
            )}
          </div>

          <div className={styles.title}>{concertName}</div>
          <div className={styles.info_container}>
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
      </div>
    </>
  );
};

export default ConcertInfo;
