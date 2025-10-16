'use client';
import { use } from 'react';

import { useRouter } from 'next/navigation';

import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormCancelModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-cancel-modal';
// import FormReasonModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-reason-modal ';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import { useGetFormDetail } from '@/app/concert/form/[id]/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { ApplicationFormStatus, TicketOpenType } from '@/shared/types';

import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id: applicationFormId } = resolvedParams;
  const { state, searchParams: searchParamsProps } = useLocation<{
    applicationFormStatus: ApplicationFormStatus;
  }>();
  const router = useRouter();
  const { open } = useModalStore();

  const { data: formItem } = useGetFormDetail({ applicationFormId });
  if (!formItem) return null;
  const concertItem = formItem.concertInfoResponse;

  const type = searchParamsProps.get('type') as TicketOpenType;

  // 에러 발생 시 토스트 알림
  const handleError = (message: string) => {
    // 읽기 전용이라 버튼 액션 없음
    console.error(message);
  };

  // 공연 신청 취소 모달 (의뢰인용)
  const handleOpenModal = async () => {
    try {
      const result = await open('form-cancel-modal', FormCancelModal, {
        applicationFormId,
      });

      if (result) {
        toastify({
          variant: 'success',
          description: '신청이 정상적으로 취소되었습니다',
        });
        router.push('/history');
      }
    } catch (error) {
      toastify({
        variant: 'error',
        description: '신청 취소에 실패했습니다.',
      });
    }
  };

  // // 신청서 거절 사유 확인 모달(의뢰인)
  // const handleOpenModal = () => {
  //   open('form-reason-modal', FormReasonModal, { applicationFormId });
  // };
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
              handleOpenModal={handleOpenModal}
              concertItem={concertItem} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 신청서정보
              ticketOpenType={type}
              applicationFormId={applicationFormId}
              onError={handleError}
              status={state?.applicationFormStatus} //분기처리를 위해 전달
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
