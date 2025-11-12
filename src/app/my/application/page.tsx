'use client';
import React, { useEffect, useState } from 'react';

import ApplicationConcertCard from '@/app/my/application/_shared/components/application-concert-card/application-concert-card';
import { useCreateAgentAvailabilityMutation } from '@/app/my/application/_shared/services/mutation';
import { useGetOnOffConcertList } from '@/app/my/application/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { toastify } from '@/shared/components/ui/toast/toastify';

import styles from './page.module.scss';

export default function ApplicationPage() {
  // 신청 공연 데이터 불러오기
  const { data } = useGetOnOffConcertList();

  // content만 추출
  const acceptingConcertItem = React.useMemo(
    () => data?.content ?? [],
    [data?.content],
  );
  // 토글 변경 시 데이터를 복사해서 저장
  const [concerts, setConcerts] = useState(acceptingConcertItem);

  // 토글 변경 후 데이터 새로 세팅
  useEffect(() => {
    setConcerts(acceptingConcertItem);
  }, [acceptingConcertItem]);

  const { mutate } = useCreateAgentAvailabilityMutation();

  // 토글 on/off로 공연 상태 변환
  const handleToggle = (concertId: string, value: boolean) => {
    setConcerts((prev) =>
      prev.map((concert) =>
        concert.concertId === concertId
          ? { ...concert, accepting: value }
          : concert,
      ),
    );

    mutate(
      {
        concertId,
        accepting: value,
      },
      {
        onSuccess: () => {
          toastify({
            variant: 'success',
            description: value
              ? '신청 접수가 시작되었습니다'
              : '신청이 마감되었습니다',
          });
        },
        onError: () => {
          setConcerts((prev) =>
            prev.map((concert) =>
              concert.concertId === concertId
                ? { ...concert, accepting: !value }
                : concert,
            ),
          );

          toastify({
            variant: 'error',
            description: '상태 변경에 실패했습니다',
          });
        },
      },
    );
  };

  // on/off 공연 분리해서 리스트로 전달
  const activeConcerts = concerts.filter((c) => c.accepting);
  const closedConcerts = concerts.filter((c) => !c.accepting);

  return (
    <PageFrame
      appBar={{
        title: '신청 공연 관리',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <span className={styles.title}>신청 접수중</span>
        <Spacer size={24} />
        <div className={styles.list_container}>
          {activeConcerts.map((concert) => (
            <ApplicationConcertCard
              key={concert.concertId}
              Item={concert}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <Spacer size={40} />

        <span className={styles.title}>신청 마감</span>
        <Spacer size={24} />
        <div className={styles.list_container}>
          {closedConcerts.map((concert) => (
            <ApplicationConcertCard
              key={concert.concertId}
              Item={concert}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
