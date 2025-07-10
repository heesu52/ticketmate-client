'use client';

import React, { useState } from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import { useGetConcertList } from '@/app/_shared/services/query';
import { GetConcertListRequest } from '@/app/_shared/services/type';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { calculateDday } from '@/shared/utils/dates';

import ConcertSelect from '../concert-select';
import styles from './concert-list.module.scss';

const ConcertList = () => {
  const [request, setRequest] = useState<GetConcertListRequest>({
    pageSize: 10,
    sortField: 'CREATED_DATE',
    sortDirection: 'ASC',
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
    }));
  };

  const concertList = data?.content;
  //tickettype이 선예매만 존재하고 D+ 로 시작하는 공연은 제외하고 리스트에 출력
  const filteredConcertList = concertList?.filter((concert) => {
    if (concert.ticketPreOpenDate && !concert.ticketGeneralOpenDate) {
      const dday = calculateDday(concert.ticketPreOpenDate);

      if (dday.startsWith('D+')) {
        return false;
      }
      return true;
    }
    return true;
  });

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
          {filteredConcertList?.map((concertItem, index) => (
            <div
              key={concertItem.concertId}
              ref={
                index === filteredConcertList.length - 1
                  ? lastElementRef
                  : undefined
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
