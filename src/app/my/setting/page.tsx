import Link from 'next/link';

import {
  SERVICE_INFO_ITEMS,
  SETTING_ITEMS,
} from '@/app/my/setting/_shared/constants/menu-items';
import { ArrowRightIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const SettingPage = () => {
  return (
    <PageFrame
      appBar={{
        title: '설정',
        backHref: '/my',
        showBack: true,
      }}
    >
      <div className={styles.container}>
        <div className={styles.setting_container}>
          <div className={styles.title}>설정</div>
          <div className={styles.content}>
            {SETTING_ITEMS.map((item) => {
              return item.type === 'link' ? (
                <Link href={item.href} key={item.title} className={styles.item}>
                  <span className={styles.item_title}>{item.title}</span>
                  <div className={styles.item_trailing_container}>
                    {item.trailing && (
                      <span className={styles.item_trailing}>
                        {item.trailing}
                      </span>
                    )}
                    <ArrowRightIcon
                      width={12}
                      height={12}
                      fill="var(--grayscale-500)"
                    />
                  </div>
                </Link>
              ) : (
                <div className={styles.item} key={item.title}>
                  <span className={styles.item_title}>{item.title}</span>
                  <div className={styles.item_trailing_container}>
                    {item.trailing && (
                      <span className={styles.item_trailing}>
                        {item.trailing}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Spacer size={40} />

        <div className={styles.setting_container}>
          <div className={styles.title}>서비스 정보</div>
          <div className={styles.content}>
            {SERVICE_INFO_ITEMS.map((item) => {
              return item.type === 'link' ? (
                <Link href={item.href} key={item.title} className={styles.item}>
                  <span className={styles.item_title}>{item.title}</span>
                  <div className={styles.item_trailing_container}>
                    {item.trailing && (
                      <span className={styles.item_trailing}>
                        {item.trailing}
                      </span>
                    )}
                    <ArrowRightIcon
                      width={12}
                      height={12}
                      fill="var(--grayscale-500)"
                    />
                  </div>
                </Link>
              ) : (
                <div className={styles.item} key={item.title}>
                  <span className={styles.item_title}>{item.title}</span>
                  <div className={styles.item_trailing_container}>
                    {item.trailing && (
                      <span className={styles.item_trailing}>
                        {item.trailing}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default SettingPage;
