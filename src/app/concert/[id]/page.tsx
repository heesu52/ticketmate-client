'use client';

import Link from 'next/link';

import AppBarSetter from '@/shared/components/header/app-bar/app-bar-setter';

import UserCard from './_components/user-card/user-card';
import styles from './page.module.scss';

export default function Page() {
  /*
  const [ref, inView] = useInView();
  
  const handleGetCard ();

  const {data, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({pageParam = 0}) => handleGetCard(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length*10 : undefined;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage()
}, [inView]);
*/

  return (
    <>
      <AppBarSetter title="콘서트 상세 페이지" />

      <div className={styles.container}>
        <div className={styles.title_container}>
          <div className={styles.title}>
            터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
          </div>

          <div className={styles.detail_container}>
            <div className={styles.detail}>
              <span className={styles.category}>일자</span>
              <span className={styles.info}>24/08/27 ~ 24/09/26</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>장소</span>
              <span className={styles.info}>올림픽공원 핸드볼 경기장</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>예매처</span>
              <span className={styles.info}>YES24</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>무통장입금</span>
              <span className={styles.info}>가능</span>
            </div>

            <Link className={styles.link} href="/">
              정보 자세히 보기
            </Link>
          </div>
        </div>

        <hr className={styles.line} />
        <div className={styles.list_container}>
          <span className={styles.subtitle}>대리구매자 목록</span>
          <UserCard />
        </div>
      </div>
    </>
  );
}
