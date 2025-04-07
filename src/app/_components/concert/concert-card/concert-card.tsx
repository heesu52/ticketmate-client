import Link from 'next/link';

import { LocationOnIcon } from '@/assets/icons';
import Badge from '@/shared/components/badge/badge';

import styles from './concert-card.module.scss';

interface ConcertItem {
  title: string;
  date: string;
  place: string;
  img: string;
}

interface ConcertCardProps {
  concertItem: ConcertItem;
}

const ConcertCard = ({ concertItem }: ConcertCardProps) => {
  return (
    <>
      <Link href={'concert/:id'}>
        <div className={styles.container}>
          <div className={styles.tag}>
            <Badge type="type-a">선예매까지 D-12</Badge>
            <Badge type="type-a">일반예매까지 D-12</Badge>
          </div>
          <div className={styles.card_container}>
            <div className={styles.concert_img}>
              {/* 추후 next의 Image 로 변경 예정 */}
              <img
                src={concertItem.img}
                alt={concertItem.title}
                width={104}
                height={139}
              />
            </div>
            <div className={styles.concert_info}>
              <div className={styles.description}>
                <span className={styles.date}>{concertItem.date}</span>
                <span className={styles.title}>{concertItem.title}</span>
              </div>
              <div className={styles.place}>
                <LocationOnIcon width={16} height={16} />
                <span className={styles.location}>{concertItem.place}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ConcertCard;
