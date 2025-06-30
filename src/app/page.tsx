import ConcertList from '@/app/_components/concert/concert-list/concert-list';
import { useMember } from '@/shared/hooks/use-member';

import styles from './page.module.scss';

export default function Home() {
  const member = useMember();
  console.log(member);

  return (
    <div className={styles.container}>
      <ConcertList />
    </div>
  );
}
