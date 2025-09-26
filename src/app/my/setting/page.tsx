import {
  SERVICE_INFO_ITEMS,
  SETTING_ITEMS,
} from '@/app/my/setting/_shared/constants/menu-items';
import SettingItem from '@/shared/components/features/my/setting-item/setting-item';
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
              return <SettingItem key={item.title} {...item} />;
            })}
          </div>
        </div>

        <Spacer size={40} />

        <div className={styles.setting_container}>
          <div className={styles.title}>서비스 정보</div>
          <div className={styles.content}>
            {SERVICE_INFO_ITEMS.map((item) => {
              return <SettingItem key={item.title} {...item} />;
            })}
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default SettingPage;
