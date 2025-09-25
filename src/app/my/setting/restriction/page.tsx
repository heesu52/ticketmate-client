import PageFrame from '@/shared/components/layout/page-frame/page-frame';

import styles from './page.module.scss';

const RestrictionPage = () => {
  const exampleList = [
    {
      date: '2025-01-01',
      duration: '30일',
      reason: '테스트',
    },
    {
      date: '2025-01-02',
      duration: '1일',
      reason: '테스트',
    },
  ];

  return (
    <PageFrame
      appBar={{
        title: '제재 내역',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.restriction_container}>
          {exampleList.map((item) => {
            return (
              <div className={styles.item} key={item.date}>
                <div className={styles.content}>
                  <div className={styles.title}>제한일시</div>
                  <div className={styles.content}>{item.date}</div>
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>제한기간</div>
                  <div className={styles.content}>{item.duration}</div>
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>제한사유</div>
                  <div className={styles.content} data-accent={true}>
                    {item.reason}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
};

export default RestrictionPage;
