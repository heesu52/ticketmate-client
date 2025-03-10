import Link from 'next/link';

import SocialLogin from '@/app/auth/sign-in/_shared/components/social-login/social-login';
import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';

import styles from './page.module.scss';

export default function Page() {
  return (
    <>
      <AppBarSetter title="로그인" isShowMoreButton={false} />

      <div className={styles.container}>
        <div className={styles.title_container}>
          <span className={styles.title}>로그인</span>
          <span className={styles.sub_title}>
            로그인이 필요한 서비스입니다.
          </span>
        </div>

        <div className={styles.social_container}>
          <SocialLogin />
        </div>

        <div className={styles.etc_container}>
          <Link className={styles.look_around} href="/">
            둘러보기
          </Link>
        </div>
      </div>
    </>
  );
}
