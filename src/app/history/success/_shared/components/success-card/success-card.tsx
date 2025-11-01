'use client';

import Image from 'next/image';

import styles from './success-card.module.scss';

const SuccessCard = () => {
  return (
    <div className={styles.container}>
      <Image
        src={'/placeholder-concert.png'}
        alt={'공연썸네일이미지'}
        width={115}
        height={115}
      />
    </div>
  );
};
export default SuccessCard;
