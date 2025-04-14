'use client';

import Link from 'next/link';

import Badge from '@/shared/components/badge/badge';
import FormTabManager from '@/shared/components/button/form-tab-button/form-tab-manager';
import Button from '@/shared/components/button/functional-button/functional-button';

import styles from './form.module.scss';

export default function Form() {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.tag}>
          <Badge type="type-a">일반예매</Badge>
          <Badge type="type-b">무통장 가능</Badge>
        </div>
        <div className={styles.title}>
          터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
        </div>
        <div className={styles.info_container}>
          <div className={styles.image}>
            {/* 추후 next의 Image 로 변경 예정 */}
            <img
              src={'https://placehold.co/400x600'}
              alt="터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ"
              width={140}
              height={186}
            />
            <span>좌석배치도</span>
          </div>
          <div className={styles.detail_container}>
            <div className={styles.detail}>
              <span className={styles.category}>공연 일자</span>
              <span className={styles.info}>24/08/27 ~ 24/09/26</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>공연장</span>
              <span className={styles.info}>올림픽공원 핸드볼 경기장</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>예매처</span>
              <Link className={styles.link} href="https://ticket.yes24.com">
                YES24
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FormTabManager />
      <Button type="button" size="large" variant="fill">
        신청하기
      </Button>
    </div>
  );
}
