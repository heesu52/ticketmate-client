'use client';

import React from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';

import styles from './concert-list.module.scss';

const concert = [
  {
    title: '2터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '10명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '3터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '30명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '4터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '5명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '5터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '1명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '6터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '100명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '7터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '5명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '8터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '1명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '9터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '100명',
    img: 'https://placehold.co/400x600',
  },
];

const ConcertList = () => {
  return (
    <>
      <div className={styles.container}>
        {/* 리스트 */}
        <div className={styles.concert_container}>
          <span className={styles.title}>신청가능 공연</span>

          {concert.map((concertItem) => (
            <ConcertCard concertItem={concertItem} key={concertItem.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ConcertList;
