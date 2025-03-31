import { StarIcon } from '@/assets/icons';

import styles from './user-card.module.scss';
import { UserCardProps } from './user-card.type';

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {/* 프로필 이미지 */}
      <div
        className={styles.profile}
        style={{ backgroundImage: `url(${user.profileImage})` }}
      />
      <div className={styles.info_container}>
        <div className={styles.introduce}>
          <span className={styles.nickname}>{user.name}</span>
          <span>{user.introduction || '한 줄 소개를 작성해주세요'}</span>
        </div>
        <div className={styles.review}>
          <StarIcon width={20} height={20} />
          <span className={styles.star}>4.6</span>
          <span className={styles.info}>(12)</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
