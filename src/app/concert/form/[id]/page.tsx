'use client';
import { use, useEffect, useRef } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import Form from '@/app/concert/form/[id]/_shared/components/form/form';
import FormModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-modal';
import { useModal } from '@/shared/components/modal/use-modal';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';
import { TicketOpenType, ApplicationFormStatus } from '@/shared/types';

import FormTabManager from './_shared/components/tab-button/manager/form-tab-manager';
import { useGetFormDetail } from './_shared/services/query';
import styles from './page.module.scss';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ticketOpenType?: string; status?: string }>;
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const { id } = resolvedParams;
  const { open, closeTop } = useModal();

  //현재 직렬처리로 되어있어서 로딩시간이 조금 길게 느껴짐, 추후 병렬처리 훅을 만들어서 개선해놓자
  const ticketOpenType = resolvedSearchParams.ticketOpenType as TicketOpenType;
  const status = resolvedSearchParams.status as ApplicationFormStatus;

  // status 쿼리 존재 여부에 따른 분기(새로운 신청폼 / 기존 신청폼)
  const isApplicationFormPage = !!status;
  const applicationFormId = isApplicationFormPage ? id : undefined;
  const { data: formItem } = useGetFormDetail(
    applicationFormId ? { applicationFormId } : undefined,
  );

  // concertId는 분기 처리
  // 기존신청폼 렌더링 할 때는 params에 concertId가 없으므로, formItem에서 concertId 추출
  const concertId = isApplicationFormPage ? formItem?.concertId : id;
  // concertId가 준비되면 조회
  const { data: concertItem } = useGetConcertDetail(
    concertId ? { concertId } : undefined,
  );

  const handleOpenModal = () => {
    open({
      id: 'form-modal',
      content: (
        <FormModal
          title="일반예매 신청이 완료되었습니다."
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
      //formreadonly 첫 렌더링 때 나오는 수정불가능 토스트 알림
      customToast({
        description: `수정 불가능한 양식입니다.`,
      });
    }
  }, [status]);

  //에러 발생 시 백엔드 에러 내용 필터링하여 토스트 알림
  const handleErrorToast = (message: string) =>
    customToast({
      description: message,
    });

  return (
    <>
      <AppBarSetter title="공연 신청" />

      <div className={styles.container}>
        {concertItem && (
          <>
            <Form concertItem={concertItem} ticketOpenType={ticketOpenType} />
            <FormTabManager
              handleOpenModal={handleOpenModal}
              concertItem={concertItem} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 공연데이터를 불러오기 위해 전달
              ticketOpenType={ticketOpenType}
              concertId={id}
              onError={handleErrorToast}
              status={status} //분기처리를 위해 전달
            />
          </>
        )}
      </div>
    </>
  );
}
