import ConcertList from '@/app/_components/concert/concert-list/concert-list';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <ConcertList />
    </div>
  );
}
