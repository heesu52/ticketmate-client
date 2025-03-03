import styles from './bank-positive.module.scss';

export default function BankPositive() {
  return (
    <button className={styles.button}>
      <span className={styles.label}>무통장 가능</span>
    </button>
  );
}
