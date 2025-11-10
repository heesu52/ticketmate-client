'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ApplicationList from '@/app/my/_shared/components/application-list';
import { SettingIcon } from '@/assets/icons';
import { NoRegisterImage } from '@/assets/images';
import RecentSuccessList from '@/shared/components/features/recent-success/recent-success-list/recent-success-list';
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
                data-has-introduction={member?.introduction ? 'true' : 'false'}
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

        {member?.memberType === 'AGENT' && (
          <>
            <Spacer size={40} />

            <div className={styles.application_container}>
              <div className={styles.title_container}>
                <span className={styles.title}>신청공연 관리</span>
                <Link href="/my/application" className={styles.link}>
                  관리하기
                </Link>
              </div>
              <ApplicationList />
            </div>
          </>
        )}
        <Spacer size={40} />

        <div className={styles.history_container}>
          <div className={styles.title_container}>
            <span className={styles.title}>최근 성공 신청내역</span>
            <Link href="/my/success" className={styles.link}>
              전체보기
            </Link>
          </div>

          <RecentSuccessList />
          {/* 성공신청내역이 없을 때 */}
          {/* 추후 api 연동 후 recentsuccesscard가 없을 때 최근성공내역없음 버튼이 보일 예정 */}
          <div className={styles.empty_container}>최근 성공내역 없음</div>
        </div>
      </div>
    </PageFrame>
  );
};

export default MyPage;
