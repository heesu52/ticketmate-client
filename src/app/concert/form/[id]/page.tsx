'use client';
import { use } from 'react';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { TicketOpenType } from '@/shared/types';

import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id: concertId } = resolvedParams;

  // useLocation으로 navigate에서 넘어온 state 받기
  const { searchParams: searchParamsProps } =
    useLocation<Record<string, unknown>>();
  const agentId = searchParamsProps.get('agentId') ?? undefined;
  const type = searchParamsProps.get('type') as TicketOpenType;

  const { data: concertItem } = useGetConcertDetail({ concertId });

  // 에러 발생 시 백엔드 에러 내용 필터링하여 토스트 알림
  const handleError = (message: string) => {
    toastify({
      variant: 'error',
      description: message,
    });
  };

  return (
    <PageFrame
      appBar={{
        title: '신청 양식',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        {concertItem && (
          <>
            {/* 공연 정보 */}
            <div className={styles.forminfo_container}>
              <FormInfo concertItem={concertItem} ticketOpenType={type} />
            </div>

            {/* 신청 폼 탭*/}
            <FormTabManager
              concertItem={concertItem} //새로운 신청서 작성 시 필요한 공연정보
              ticketOpenType={type}
              concertId={concertId}
              agentId={agentId}
              onError={handleError}
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
