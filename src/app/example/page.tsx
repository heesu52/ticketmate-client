'use client';

import { lazy } from 'react';

import { toast } from 'react-toastify';

import ExampleDropdown from '@/app/example/_shared/components/example-dropdown/example-dropdown';
import { useModal } from '@/shared/components/modal/use-modal';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';

import styles from './page.module.scss';

const dropdownList = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2 (비활성화)', disabled: true },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
];

const ExampleModal = lazy(
  () => import('@/app/example/_shared/components/example-modal/example-modal'),
);

function Page() {
  const { open, closeTop } = useModal();

  const handleOpenModal = () => {
    open({
      id: 'example-modal',
      content: (
        <ExampleModal
          title="Lazy 모달"
          message="이 모달은 lazy하게 import해오는 모달입니다."
          onConfirm={async () => {
            console.log('확인됨');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('작업 완료');
            closeTop();
          }}
          onCancel={() => {
            console.log('취소됨');
            closeTop();
          }}
        />
      ),
    });
  };

  const notify = () => toast('Wow so easy!');
  const custom = () =>
    customToast({
      description: 'Wow so easy!',
    });

  return (
    <>
      <button className={styles.button} onClick={handleOpenModal}>
        예시 모달 클릭하기
      </button>
      <ExampleDropdown dropdownList={dropdownList} />
      <button onClick={notify}>asd</button>
      <button onClick={custom}>custom</button>
    </>
  );
}

export default Page;
