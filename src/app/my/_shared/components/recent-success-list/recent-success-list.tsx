'use client';

import RecentSuccessCard from '@/app/my/_shared/components/recent-success-card/recent-success-card';
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
      {/* 성공신청내역이 없을 때 */}
      {/* 추후 api 연동 후 recentsuccesscard가 없을 때 최근성공내역없음 버튼이 보일 예정 */}
      <div className={styles.empty_container}>최근 성공내역 없음</div>
    </>
  );
};

export default RecentSuccessList;
