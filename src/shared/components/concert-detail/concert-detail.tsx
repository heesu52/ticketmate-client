'use client';
import React from 'react';

import Link from 'next/link';

import { formatDate } from '@/shared/utils/dates';

import styles from './concert-detail.module.scss';

interface ConcertDetailProps {
  concertName: string;
  startDate?: string;
  endDate?: string;
  concertHallName: string;
  siteUrl: string;
  siteLabel: string;
  badges?: React.ReactNode; // Badge 컴포넌트들
}

const ConcertInfo = ({
  concertName,
  startDate,
  endDate,
  concertHallName,
  siteUrl,
  siteLabel,
  badges,
}: ConcertDetailProps) => {
  return (
    <div>
      {/* Badge 영역 */}
      {badges && <div className={styles.tag_container}>{badges}</div>}

      {/* 제목 */}
      <span className={styles.title}>{concertName}</span>

      {/* 공연 상세정보 */}
      <div className={styles.detail_container}>
        <div className={styles.detail}>
          <span className={styles.category}>공연일자</span>
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
  );
};

export default ConcertInfo;
