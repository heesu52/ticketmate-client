'use client';

import React from 'react';

import RecentSuccessCard from '@/app/my/recent-success/_shared/components/recent-success-card/recent-success-card';
import { useGetRecentSuccessList } from '@/app/my/recent-success/_shared/services/query';
import { useMember } from '@/shared/context/member-context';

import styles from './recent-success-list.module.scss';

const RecentSuccessList = () => {
  const { member } = useMember();

  // 최근성공내역 데이터 불러오기
  const { data } = useGetRecentSuccessList(member?.memberId ?? '');

  // content만 추출
  const recentSuccessItems = React.useMemo(
    () => data?.content ?? [],
    [data?.content],
  );
  return (
    <div className={styles.container}>
      {recentSuccessItems.length > 0 ? (
        recentSuccessItems.map((item) => (
          <RecentSuccessCard key={item.fulfillmentId} item={item} />
        ))
      ) : (
        // 성공 신청 내역 없을 경우
        <div className={styles.empty_container}>최근 성공내역 없음</div>
      )}
    </div>
  );
};

export default RecentSuccessList;
