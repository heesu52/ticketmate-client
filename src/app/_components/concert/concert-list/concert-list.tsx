'use client';

import React, { useState } from 'react';

import { useGetConcertList } from '@/app/_shared/services/query';
import { GetConcertListRequest } from '@/app/_shared/services/type';
import ConcertCard from '@/shared/components/features/concert/concert-card/concert-card';
import Select from '@/shared/components/ui/select/select';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import styles from './concert-list.module.scss';

const options = [
  {
    value: 'CREATED_DATE',
    label: '최신순',
  },
  {
    value: 'TICKET_OPEN_DATE',
    label: '오픈일순',
  },
];

const ConcertList = () => {
  const [request, setRequest] = useState<GetConcertListRequest>({
    pageNumber: 1,
    pageSize: 10,
    sortField: 'CREATED_DATE',
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
    setRequest((prev) => {
      if (value === 'TICKET_OPEN_DATE') {
        return {
          ...prev,
          sortField: 'TICKET_OPEN_DATE',
          sortDirection: 'ASC',
          pageNumber: 1,
        };
      }

      return {
        ...prev,
        sortField: 'CREATED_DATE',
        sortDirection: 'DESC',
        pageNumber: 1,
      };
    });
  };

  const concertList = data?.content;

  return (
    <div className={styles.container}>
      <div className={styles.concert_container}>
        <div className={styles.title_container}>
          <span className={styles.title}>신청가능 공연</span>

          <div className={styles.select_container}>
            <Select
              options={options}
              value={request.sortField || ''}
              onValueChange={(value: string) => handleSelect(value)}
              variant="filter"
            />
          </div>
        </div>

        {concertList?.map((concertItem, index) => (
          <div
            key={concertItem.concertId}
            ref={index === concertList.length - 1 ? lastElementRef : undefined}
            className={styles.card_wrapper}
          >
            <ConcertCard concertItem={concertItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertList;
