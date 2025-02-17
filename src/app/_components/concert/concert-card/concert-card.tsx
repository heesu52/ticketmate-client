import styles from './concert-card.module.scss';

interface ConcertItem {
  title: string;
  date: string;
  agent: string;
  img: string;
}

interface ConcertCardProps {
  concertItem: ConcertItem;
}

const ConcertCard = ({ concertItem }: ConcertCardProps) => {
  return (
    <div className={styles.container}>
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
        <div className={styles.agent}>
          <span className={styles.agent_label}>대리인 수</span>
          <span className={styles.agent_count}>{concertItem.agent}</span>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
