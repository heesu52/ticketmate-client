'use client';

import Image from 'next/image';

import { HistoryItem } from '@/app/my/recent-success/_shared/services/type';
import { StarIcon } from '@/assets/icons';

import styles from './recent-success-card.module.scss';

interface RecentSuccessCardProps {
  item: HistoryItem;
}
const RecentSuccessCard = ({ item }: RecentSuccessCardProps) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={item.concertThumbnailUrl}
        alt={item.concertName}
        width={48}
        height={48}
      />
      <div className={styles.info_container}>
        <span className={styles.title}></span>

        <div className={styles.detail_container}>
          <span className={styles.nickname}>{item.clientNickname}</span>

          <div className={styles.footer_container}>
            <span className={styles.date}>{item.createDate}</span>

            <span className={styles.review_container}>
              <span>
                <StarIcon width={16} height={16} />
              </span>
              <span className={styles.review_score}>{item.reviewRating}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSuccessCard;
