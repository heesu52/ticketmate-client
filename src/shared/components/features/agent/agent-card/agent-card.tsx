import Image from 'next/image';

import { StarIcon } from '@/assets/icons';
import { AgentInfo } from '@/shared/types';

import styles from './agent-card.module.scss';

interface AgentCardProps {
  agent: AgentInfo;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const {
    agentId,
    nickname,
    profileUrl,
    introduction,
    averageRating,
    reviewCount,
  } = agent;

  const safeAvg = Number.isFinite(averageRating)
    ? (averageRating as number)
    : 0;
  const safeCount = Number.isFinite(reviewCount) ? (reviewCount as number) : 0;

  return (
    <div className={styles.container}>
      <Image
        className={styles.profile_image}
        src={profileUrl}
        alt={nickname}
        width={48}
        height={48}
      />
      <div className={styles.info_container}>
        <div className={styles.introduction_container}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.introduction}>
            {introduction || '한 줄 소개를 작성해주세요'}
          </span>
        </div>

        <div className={styles.review_container}>
          <span>
            <StarIcon width={16} height={16} />
          </span>
          <span className={styles.review_score}>{safeAvg.toFixed(1)}</span>
          <span className={styles.review_count}>
            {`(${safeCount > 99 ? '99+' : safeCount})`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
