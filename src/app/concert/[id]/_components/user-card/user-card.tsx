import styles from './user-card.module.scss';

// UserCardProps에 user 데이터를 추가
interface User {
  id: number;
  name: string;
  profileImage: string;
  introduction: string;
  transactionCount: number;
}

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.left_container}>
        {/* 프로필 이미지 */}
        <div
          className={styles.profile}
          style={{ backgroundImage: `url(${user.profileImage})` }}
        />
        <div className={styles.user_container}>
          <span className={styles.nickname}>{user.name}</span>
          <span>{user.introduction || '한 줄 소개를 작성해주세요'}</span>
        </div>
      </div>

      <div className={styles.count_container}>
        <div className={styles.text}>
          <span className={styles.count}>{user.transactionCount}</span>
          <span>건</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
