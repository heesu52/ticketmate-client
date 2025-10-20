'use client';

import { useEffect, useState } from 'react';

import HistoryCard from '@/app/history/_shared/components/history-card/history-card';
import { useGetFormList } from '@/app/history/_shared/services/query';

import styles from './history-list.module.scss';

interface HistoryListProps {
  tab: 'CURRENT' | 'PAST';
}

const HistoryList = ({ tab }: HistoryListProps) => {
  //세션에 저장한 membertype
  const [memberType, setMemberType] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');

  //membertype에 따라 신청내역 필터링 값을 clientId와 agentId로 구분
  useEffect(() => {
    try {
      const type = sessionStorage.getItem('memberType') ?? '';
      const id = sessionStorage.getItem('memberId') ?? '';
      setMemberType(type);
      setMemberId(id);
    } catch (error) {
      console.error('Failed to access sessionStorage:', error);
    }
  }, []);

  const clientId = memberType === 'CLIENT' ? memberId : undefined;
  const agentId = memberType === 'AGENT' ? memberId : undefined;

  const { data } = useGetFormList({
    clientId: clientId,
    agentId: agentId,
  });
  const formList = data?.content ?? [];

  // tab 값에 따라 상태 기반 필터링
  const filteredList = formList.filter((formItem) => {
    const isPending = formItem.applicationFormStatus === 'PENDING';
    return tab === 'CURRENT' ? isPending : !isPending;
  });

  return (
    <>
      <div className={styles.container}>
        {filteredList.map((formItem) => (
          <div key={formItem.applicationFormId}>
            <HistoryCard formItem={formItem} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryList;
