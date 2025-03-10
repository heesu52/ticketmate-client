'use client';

import classNames from 'classnames/bind';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';
import NaverLogoIcon from '@/assets/icons/naver_logo.svg';

import styles from './social-login.module.scss';

const cn = classNames.bind(styles);

const SocialLogin = () => {
  const handleSocialLogin = (provider: 'naver' | 'kakao') => {
    let authUrl = '';

    if (provider === 'naver') {
      authUrl = `https://api.ticketmate.site/oauth2/authorization/naver`;
    } else if (provider === 'kakao') {
      authUrl = `https://api.ticketmate.site/oauth2/authorization/kakao`;
    }

    window.location.href = authUrl;
  };

  return (
    <div className={styles.container}>
      <button
        className={cn(styles.social_button, styles.naver)}
        onClick={() => handleSocialLogin('naver')}
      >
        <NaverLogoIcon width={16} height={16} />
        <span className={cn(styles.social_text, styles.naver)}>
          네이버 로그인
        </span>
      </button>
      <button
        className={cn(styles.social_button, styles.kakao)}
        onClick={() => handleSocialLogin('kakao')}
      >
        <KakaoLogoIcon width={16} height={16} />
        <span className={cn(styles.social_text, styles.kakao)}>
          카카오 로그인
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
