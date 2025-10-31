'use client';

import Image from 'next/image';

import { StarIcon } from '@/assets/icons';
import { useMember } from '@/shared/context/member-context';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import styles from './recent-success-card.module.scss';

const RecentSuccessCard = () => {
  const navigation = useNavigation();
  const { member } = useMember();

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={'/naver'}
        alt={'공연썸네일이미지'}
        width={48}
        height={48}
      />
      <div className={styles.info_container}>
        <span className={styles.title}>
          터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
        </span>

        <div className={styles.detail_container}>
          <span className={styles.nickname}>{member?.nickname}</span>

          <div className={styles.footer_container}>
            <span className={styles.date}>25.01.24(일)</span>

            <span className={styles.review_container}>
              <span>
                <StarIcon width={16} height={16} />
              </span>
              <span className={styles.review_score}>{4.5}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSuccessCard;
