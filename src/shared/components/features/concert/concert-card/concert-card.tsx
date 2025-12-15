import Image from 'next/image';
import Link from 'next/link';

import { DateRangeIcon, LocationOnIcon } from '@/assets/icons';
import Badge from '@/shared/components/ui/badge/badge';
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
          <div className={styles.badge_container}>
            {ticketPreOpenDate && (
              <Badge variant="type-a">
                선예매까지 {calculateDday(ticketPreOpenDate)}
              </Badge>
            )}
            {ticketGeneralOpenDate && (
              <Badge variant="type-c">
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
              <span className={styles.title}>{concertName}</span>

              <div className={styles.info_container}>
                <div className={styles.info_item}>
                  <LocationOnIcon
                    width={16}
                    height={16}
                    fill="var(--grayscale-600)"
                  />
                  <span>
                    {`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
                  </span>
                </div>
                <div className={styles.info_item}>
                  <DateRangeIcon
                    width={16}
                    height={16}
                    fill="var(--grayscale-600)"
                  />
                  <span className={styles.info}>
                    {concertHallName ?? '공연장 정보가 없습니다'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ConcertCard;
