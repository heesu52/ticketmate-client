import Image from 'next/image';
import Link from 'next/link';

import {
  SERVICE_INFO_ITEMS,
  SETTING_ITEMS,
} from '@/app/my/_shared/constants/menu-items';
import { ArrowRightIcon, SettingIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
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
        <Link className={styles.profile_container} href="">
          <div className={styles.info}>
            <Image
              src="https://picsum.photos/48/48"
              alt="profile"
              className={styles.image}
              width={48}
              height={48}
              priority
            />
            <span className={styles.nickname}>의뢰인 닉네임</span>
          </div>

          <ArrowRightIcon width={16} height={16} />
        </Link>

        <Spacer size={20} />

        <div className={styles.info_container}>
          <Link className={styles.item} href="">
            <span className={styles.item_title}>성공 의뢰내역</span>
            <span className={styles.item_count}>12</span>
          </Link>
          <Link className={styles.item} href="">
            <span className={styles.item_title}>팔로잉</span>
            <span className={styles.item_count}>34</span>
          </Link>
        </div>

        <Spacer size={40} />

        <div className={styles.setting_container}>
          <div className={styles.title}>설정</div>
          <div className={styles.content}>
            {SETTING_ITEMS.map((item) => (
              <Link href={item.href} key={item.title} className={styles.item}>
                <span className={styles.item_title}>{item.title}</span>
                <ArrowRightIcon
                  width={16}
                  height={16}
                  fill="var(--grayscale-700)"
                />
              </Link>
            ))}
          </div>
        </div>

        <Spacer size={40} />

        <div className={styles.setting_container}>
          <div className={styles.title}>서비스 정보</div>
          <div className={styles.content}>
            {SERVICE_INFO_ITEMS.map((item) => (
              <Link href={item.href} key={item.title} className={styles.item}>
                <span className={styles.item_title}>{item.title}</span>
                <ArrowRightIcon
                  width={16}
                  height={16}
                  fill="var(--grayscale-700)"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default MyPage;
