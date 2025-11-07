'use client';
import { use } from 'react';

import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormReasonModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-reason-modal/form-reason-modal';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import { useGetFormDetail } from '@/app/concert/form/[id]/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { useLocation } from '@/shared/hooks/navigation/use-location';

import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id: applicationFormId } = use(params);
  const { open } = useModalStore();
  const { state } = useLocation<{
    agentNickname: string;
  }>();

  const { data: formItem } = useGetFormDetail({ applicationFormId });

  // 신청서 거절 사유 확인 모달 (공통)
  const handleOpenReasonModal = () => {
    open('form-reason-modal', FormReasonModal, {
      applicationFormId,
      agentNickname: state?.agentNickname,
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
              handleOpenModal={handleOpenReasonModal}
              concertItem={formItem.concertInfoResponse} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 신청서정보
              ticketOpenType={formItem.ticketOpenType}
              applicationFormId={applicationFormId}
              status={formItem.applicationFormStatus} //분기처리를 위해 전달
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
