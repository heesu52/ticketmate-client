import ConcertList from '@/app/_components/concert-list/conert-list';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <ConcertList />
    </div>
  );
}
