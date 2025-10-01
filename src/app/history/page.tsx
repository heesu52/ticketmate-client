'use client';

import { useMemo, useState } from 'react';

import HistoryList from '@/app/history/_shared/components/history-list/history-list';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import TabButton from '@/shared/components/ui/tab/tab';
import { TabItem } from '@/shared/components/ui/tab/tab.type';

import styles from './page.module.scss';

export default function Page() {
  const [active, setActive] = useState<'CURRENT' | 'PAST'>('CURRENT');

  const tabs: TabItem[] = useMemo(
    () => [
      { value: 'CURRENT', label: '현재 신청내역' },
      { value: 'PAST', label: '과거 신청내역' },
    ],
    [],
  );

  return (
    <PageFrame
      appBar={{
        title: '신청 내역',
      }}
      bottomNav={true}
    >
      <TabButton
        items={tabs}
        value={active}
        onValueChange={(v) => setActive(v as 'CURRENT' | 'PAST')}
      />
      <div className={styles.container}>
        <HistoryList tab={setActive} />
      </div>
    </PageFrame>
  );
}
