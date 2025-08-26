import ConcertList from '@/app/_components/concert/concert-list/concert-list';
import SearchButton from '@/app/_components/search-button/search-button';
import { MainLogoIcon as TicketMateLogoIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

export default function Home() {
  return (
    <PageFrame
      appBar={{
        title: (
          <TicketMateLogoIcon
            width={102}
            height={22}
            aria-hidden="true"
            aria-label="티켓메이트 로고"
          />
        ),
        right: <SearchButton />,
      }}
    >
      <div className={styles.container}>
        <ConcertList />
      </div>
    </PageFrame>
  );
}
