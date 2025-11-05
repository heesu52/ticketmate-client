'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MoreIcon } from '@/assets/icons';
import Dropdown from '@/shared/components/ui/dropdown/dropdown';
import Toggle from '@/shared/components/ui/toggle/toggle';

import styles from './application-concert-card.module.scss';

interface ApplicationConcertCardProps {
  concertId: string;
  title: string;
  matchedCount: number;
  isEnabled: boolean;
  onToggle: (id: string, value: boolean) => void;
}

const ApplicationConcertCard = ({
  concertId,
  title,
  matchedCount,
  isEnabled,
  onToggle,
}: ApplicationConcertCardProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={'/placeholder-concert.png'}
        alt={'공연썸네일이미지'}
        width={48}
        height={48}
      />
      <div className={styles.info_container}>
        <div className={styles.header_container}>
          <span className={styles.title}>{title}</span>
          {/* 더보기 버튼 */}
          <Dropdown
            trigger={
              <MoreIcon width={20} height={20} fill="var(--grayscale-700)" />
            }
            items={[
              {
                label: '한 줄 소개 관리',
                onClick: () => router.push('/my/application/bio'),
              },
            ]}
          />
        </div>

        <div className={styles.footer_container}>
          <span className={styles.detail_container}>
            <span className={styles.nickname}>매칭된 의뢰인</span>
            <span className={styles.count}>{matchedCount}</span>
          </span>

          <Toggle
            pressed={isEnabled}
            onPressedChange={(value) => onToggle(concertId, value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationConcertCard;
