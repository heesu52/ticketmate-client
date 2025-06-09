'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Badge from '@/shared/components/badge/badge';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';
import { useAppBarStore } from '@/shared/components/header/app-bar/use-app-bar-store';
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
  const { setIsShowSpacer } = useAppBarStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const {
    concertName,
    concertHallName,
    ticketReservationSite,
    concertThumbnailUrl,
    ticketOpenDateInfoResponses,
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
  const preOpen = getPreOpenInfo(ticketOpenDateInfoResponses ?? []);
  const generalOpen = getGeneralOpenInfo(ticketOpenDateInfoResponses ?? []);

  useEffect(() => {
    // 배경 높이 - 앱바 높이
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 247 - 56);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤 시 app-bar 와 컨텐츠 간격 조절
  useEffect(() => {
    setIsShowSpacer(false);

    return () => {
      setIsShowSpacer(true);
    };
  }, [setIsShowSpacer]);

  return (
    <>
      <div className={styles.container}>
        <AppBarSetter
          title="공연 상세 페이지"
          backgroundColor={isScrolled ? 'white' : 'transparent'}
        />
        <div className={styles.background_container}>
          <Image
            className={styles.background_image}
            src={concertThumbnailUrl}
            alt={concertName}
            layout="fill"
          />
        </div>
        <div className={styles.title_container}>
          <Image
            className={styles.image}
            src={concertThumbnailUrl}
            alt={concertName}
            width={140}
            height={186}
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
