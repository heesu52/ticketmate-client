'use client';

import { useRef } from 'react';

import { toast } from 'react-toastify';

import ExampleDropdown from '@/app/example/_shared/components/example-dropdown/example-dropdown';
import ExampleModal from '@/app/example/_shared/components/example-modal/example-modal';
import { DialogModalContextType } from '@/shared/components/modal/dialog-modal/dialog-modal';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';

import styles from './page.module.scss';

const dropdownList = [
  {
    value: 'option1',
    label: '옵션 1',
  },
  {
    value: 'option2',
    label: '옵션 2 (비활성화)',
    disabled: true,
  },
  {
    value: 'option3',
    label: '옵션 3',
  },
  {
    value: 'option4',
    label: '옵션 4',
  },
  {
    value: 'option5',
    label: '옵션 5',
  },
];

function Page() {
  const exampleModalRef = useRef<DialogModalContextType>(null);

  const handleOpenModal = () => {
    exampleModalRef.current?.open();
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
      <ExampleModal ref={exampleModalRef} />
    </>
  );
}

export default Page;
