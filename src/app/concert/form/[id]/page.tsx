'use client';
import { use } from 'react';

import { useRouter } from 'next/navigation';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormConfirmModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-submit-modal';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { useHandleError } from '@/shared/hooks/use-error';
import { TicketOpenType } from '@/shared/types';

import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id: concertId } = resolvedParams;
  const router = useRouter();
  const { open } = useModalStore();
  const { handleError } = useHandleError();

  // useLocation으로 navigate에서 넘어온 state 받기
  const { searchParams: searchParamsProps } =
    useLocation<Record<string, unknown>>();
  const agentId = searchParamsProps.get('agentId');
  const type = searchParamsProps.get('type') as TicketOpenType;

  const { data: concertItem } = useGetConcertDetail({ concertId });

  // 신청서 요청 확인 모달 (의뢰인용)
  const handleOpenConfirmModal = async () => {
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
      handleError(error);
    }
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
              handleOpenModal={handleOpenConfirmModal}
              concertItem={concertItem} //새로운 신청서 작성 시 필요한 공연정보
              ticketOpenType={type}
              agentId={agentId}
              concertId={concertId}
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
