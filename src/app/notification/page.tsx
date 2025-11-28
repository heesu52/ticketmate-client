'use client';

import { useState } from 'react';

import { ArrowRightIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function Notification() {
  const [readAlaram, setReadAlaram] = useState<boolean[]>(Array(5).fill(false));

  const handleClick = (index: number) => {
    setReadAlaram((prev) => prev.map((item, i) => (i === index ? true : item)));
  };

  return (
    <PageFrame appBar={{ title: '알림', showBack: true }} bottomNav={false}>
      <div className={styles.container}>
        <div className={styles.list_container}>
          {readAlaram.map((isRead, index) => (
            <div
              key={index}
              className={`${styles.notification_container} ${
                isRead ? styles.read : ''
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.title}>의뢰가 수락되었어요</span>
                  <span className={styles.notification_icon} />
                </div>

                <span className={styles.message}>
                  의문의 대리인님이 의뢰를 수락했어요. 지금부터 채팅을
                  시작해보세요.
                </span>
              </div>

              <div className={styles.footer}>
                <span className={styles.time}>21:32</span>
                <div className={styles.button}>
                  <span className={styles.button_label}>채팅하기</span>
                  <ArrowRightIcon width={16} height={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
