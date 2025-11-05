import classNames from 'classnames/bind';
import Link from 'next/link';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';
import NaverLogoIcon from '@/assets/icons/naver_logo.svg';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';
const cn = classNames.bind(styles);

export default function Page() {
  const NAVER_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
  const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;

  return (
    <PageFrame
      appBar={{
        title: '로그인',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.title_container}>
          <span className={styles.title}>로그인</span>
          <span className={styles.sub_title}>
            로그인이 필요한 서비스입니다.
          </span>
        </div>

        <Spacer size={24} />

        <div className={styles.social_container}>
          <Link
            className={cn(styles.social_button, styles.naver)}
            href={NAVER_AUTH_URL}
          >
            <NaverLogoIcon width={16} height={16} />
            <span className={cn(styles.social_text, styles.naver)}>
              네이버 로그인
            </span>
          </Link>
          <Link
            className={cn(styles.social_button, styles.kakao)}
            href={KAKAO_AUTH_URL}
          >
            <KakaoLogoIcon width={16} height={16} />
            <span className={cn(styles.social_text, styles.kakao)}>
              카카오 로그인
            </span>
          </Link>
        </div>

        <div className={styles.etc_container}>
          <Link className={styles.look_around} href="/">
            둘러보기
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
