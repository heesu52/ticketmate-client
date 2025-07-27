import Image from 'next/image';
import Link from 'next/link';

import { LocationOnIcon } from '@/assets/icons';
import Badge from '@/shared/components/badge/badge';
import { Concert } from '@/shared/types';
import { calculateDday, formatDate } from '@/shared/utils/dates';

import styles from './concert-card.module.scss';

interface ConcertCardProps {
  concertItem: Concert;
}

const ConcertCard = ({ concertItem }: ConcertCardProps) => {
  const {
    concertId,
    concertName,
    concertHallName,
    ticketPreOpenDate,
    ticketGeneralOpenDate,
    startDate,
    endDate,
    concertThumbnailUrl,
  } = concertItem;

  return (
    <>
      <Link href={`/concert/${concertId}`}>
        <div className={styles.container}>
          <div className={styles.tag}>
            {ticketPreOpenDate && (
              <Badge type="type-a">
                선예매까지 {calculateDday(ticketPreOpenDate)}
              </Badge>
            )}
            {ticketGeneralOpenDate && (
              <Badge type="type-a">
                일반예매까지 {calculateDday(ticketGeneralOpenDate)}
              </Badge>
            )}
          </div>

          {/* 콘서트 정보 */}
          <div className={styles.card_container}>
            <div className={styles.concert_img}>
              <Image
                src={concertThumbnailUrl}
                alt={concertName}
                width={100}
                height={133}
                unoptimized
                priority
              />
            </div>

            <div className={styles.concert_info}>
              <div className={styles.description}>
                <span className={styles.date}>
                  {`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
                </span>
                <span className={styles.title}>{concertName}</span>
              </div>
              <div className={styles.place}>
                <LocationOnIcon width={16} height={16} />
                <span className={styles.location}>{concertHallName}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ConcertCard;
