'use client';

import SearchIcon from '@/assets/icons/search.svg';
import Input from '@/shared/components/input/input';

import styles from './concert-list.module.scss';

const concert = [
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '10명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '30명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '5명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '1명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '100명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '5명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '1명',
    img: 'https://placehold.co/400x600',
  },
  {
    title: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’',
    date: '24년 11월 25일(월) 18:00',
    agent: '100명',
    img: 'https://placehold.co/400x600',
  },
];

const ConcertList = () => {
  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.input_container}>
        <Input
          placeholder="콘서트 이름을 입력하세요."
          label="콘서트명"
          id="concert"
          type="text"
          iconProps={{
            icon: <SearchIcon width={20} height={20} fill={'var(--gray-4)'} />,
            position: 'left',
          }}
        />
      </div>

      {/* 리스트 */}
      <div className={styles.concert_container}>
        <span className={styles.title}>신청 가능한 콘서트</span>
        {concert.map((item, index) => (
          <div className={styles.concert} key={index}>
            <div className={styles.concert_img}>
              <img src={item.img} alt="concert" width={104} height={139} />
            </div>
            <div className={styles.concert_info}>
              <div className={styles.description}>
                <span className={styles.date}>{item.date}</span>
                <span className={styles.title}>{item.title}</span>
              </div>
              <div className={styles.agent}>
                <span className={styles.agent_label}>대리인 수</span>
                <span className={styles.agent_count}>{item.agent}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertList;
