'use client';
import { use, useEffect, useMemo, useRef } from 'react';

import { toast } from 'react-toastify';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-modal';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import { useGetFormDetail } from '@/app/concert/form/[id]/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useModal } from '@/shared/components/modal/use-modal';
import Toast from '@/shared/components/ui/toast/toast';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { TicketOpenType, ApplicationFormStatus } from '@/shared/types';

import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { open, closeTop } = useModal();

  // useLocation으로 navigate에서 넘어온 state 받기
  const { state, searchParams } = useLocation<{
    ticketOpenType: TicketOpenType;
    isBankTransfer: boolean;
  }>();

  const ticketOpenType = state?.ticketOpenType;

  // status는 여전히 쿼리 파라미터 기반으로 사용
  const status = searchParams.get('status') as ApplicationFormStatus | null;

  // status 유무로 기존 신청폼 여부 판단
  const isApplicationFormPage = !!status;
  const applicationFormId = isApplicationFormPage ? id : undefined;

  // 기존 신청폼일 경우 formItem 요청
  const { data: formItem } = useGetFormDetail(
    applicationFormId ? { applicationFormId } : undefined,
  );

  // 새 신청폼일 경우 concertId로 concertItem 요청
  const { data: fetchedConcertItem } = useGetConcertDetail(
    !isApplicationFormPage && id ? { concertId: id } : undefined,
  );

  // 기존 신청폼이면 formItem.concertInfoResponse, 아니면 API 결과 사용
  const concertItem = useMemo(
    () =>
      isApplicationFormPage
        ? (formItem?.concertInfoResponse ?? null)
        : (fetchedConcertItem ?? null),
    [isApplicationFormPage, formItem, fetchedConcertItem],
  );

  const handleOpenModal = () => {
    open({
      id: 'form-modal',
      content: (
        <FormModal
          title="티켓팅 의뢰를 신청하시겠어요?"
          message={`대리인이 수락하게 되면 매칭이 완료됩니다.\n매칭이 완료되면 채팅을 통해 이야기를 나눠보세요.`}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            closeTop();
          }}
          onCancel={() => {
            closeTop();
          }}
          concertId={id}
        />
      ),
    });
  };

  //useRef로 중복 확인 후 토스트 알림 한번만 뜨도록 설정
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (status === 'PENDING' && !hasShownToast.current) {
      hasShownToast.current = true;
      // formreadonly 첫 렌더링 때 나오는 수정불가능 토스트 알림
      toast((props) => (
        <Toast
          {...props}
          variant="error"
          description="수정 불가능한 양식입니다."
        />
      ));
    }
  }, [status]);

  // 에러 발생 시 백엔드 에러 내용 필터링하여 토스트 알림
  const handleError = (message: string) => {
    toast((props) => (
      <Toast {...props} variant="error" description={message} />
    ));
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
              <FormInfo concertItem={concertItem} {...state} />
            </div>

            {/* 신청 폼 탭*/}
            <FormTabManager
              handleOpenModal={handleOpenModal}
              concertItem={concertItem} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 공연데이터
              ticketOpenType={ticketOpenType}
              concertId={id}
              onError={handleError}
              status={status ?? undefined} //분기처리를 위해 전달
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
