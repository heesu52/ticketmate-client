'use client';

import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';

import Form from './[id]/_shared/components/form/form';
import styles from './page.module.scss';

export default function Page() {
  return (
    <>
      <AppBarSetter title="신청 양식" />

      <div className={styles.container}>
        <Form />
      </div>
    </>
  );
}
