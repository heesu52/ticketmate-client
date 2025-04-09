'use client';

import React from 'react';

import ConcertCard from '@/app/_components/concert/concert-card/concert-card';
import { FilterListIcon } from '@/assets/icons';

import ConcertDropdown from '../concert-dropdown';
import styles from './concert-list.module.scss';

const concert = [
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '2025.01.25 ~ 2025.02.01 ',
    place: '블루스퀘어 마스터카드홀',
    img: 'https://placehold.co/400x600',
  },
];

const dropdownList = [
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
  return (
    <>
      <div className={styles.container}>
        {/* 리스트 */}
        <div className={styles.concert_container}>
          <div className={styles.title_contanier}>
            <span className={styles.title}>신청가능 공연</span>

            <div className={styles.dropdown_container}>
              <ConcertDropdown dropdownList={dropdownList} />
              <FilterListIcon width={20} height={20} />
            </div>
          </div>
          {concert.map((concertItem) => (
            <ConcertCard concertItem={concertItem} key={concertItem.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ConcertList;
