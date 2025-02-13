import styles from './user-card.module.scss';

export default function UserCard() {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        {/* 추후 img 태그로 변경 */}
        <div className={styles.profile} />
        <div className={styles.user_container}>
          <span className={styles.nickname}>의문의 티켓터</span>
          <span>한 줄 소개를 작성해주세요</span>
        </div>
      </div>

      <div className={styles.count_container}>
        <div className={styles.text}>
          <span className={styles.count}>24</span>
          <span>건</span>
        </div>
      </div>
    </div>
  );
}
