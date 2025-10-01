'use client';

import Image from 'next/image';

import ConcertDetail from '@/shared/components/concert-detail/concert-detail';
import Badge from '@/shared/components/ui/badge/badge';
import {
  TICKET_SITE_URL_MAP,
  TICKET_SITE_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import { TicketReservationSite, Concert } from '@/shared/types';
import { calculateDday, getPerformancePeriod } from '@/shared/utils/dates';
import { getPreOpenInfo, getGeneralOpenInfo } from '@/shared/utils/tickets';

import styles from './concert-info.module.scss';

interface ConcertInfoProps {
  concertItem: Concert;
}

const ConcertInfo = ({ concertItem }: ConcertInfoProps) => {
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
    <div className={styles.container}>
      {/* 뒷배경 이미지 */}
      <div className={styles.background_container}>
        <Image
          className={styles.background_image}
          src={concertThumbnailUrl}
          alt={concertName}
          fill
          unoptimized
        />
      </div>

      {/* 이미지~공연정보 */}
      <div className={styles.info_container}>
        <Image
          className={styles.image}
          src={concertThumbnailUrl}
          alt={concertName}
          width={140}
          height={186}
          unoptimized
        />

        <ConcertDetail
          concertName={concertName}
          startDate={startDate}
          endDate={endDate}
          concertHallName={concertHallName}
          siteUrl={siteUrl}
          siteLabel={siteLabel}
          badges={
            <>
              {preOpen && (
                <Badge variant="type-a">
                  선예매까지 {calculateDday(preOpen.openDate)}
                </Badge>
              )}
              {generalOpen && (
                <Badge variant="type-c">
                  일반예매까지 {calculateDday(generalOpen.openDate)}
                </Badge>
              )}
            </>
          }
        />
      </div>
    </div>
  );
};

export default ConcertInfo;
