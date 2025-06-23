'use client';

import React, { useState } from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import { useGetConcertList } from '@/app/_shared/services/query';
import { GetConcertListRequest } from '@/app/_shared/services/type';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import ConcertSelect from '../concert-select';
import styles from './concert-list.module.scss';

const ConcertList = () => {
  const [request, setRequest] = useState<GetConcertListRequest>({
    pageNumber: 1,
    pageSize: 10,
    sortField: 'created_date',
    sortDirection: 'DESC',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetConcertList(request);

  const { lastElementRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const handleSelect = (value: string) => {
    setRequest((prev) => ({
      ...prev,
      sortField: value,
      pageNumber: 1,
    }));
  };

  const concertList = data?.content;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.concert_container}>
          <div className={styles.title_contanier}>
            <span className={styles.title}>신청가능 공연</span>

            <div className={styles.select_container}>
              <ConcertSelect onSelect={handleSelect} />
            </div>
          </div>
          {concertList?.map((concertItem, index) => (
            <div
              key={concertItem.concertId}
              ref={
                index === concertList.length - 1 ? lastElementRef : undefined
              }
              className={styles.card_wrapper}
            >
              <ConcertCard concertItem={concertItem} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ConcertList;
