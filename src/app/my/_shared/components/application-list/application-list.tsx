'use client';

import ApplicationCard from '@/app/my/_shared/components/application-list/application-card/application-card';

import styles from './application-list.module.scss';

const ApplicationList = () => {
  return (
    <>
      <div className={styles.container}>
        <ApplicationCard />
        <ApplicationCard />
      </div>
    </>
  );
};

export default ApplicationList;
