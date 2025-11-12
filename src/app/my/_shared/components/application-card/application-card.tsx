'use client';

import Image from 'next/image';

import { AcceptingConcert } from '@/app/my/application/_shared/services/type';
import { MyIcon } from '@/assets/icons';
import Toggle from '@/shared/components/ui/toggle/toggle';

import styles from './application-card.module.scss';

/**
 * @description 마이페이지에서 on인 상태로 만 보이는 공연 카드
 */

interface ApplicationCardProps {
  item: AcceptingConcert;
  onToggle?: (id: string, value: boolean) => void;
}

const ApplicationCard = ({ item, onToggle }: ApplicationCardProps) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={item.concertThumbnailUrl}
        alt={item.concertName}
        width={48}
        height={48}
      />
      <div className={styles.footer_container}>
        <div className={styles.count_container}>
          <span>
            <MyIcon width={12} height={12} stroke="var(--grayscale-100)" />
          </span>
          <span className={styles.count}>{item.matchedClientCount}</span>
        </div>

        <Toggle
          pressed={item.accepting ?? true}
          onPressedChange={(value) =>
            onToggle && onToggle(item.concertId, value)
          }
        />
      </div>
    </div>
  );
};
export default ApplicationCard;
