'use client';

import React from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import { useGetConcertList } from '@/app/_shared/services/query';

import ConcertSelect from '../concert-select';
import styles from './concert-list.module.scss';

const selectList = [
  {
    value: 'popularity',
    label: '인기순',
  },
  {
    value: 'latest',
    label: '날짜순',
  },
];

const ConcertList = () => {
  const { data } = useGetConcertList();

  const concertList = data?.content;

  return (
    <>
      <div className={styles.container}>
        {/* 리스트 */}
        <div className={styles.concert_container}>
          <div className={styles.title_contanier}>
            <span className={styles.title}>신청가능 공연</span>

            <div className={styles.select_container}>
              <ConcertSelect selectList={selectList} />
            </div>
          </div>
          {concertList?.map((concertItem, index) => (
            <ConcertCard concertItem={concertItem} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ConcertList;
