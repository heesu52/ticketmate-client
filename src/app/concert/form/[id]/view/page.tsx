'use client';
import { use, useMemo } from 'react';

import FormInfo from '@/app/concert/form/[id]/_shared/components/form-info/form-info';
import FormTabManager from '@/app/concert/form/[id]/_shared/components/form-tab/form-tab-manager';
import { useGetFormDetail } from '@/app/concert/form/[id]/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { ApplicationFormStatus, TicketOpenType } from '@/shared/types';

import styles from './page.module.scss';

export default function Page({
  params,
  searchParams: searchParamsProps,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    agentId: string;
    type: TicketOpenType;
  }>;
}) {
  const resolvedParams = use(params);
  const { id: applicationFormId } = resolvedParams;
  const resolvedSearchParams = use(searchParamsProps);
  const { agentId, type } = resolvedSearchParams;

  // useLocation으로 navigate에서 넘어온 state 받기
  const { state } = useLocation<{
    applicationFormStatus: ApplicationFormStatus;
  }>();

  // 기존 신청폼일 경우 formItem 요청
  const { data: formItem } = useGetFormDetail({ applicationFormId });

  const concertItem = useMemo(
    () => formItem?.concertInfoResponse ?? null,
    [formItem],
  );

  // 에러 발생 시 토스트 알림
  const handleError = (message: string) => {
    // 읽기 전용이라 버튼 액션 없음
    console.error(message);
  };

  //  {
  //           "applicationFormId": "1069059c-c4c9-4e30-8507-133cade60ea2",
  //           "concertName": "Funk 전남 sons8300공연",
  //           "concertThumbnailUrl": "https://picsum.photos/1600/12005921a8d3-2433-4707-9aa4-5eb5c367036c",
  //           "agentNickname": "리본달린튤립-09c6",
  //           "clientNickname": "운율있는도마뱀-eac0",
  //           "submittedDate": "2025-10-11T01:33:48",
  //           "applicationFormStatus": "PENDING",
  //           "ticketOpenType": "PRE_OPEN"
  //       },

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
              handleOpenModal={() => {}}
              concertItem={concertItem} //새로운 신청폼 작성 시 공연정보
              formItem={formItem} //기존 신청폼 보여줄 시 공연데이터
              ticketOpenType={type}
              concertId={concertItem.concertId}
              agentId={agentId}
              onError={handleError}
              status={state?.applicationFormStatus} //분기처리를 위해 전달
            />
          </>
        )}
      </div>
    </PageFrame>
  );
}
