import Image from 'next/image';
import Link from 'next/link';

import { SettingIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const MyPage = () => {
  return (
    <PageFrame
      appBar={{
        title: '마이페이지',
        right: (
          <Link href="/my/setting" className={styles.my_setting}>
            <SettingIcon width={20} height={20} />
          </Link>
        ),
      }}
    >
      <div className={styles.container}>
        <div className={styles.profile_container}>
          <div className={styles.info_container}>
            <Image
              className={styles.profile_image}
              src="https://picsum.photos/81/81"
              alt="profile"
              width={81}
              height={81}
            />

            <div className={styles.info_content}>
              <span className={styles.name}>홍길동</span>
              <Spacer size={4} />
              <span className={styles.introduction}>잘 부탁드립니다!!</span>
              <Spacer size={15} />
              <span className={styles.follow_container}>
                <span className={styles.text}>팔로잉</span>
                <span className={styles.count}>100</span>
              </span>
            </div>
          </div>
          <Button variant="outline" color="gray">
            프로필 편집
          </Button>
        </div>

        <Spacer size={40} />

        {/* <div className={styles.history_container}>
          <div className={styles.title_container}>
            <span className={styles.title}>최근 성공 신청내역</span>
            <Link href="" className={styles.link}>
              전체보기
            </Link>
          </div>
        </div> */}
      </div>
    </PageFrame>
  );
};

export default MyPage;
