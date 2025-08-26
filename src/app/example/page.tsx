'use client';

import { lazy, useState } from 'react';

import { toast } from 'react-toastify';

import ExampleSelect from '@/app/example/_shared/components/example-select/example-select';
import { MoreIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import Dropdown from '@/shared/components/dropdown/dropdown';
import { useModal } from '@/shared/components/modal/use-modal';
import RadioGroup from '@/shared/components/radio/radio';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';
import Select from '@/shared/components/ui/select/select';

import styles from './page.module.scss';

const selectList = [
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
  const [selectedValue, setSelectedValue] = useState<string | null>('option1');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    console.log('선택된 값:', value);
  };
  return (
    <>
      <button className={styles.button} onClick={handleOpenModal}>
        예시 모달 클릭하기
      </button>
      <ExampleSelect selectList={selectList} />
      <Button onClick={notify}>기본 toast</Button>
      <Button onClick={custom}>커스텀 toast</Button>
      <div>
        {/* RadioGroup 사용 */}
        <RadioGroup
          name="options"
          value={selectedValue}
          onChange={handleChange}
        >
          <RadioGroup.Radio value="option1" label="옵션 1" />
          <RadioGroup.Radio value="option2" label="옵션 2" disabled />
          <RadioGroup.Radio value="option3" label="옵션 3" />
          <RadioGroup.RadioInput placeholder="직접 입력" />
        </RadioGroup>

        <Dropdown label="example드롭다운">
          <Dropdown.Trigger>
            <MoreIcon width={20} height={20} fill="var(--black)" />
          </Dropdown.Trigger>
          <Dropdown.Content listMinWidth="200px">
            <Dropdown.Item onClick={() => console.log('테스트1')}>
              <span>테스트1</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('테스트2')}>
              <span>테스트2</span>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <p>선택된 값: {selectedValue || '없음'}</p>

      <Select
        options={selectList}
        value={selectedValue || ''}
        onValueChange={handleChange}
        variant="filter"
      />

      <Select
        options={selectList}
        value={selectedValue || ''}
        onValueChange={handleChange}
        variant="form"
      />
    </>
  );
}

export default Page;
