'use client';

import { toast } from 'react-toastify';

import ExampleDropdown from '@/app/example/_shared/components/example-dropdown/example-dropdown';
import { MODAL_KEYS } from '@/shared/components/modal/modal-keys';
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

function Page() {
  const { open } = useModal();

  const handleOpenModal = () => {
    open({
      key: MODAL_KEYS.EXAMPLE,
      props: {
        title: '커스텀 예시 모달',
        message: '이 모달은 동기적으로 동작합니다.',
        onConfirm: async () => {
          console.log('확인됨');
          await new Promise((resolve) => setTimeout(resolve, 0));
          console.log('비동기 작업 완료');
          // 다음 동작
          console.log('다음 동작 시작');
        },
        onCancel: () => console.log('취소됨'),
      },
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
