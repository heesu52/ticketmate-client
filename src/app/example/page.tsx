'use client';

import { useRef } from 'react';

import ExampleDropdown from '@/app/example/_shared/components/example-dropdown/example-dropdown';
import ExampleModal from '@/app/example/_shared/components/example-modal/example-modal';
import { DialogModalContextType } from '@/shared/components/modal/dialog-modal/dialog-modal';

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

  return (
    <>
      <button className={styles.button} onClick={handleOpenModal}>
        예시 모달 클릭하기
      </button>
      <ExampleDropdown dropdownList={dropdownList} />
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />{' '}
      <ExampleDropdown dropdownList={dropdownList} />
      <ExampleModal ref={exampleModalRef} />
    </>
  );
}

export default Page;
