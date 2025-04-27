'use client';
import Image from 'next/image';
import Link from 'next/link';

import styles from './concert-info.module.scss';

const ConcertInfo = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <div className={styles.title}>
            터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
          </div>
          <Image
            className={styles.image}
            src={'https://picsum.photos/1366/768'}
            alt="터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ"
            width={48}
            height={48}
          />
        </div>

        <div className={styles.info_container}>
          <div className={styles.detail}>
            <span className={styles.category}>신청 일자</span>
            <span className={styles.info}>2025.01.24</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.category}>대리인</span>
            <span className={styles.info}>대리인 닉네임</span>
          </div>
        </div>

        <div className={styles.footer_container}>
          <Link className={styles.link} href={`/`}>
            신청 취소
          </Link>
          <span className={styles.info}>수락대기중</span>
        </div>
      </div>
    </>
  );
};

export default ConcertInfo;
