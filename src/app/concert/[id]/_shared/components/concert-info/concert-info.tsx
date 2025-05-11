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
} from '@/shared/constants/ticketsite-url';
import { TicketReservationSite, Concert } from '@/shared/types';
import { formatDate, calculateDday } from '@/shared/utils/dates';

import styles from './concert-info.module.scss';

interface ConcertInfoProps {
  concertItem: Concert;
}

const ConcertInfo = ({ concertItem }: ConcertInfoProps) => {
  const { setIsShowSpacer } = useAppBarStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const {
    concertId,
    concertName,
    concertHallName,
    concertType,
    ticketReservationSite,
    preOpenDate,
    generalOpenDate,
    startDate,
    endDate,
    concertThumbnailUrl,
  } = concertItem;

  //type별 url과 사이트 이름 변환
  const sitekey = ticketReservationSite as TicketReservationSite;
  const siteUrl = TICKET_SITE_URL_MAP[sitekey] ?? '#';
  const siteLabel = TICKET_SITE_LABEL_MAP[sitekey] ?? '기타';

  //선예매 & 일반예매 d-day 변환
  const preOpenday = calculateDday(preOpenDate);
  const generalOpenday = calculateDday(generalOpenDate);

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
            {preOpenDate && (
              <Badge type="type-a">선예매까지 {preOpenday}</Badge>
            )}
            {generalOpenDate && (
              <Badge type="type-a">일반예매까지 {generalOpenday}</Badge>
            )}
          </div>

          <div className={styles.title}>{concertName}</div>
          <div className={styles.info_container}>
            <div className={styles.detail_container}>
              <div className={styles.detail}>
                <span className={styles.category}>공연 일자</span>
                <span className={styles.info}>
                  {' '}
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
