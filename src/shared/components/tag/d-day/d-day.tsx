import styles from './d-day.module.scss';

export default function Dday() {
  return (
    <button className={styles.button}>
      <span className={styles.label}>오픈 D-6</span>
    </button>
  );
}
