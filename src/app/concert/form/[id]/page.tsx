'use client';
import { use } from 'react';

import { useGetConcertDetail } from '@/app/concert/[id]/_shared/services/concert/query';
import Form from '@/app/concert/form/[id]/_shared/components/form/form';
import FormModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-modal';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';
import { useModal } from '@/shared/components/modal/use-modal';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';
import { TicketOpenType } from '@/shared/types';

import FormTabManager from './_shared/components/tab-button/manager/form-tab-manager';
import styles from './page.module.scss';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ticketOpenType?: string }>;
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const { id } = resolvedParams;
  const { open, closeTop } = useModal();

  const ticketOpenType = resolvedSearchParams.ticketOpenType as TicketOpenType;

  const { data: concertItem } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

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

  return (
    <>
      <AppBarSetter title="신청 양식" />

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
            />
          </>
        )}
      </div>
    </>
  );
}
