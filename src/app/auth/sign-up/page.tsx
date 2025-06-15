import SignUpForm from '@/app/auth/sign-up/_components/sign-up-form';

import styles from './page.module.scss';

export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
