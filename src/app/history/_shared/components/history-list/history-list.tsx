'use client';

import styles from './history-list.module.scss';
import ConcertInfo from '../concert-info/concert-info';

interface HistoryListProps {
  tab: 'current' | 'past';
}

const HistoryList = ({ tab }: HistoryListProps) => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.count}>
          총<span className={styles.asterisk}>12</span>
          <span>개</span>
        </span>

        {tab === 'current' ? (
          <div>
            <ConcertInfo tab={tab} />
            <ConcertInfo tab={tab} />
            <ConcertInfo tab={tab} />
          </div>
        ) : (
          <div>
            <ConcertInfo tab={tab} />
            <ConcertInfo tab={tab} />
            <ConcertInfo tab={tab} />
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryList;
