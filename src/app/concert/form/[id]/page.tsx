'use client';
import { use, useEffect } from 'react';

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

  // status 존재 여부에 따른 분기
  const isApplicationFormPage = !!status;

  const applicationFormId = isApplicationFormPage ? id : undefined;

  const { data: formItem } = useGetFormDetail(
    id ? { applicationFormId: id } : undefined,
  );
  // concertId는 분기 처리
  const concertId = isApplicationFormPage ? formItem?.concertId : id;

  // concertId가 준비되면 조회
  const { data: concertItem } = useGetConcertDetail(
    concertId ? { concertId } : undefined,
  );

  console.log('applicationFormId', applicationFormId);
  console.log('concertId', concertId);
  console.log('formItem', formItem);

  const handleErrorToast = (message: string) =>
    customToast({
      description: message,
    });

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

  useEffect(() => {
    if (status) {
      customToast({
        description: `수정 불가능한 양식입니다.`, // 필요한 메시지로 변경하세요
      });
    }
  }, [status]);

  return (
    <>
      <AppBarSetter title="공연 신청" />

      <div className={styles.container}>
        {concertItem && (
          <>
            <Form concertItem={concertItem} ticketOpenType={ticketOpenType} />
            <FormTabManager
              handleOpenModal={handleOpenModal}
              concertItem={concertItem}
              ticketOpenType={ticketOpenType}
              concertId={id}
              onError={handleErrorToast}
              status={status}
            />
          </>
        )}
      </div>
    </>
  );
}
