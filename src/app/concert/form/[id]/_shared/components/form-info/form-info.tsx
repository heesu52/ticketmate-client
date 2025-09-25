'use client';

import ConcertDetail from '@/shared/components/concert-detail/concert-detail';
import Badge from '@/shared/components/ui/badge/badge';
import {
  TICKET_SITE_URL_MAP,
  TICKET_SITE_LABEL_MAP,
} from '@/shared/constants/type-mapping';
import { TicketReservationSite, TicketOpenType, Concert } from '@/shared/types';
import { getPerformancePeriod } from '@/shared/utils/dates';

import styles from './form-info.module.scss';

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

  return (
    <div className={styles.container}>
      <ConcertDetail
        concertName={concertName}
        startDate={startDate}
        endDate={endDate}
        concertHallName={concertHallName}
        siteUrl={siteUrl}
        siteLabel={siteLabel}
        badges={
          <>
            {ticketOpenType === 'PRE_OPEN' && (
              <Badge variant="type-a">선예매</Badge>
            )}
            {ticketOpenType === 'GENERAL_OPEN' && (
              <Badge variant="type-c">일반예매</Badge>
            )}
            <Badge variant="type-b">
              {isBankTransfer ? '무통장 가능' : '무통장 불가능'}
            </Badge>
          </>
        }
      />
    </div>
  );
};

export default Form;
