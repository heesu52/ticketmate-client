'use client';

import Image from 'next/image';
import Link from 'next/link';

import Badge from '@/shared/components/badge/badge';
import { useModal } from '@/shared/components/modal/use-modal';

import styles from './form.module.scss';
import FormModal from '../form-modal/form-modal';
import FormTabManager from '../tab-button/manager/form-tab-manager';

export default function Form() {
  const { open, closeTop } = useModal();
  const handleOpenModal = () => {
    open({
      id: 'form-modal',
      content: (
        <FormModal
          title="일반예매 신청이 완료되었습니다."
          message={`대리인이 수락하게 되면 매칭이 완료됩니다.\n매칭이 완료되면 채팅을 통해 이야기를 나눠보세요.`}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            closeTop();
          }}
          onCancel={() => {
            closeTop();
          }}
        />
      ),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.tag}>
          <Badge type="type-a">일반예매</Badge>
          <Badge type="type-b">무통장 가능</Badge>
        </div>
        <div className={styles.title}>
          터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
        </div>
        <div className={styles.info_container}>
          <div className={styles.image}>
            {/* 추후 next의 Image 로 변경 예정 */}
            <Image
              className={styles.image}
              src={'https://picsum.photos/1366/768'}
              alt="터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ"
              width={140}
              height={186}
            />
            <span>좌석배치도</span>
          </div>
          <div className={styles.detail_container}>
            <div className={styles.detail}>
              <span className={styles.category}>공연 일자</span>
              <span className={styles.info}>24/08/27 ~ 24/09/26</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>공연장</span>
              <span className={styles.info}>올림픽공원 핸드볼 경기장</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.category}>예매처</span>
              <Link className={styles.link} href="https://ticket.yes24.com">
                YES24
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FormTabManager handleOpenModal={handleOpenModal} />
    </div>
  );
}
