import classNames from 'classnames/bind';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';
import TicketMateLogoIcon from '@/assets/icons/main_logo.svg';
import NaverLogoIcon from '@/assets/icons/naver_logo.svg';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <span className={styles.sub_title}>원하는 티켓, 원하는 순간</span>
          <TicketMateLogoIcon
            role="img"
            aria-hidden="true"
            width={184}
            height={40}
          />
        </div>

        <div className={styles.social_container}>
          <button className={cn(styles.social_button, styles.naver)}>
            <NaverLogoIcon width={24} height={24} />
            <span className={cn(styles.social_text, styles.naver)}>
              네이버로 시작하기
            </span>
          </button>
          <button className={cn(styles.social_button, styles.kakao)}>
            <KakaoLogoIcon width={24} height={24} />
            <span className={cn(styles.social_text, styles.kakao)}>
              카카오로 시작하기
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
