'use client';
import { use } from 'react';

import AppBar from '@/shared/components/header/app-bar/app-bar';
import { TicketOpenType } from '@/shared/types';

import Form from './_shared/components/form/form';
import styles from './page.module.scss';
import { useGetConcertDetail } from '../../[id]/_shared/services/query';

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

  const ticketOpenType = resolvedSearchParams.ticketOpenType as TicketOpenType;

  const { data: concertItem } = useGetConcertDetail(
    id ? { concertId: id } : undefined,
  );

  return (
    <>
      <AppBar title="공연 신청" />

      <div className={styles.container}>
        {concertItem && (
          <Form
            concertItem={concertItem}
            ticketOpenType={ticketOpenType}
            concertId={id}
          />
        )}
      </div>
    </>
  );
}
