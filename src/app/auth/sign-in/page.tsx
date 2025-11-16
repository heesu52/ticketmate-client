import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import KakaoLogoIcon from '@/assets/icons/logo_kakao.png';
import NaverLogoIcon from '@/assets/icons/logo_naver.png';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';
const cn = classNames.bind(styles);

export default function Page() {
  const NAVER_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/authorization/naver`;
  const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/authorization/kakao`;

  return (
    <PageFrame bottomNav={false}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <span className={styles.title}>안녕하세요!</span>
          <span className={styles.sub_title}>
            일부 서비스는 로그인 후 이용할 수 있어요.
            <br />내 티켓메이트와 함께 더 쉽고 안전하게 티켓팅하세요.
          </span>
        </div>

        <Spacer size={40} />

        <div className={styles.social_container}>
          <Link
            className={cn(styles.social_button, styles.naver)}
            href={NAVER_AUTH_URL}
          >
            <Image
              src={NaverLogoIcon.src}
              width={16}
              height={16}
              alt="네이버 로그인"
            />
            <span className={cn(styles.social_text, styles.naver)}>
              네이버 로그인
            </span>
          </Link>
          <Link
            className={cn(styles.social_button, styles.kakao)}
            href={KAKAO_AUTH_URL}
          >
            <Image
              src={KakaoLogoIcon.src}
              width={16}
              height={16}
              alt="카카오 로그인"
            />

            <span className={cn(styles.social_text, styles.kakao)}>
              카카오 로그인
            </span>
          </Link>
        </div>

        <div className={styles.etc_container}>
          <Link className={styles.look_around} href="/">
            로그인 없이 그냥 둘러볼래요
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
