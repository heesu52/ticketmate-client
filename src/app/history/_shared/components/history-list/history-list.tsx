'use client';

import HistoryCard from '@/app/history/_shared/components/history-card/history-card';
import { useGetFormList } from '@/app/history/_shared/services/query';
import { useMember } from '@/shared/context/member-context';

import styles from './history-list.module.scss';

interface HistoryListProps {
  tab: 'CURRENT' | 'PAST';
}

const HistoryList = ({ tab }: HistoryListProps) => {
  const { member } = useMember();

  const clientId =
    member?.memberType === 'CLIENT' ? member?.memberId : undefined;
  const agentId = member?.memberType === 'AGENT' ? member?.memberId : undefined;

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

  if (filteredList.length === 0 && tab === 'CURRENT') {
    return (
      <div className={styles.empty_container}>진행 중인 신청내역이 없음</div>
    );
  } else if (filteredList.length === 0 && tab === 'PAST') {
    return (
      <div className={styles.empty_container}>아직 완료된 신청내역이 없음</div>
    );
  }

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
