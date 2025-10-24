'use client';
import { use, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormCancelModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-cancel-modal';
import FormConfirmModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-confirm-modal';
import FormReasonModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-reason-modal';
import FormRejectedModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-rejected-modal';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import { useGetFormDetail } from '@/app/concert/form/[id]/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useMember } from '@/shared/context/member-context';
import { useLocation } from '@/shared/hooks/navigation/use-location';

import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id: applicationFormId } = resolvedParams;
  const router = useRouter();
  const { open, close } = useModalStore();
  const { member } = useMember();
  const { state } = useLocation<{
    agentNickname: string;
  }>();

  const { data: formItem } = useGetFormDetail({ applicationFormId });

  // 에러 발생 시 토스트 알림
  const handleError = (message: string) => {
    // 읽기 전용이라 버튼 액션 없음
    console.error(message);
  };

  // clientId & pending: 신청취소
  // agentId & pending : 거절 or 수락
  // rejected: 거절사유
  // cancel,canceld-inprocess : 신청

  // 공연 신청 취소 모달 (의뢰인용)
  const handleOpenCancelModal = async () => {
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

  // 신청서 거절 사유 확인 모달 (의뢰인용)
  const handleOpenReasonModal = () => {
    open('form-reason-modal', FormReasonModal, {
      applicationFormId,
      agentNickname: state?.agentNickname,
    });
  };

  // 신청서 재요청 확인 모달 (의뢰인용)
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
      toastify({
        variant: 'error',
        description: '공연 의뢰에 실패했습니다.',
      });
    }
  };

  //신청서 거절 모달 (대리인용)
  const handleOpenRejectedModal = async () => {
    try {
      const result = await open('form-rejected-modal', FormRejectedModal, {
        applicationFormId,
      });
      if (result) {
        toastify({
          variant: 'success',
          description: '신청이 정상적으로 거절되었습니다',
        });
        router.push('/history');
      }
    } catch (error) {
      toastify({
        variant: 'error',
        description: '신청 거절에 실패했습니다.',
      });
    }
  };

  const status = formItem?.applicationFormStatus;

  const handleOpenModal = () => {
    if (!status) return;

    //memberType를 기준으로 분기처리
    if (status === 'PENDING') {
      if (member?.memberType === 'CLIENT') {
        handleOpenCancelModal();
      } else if (member?.memberType === 'AGENT') {
        handleOpenRejectedModal();
      }
      return;
    }
    if (status === 'REJECTED') {
      handleOpenReasonModal();
      return;
    }
    if (status === 'CANCELED' || status === 'CANCELED_IN_PROCESS') {
      handleOpenConfirmModal();
    }
  };

  // 페이지 벗어날 경우 모달 닫기
  useEffect(() => {
    const modalKeys = [
      'form-cancel-modal',
      'form-reason-modal',
      'form-confirm-modal',
    ];

    return () => {
      modalKeys.forEach((key) => close(key));
    };
  }, [close]);

  return (
    <PageFrame
      appBar={{
        title: '신청 양식',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        {formItem && (
          <>
            {/* 공연 정보 */}
            <div className={styles.forminfo_container}>
              <FormInfo
                concertItem={formItem.concertInfoResponse}
                ticketOpenType={formItem.ticketOpenType}
              />
            </div>

            {/* 신청 폼 탭*/}
            <FormTabManager
              handleOpenModal={handleOpenModal}
              concertItem={formItem.concertInfoResponse} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 신청서정보
              ticketOpenType={formItem.ticketOpenType}
              applicationFormId={applicationFormId}
              onError={handleError}
              status={formItem.applicationFormStatus} //분기처리를 위해 전달
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
