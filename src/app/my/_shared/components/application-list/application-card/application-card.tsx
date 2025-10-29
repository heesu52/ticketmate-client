'use client';

import { useState } from 'react';

import Image from 'next/image';

import { MyIcon } from '@/assets/icons';
import Toggle from '@/shared/components/ui/toggle/toggle';

import styles from './application-card.module.scss';

const ApplicationCard = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={'/naver'}
        alt={'공연썸네일이미지'}
        width={48}
        height={48}
      />
      <div className={styles.footer_container}>
        <div className={styles.count_container}>
          <span className={styles.icon}>
            <MyIcon width={12} height={12} fill="var(--grayscale-100)" />
          </span>
          <span className={styles.count}>4</span>
        </div>

        <div className={styles.toggle}>
          <Toggle pressed={isEnabled} onPressedChange={setIsEnabled} />
        </div>
      </div>
    </div>
  );
};
export default ApplicationCard;
