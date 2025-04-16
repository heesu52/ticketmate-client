import Image from 'next/image';
import Link from 'next/link';

import { LocationOnIcon } from '@/assets/icons';
import Badge from '@/shared/components/badge/badge';
import { Concert } from '@/shared/types';

import styles from './concert-card.module.scss';

interface ConcertCardProps {
  concertItem: Concert;
}

const ConcertCard = ({ concertItem }: ConcertCardProps) => {
  const {
    concertId,
    concertName,
    concertHallName,
    concertType,
    ticketReservationSite,
    ticketPreOpenDate,
    preOpenBankTransfer,
    ticketGeneralOpenDate,
    generalOpenBankTransfer,
    startDate,
    endDate,
    concertThumbnailUrl,
    seatingChartUrl,
  } = concertItem;

  return (
    <>
      <Link href={`concert/${concertId}`}>
        <div className={styles.container}>
          <div className={styles.tag}>
            <Badge type="type-a">선예매까지 D-12</Badge>
            <Badge type="type-a">일반예매까지 D-12</Badge>
          </div>

          {/* 콘서트 정보 */}
          <div className={styles.card_container}>
            <div className={styles.concert_img}>
              <Image
                src={concertThumbnailUrl}
                alt={concertHallName}
                width={104}
                height={139}
              />
            </div>

            <div className={styles.concert_info}>
              <div className={styles.description}>
                <span
                  className={styles.date}
                >{`${startDate} ~ ${endDate}`}</span>
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
