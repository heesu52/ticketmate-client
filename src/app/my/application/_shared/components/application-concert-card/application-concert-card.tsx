'use client';

import Image from 'next/image';

import { AcceptingConcert } from '@/app/my/application/_shared/services/type';
import { MoreIcon } from '@/assets/icons';
import Dropdown from '@/shared/components/ui/dropdown/dropdown';
import Toggle from '@/shared/components/ui/toggle/toggle';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import styles from './application-concert-card.module.scss';

/**
 * @description 신청 공연관리 페이지에서 on/off를 설정 할 수 있는 공연 카드
 */

interface ApplicationConcertCardProps {
  Item: AcceptingConcert;
  onToggle: (id: string, value: boolean) => void;
}

const ApplicationConcertCard = ({
  Item,
  onToggle,
}: ApplicationConcertCardProps) => {
  const navigation = useNavigation();

  // 버튼 클릭 시 navigate로 이동
  const handleNavigate = () => {
    navigation.navigate({
      pathname: `/my/application/bio/${Item.concertId}`,
    });
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={Item.concertThumbnailUrl}
        alt={Item.concertName}
        width={48}
        height={48}
      />
      <div className={styles.info_container}>
        <div className={styles.header_container}>
          <span className={styles.title}>{Item.concertName}</span>
          {/* 더보기 버튼 */}
          <Dropdown
            trigger={
              <MoreIcon width={20} height={20} fill="var(--grayscale-700)" />
            }
            items={[
              {
                label: '한 줄 소개 관리',
                onClick: () => handleNavigate(),
              },
            ]}
          />
        </div>

        <div className={styles.footer_container}>
          <span className={styles.detail_container}>
            <span className={styles.nickname}>매칭된 의뢰인</span>
            <span className={styles.count}>{Item.matchedClientCount}</span>
          </span>

          <Toggle
            pressed={Item.accepting ?? false}
            onPressedChange={(value) => onToggle(Item.concertId, value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationConcertCard;
