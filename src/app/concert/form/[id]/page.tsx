'use client';
import { use, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormConfirmModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-confirm-modal';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import { useGetFormDetail } from '@/app/concert/form/[id]/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { TicketOpenType } from '@/shared/types';

import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id: concertId } = resolvedParams;

  const router = useRouter();
  const { open } = useModalStore();

  // useLocation으로 navigate에서 넘어온 state 받기
  const { state, searchParams: searchParamsProps } = useLocation<{
    isBankTransfer: boolean;
  }>();

  const agentId = searchParamsProps.get('agentId') ?? undefined;
  const type = searchParamsProps.get('type') as TicketOpenType;

  // status 유무로 기존 신청폼 여부 판단
  const isApplicationFormPage = !!status;
  const applicationFormId = isApplicationFormPage ? concertId : undefined;

  // 기존 신청폼일 경우 formItem 요청
  const { data: formItem } = useGetFormDetail(
    applicationFormId ? { applicationFormId } : undefined,
  );

  // 새 신청폼일 경우 concertId로 concertItem 요청
  const { data: fetchedConcertItem } = useGetConcertDetail(
    !isApplicationFormPage && concertId ? { concertId: concertId } : undefined,
  );

  // 기존 신청폼이면 formItem.concertInfoResponse, 아니면 API 결과 사용
  const concertItem = useMemo(
    () =>
      isApplicationFormPage
        ? (formItem?.concertInfoResponse ?? null)
        : (fetchedConcertItem ?? null),
    [isApplicationFormPage, formItem, fetchedConcertItem],
  );

  const handleOpenModal = async () => {
    try {
      const result = await open('form-confirm-modal', FormConfirmModal);

      if (result) {
        toastify({
          variant: 'success',
          description: '공연 의뢰에 성공했습니다.',
        });
        router.push('/history');
      }
    } catch (error) {
      router.push(`/concert/${concertId}`);
    }
  };

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
              <FormInfo
                concertItem={concertItem}
                ticketOpenType={type}
                {...state}
              />
            </div>

            {/* 신청 폼 탭*/}
            <FormTabManager
              handleOpenModal={handleOpenModal}
              concertItem={concertItem} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 공연데이터
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
