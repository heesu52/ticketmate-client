import styles from './bank-negative.module.scss';

export default function BankNegative() {
  return (
    <button className={styles.button}>
      <span className={styles.label}>무통장 불가</span>
    </button>
  );
}
