'use client';

import { useGetFormList } from '@/app/history/_shared/services/query';

import styles from './history-list.module.scss';
import ClientFormCard from '../client-form-card/client-form-card';

interface HistoryListProps {
  tab: 'current' | 'past';
}

const HistoryList = ({ tab }: HistoryListProps) => {
  const { data } = useGetFormList();

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
