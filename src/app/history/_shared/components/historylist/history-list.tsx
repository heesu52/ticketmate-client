'use client';

import styles from './history-list.module.scss';
import ConcertInfo from '../concert-info/historylist/concert-info';

const HistoryList = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.count}>
          총<span className={styles.asterisk}>12</span>
          <span>개</span>
        </span>
        <ConcertInfo />
        <ConcertInfo />
        <ConcertInfo />
      </div>
    </>
  );
};

export default HistoryList;
