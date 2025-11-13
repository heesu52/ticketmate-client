'use client';

import RecentSuccessCard from '@/app/my/recent-success/recent-success-list/recent-success-card/recent-success-card';
import { useMember } from '@/shared/context/member-context';

import styles from './recent-success-list.module.scss';

const RecentSuccessList = () => {
  const { member } = useMember();

  return (
    <>
      <div className={styles.container}>
        <RecentSuccessCard />
        <RecentSuccessCard />
      </div>
    </>
  );
};

export default RecentSuccessList;
