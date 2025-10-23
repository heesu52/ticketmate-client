'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SettingIcon } from '@/assets/icons';
import { NoRegisterImage } from '@/assets/images';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { useMember } from '@/shared/context/member-context';

import styles from './page.module.scss';

const MyPage = () => {
  const router = useRouter();

  const { member } = useMember();

  const handleProfileEdit = () => {
    router.push('/my/profile');
  };

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
              src={member?.profileUrl ?? NoRegisterImage}
              alt="profile"
              width={81}
              height={81}
            />

            <div className={styles.info_content}>
              <span className={styles.name}>{member?.nickname}</span>
              <Spacer size={4} />
              <Link
                href="/my/profile"
                className={styles.introduction}
                data-has-introduction={member?.introduction || 'false'}
              >
                {member?.introduction || '한 줄 소개를 입력해주세요.'}
              </Link>
              <Spacer size={15} />
              <span className={styles.follow_container}>
                <span className={styles.text}>팔로잉</span>
                <span className={styles.count}>{member?.followingCount}</span>
              </span>
            </div>
          </div>
          <Button variant="outline" color="gray" onClick={handleProfileEdit}>
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
