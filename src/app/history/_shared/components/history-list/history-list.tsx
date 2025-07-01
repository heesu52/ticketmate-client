'use client';

import AgentFormCard from '@/app/history/_shared/components//agent-form-card/agent-form-card';
import ClientFormCard from '@/app/history/_shared/components/client-form-card/client-form-card';
import { useGetFormList } from '@/app/history/_shared/services/query';

import styles from './history-list.module.scss';

interface HistoryListProps {
  tab: 'current' | 'past';
}

const HistoryList = ({ tab }: HistoryListProps) => {
  //세션에 저장한 membertype
  const MemberType = sessionStorage.getItem('memberType') ?? '';

  //membertype에 따라 신청내역 필터링 값을 clientId와 agentId로 구분
  const clientId =
    MemberType === 'CLIENT'
      ? (sessionStorage.getItem('memberId') ?? '')
      : undefined;
  const agentId =
    MemberType === 'AGENT'
      ? (sessionStorage.getItem('memberId') ?? '')
      : undefined;

  const { data } = useGetFormList({
    clientId: clientId,
    agentId: agentId,
  });
  const formList = data?.content ?? [];

  // tab 값에 따라 상태 기반 필터링
  const filteredList = formList.filter((formItem) => {
    const isPending = formItem.applicationFormStatus === 'PENDING';
    return tab === 'current' ? isPending : !isPending;
  });

  return (
    <>
      <div className={styles.container}>
        <span className={styles.count}>
          총<span className={styles.asterisk}>{filteredList.length}</span>
          <span>개</span>
        </span>
        {filteredList.map((formItem, index) =>
          MemberType === 'CLIENT' ? (
            <ClientFormCard formItem={formItem} key={index} />
          ) : (
            <AgentFormCard formItem={formItem} key={index} />
          ),
        )}
      </div>
    </>
  );
};

export default HistoryList;
