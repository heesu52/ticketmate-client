'use client';

import { useRouter } from 'next/navigation';

import LeftArrowIcon from '@/assets/icons/left_arrow.svg';
import MoreIcon from '@/assets/icons/more.svg';
import { useAppBarStore } from '@/shared/components/header/app-bar/use-app-bar-store';

import styles from './app-bar.module.scss';

const AppBar = () => {
  const { title, backURL } = useAppBarStore();
  const router = useRouter();

  const handleBack = () => {
    if (backURL) {
      router.push(backURL);
    } else {
      router.back();
    }
  };

  const handleMore = () => {
    console.log('more');
  };

  return (
    <div className={styles.container}>
      <button className={styles.back_button} onClick={handleBack}>
        <LeftArrowIcon
          className={styles.icon}
          width={16}
          height={16}
          fill="var(--gray-5)"
        />
        {title && <span className={styles.title}>{title}</span>}
      </button>

      <button className={styles.more_button} onClick={handleMore}>
        <MoreIcon
          className={styles.icon}
          width={16}
          height={16}
          fill="var(--gray-5)"
        />
      </button>
    </div>
  );
};

export default AppBar;
