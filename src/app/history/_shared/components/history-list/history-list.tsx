'use client';

import ClientFormCard from '@/app/history/_shared/components/client-form-card/client-form-card';
import { useGetFormList } from '@/app/history/_shared/services/query';

import styles from './history-list.module.scss';
//import AgentFormCard from '@/app/history/_shared/components//agent-form-card/agent-form-card';

interface HistoryListProps {
  tab: 'current' | 'past';
}

const HistoryList = ({ tab }: HistoryListProps) => {
  //임시로 memberId 하드코딩
  // const memberId = 'dd279013-29da-40ea-94af-9721a1abde74';
  //현재는 모든 신청내역을 불러오고 있음 -> membertype & memberid로 본인의 기록만 가져오도록 수정필요
  const { data } = useGetFormList({});
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
        {filteredList.map((formItem, index) => (
          <ClientFormCard formItem={formItem} key={index} />
        ))}
      </div>
    </>
  );
};

export default HistoryList;
