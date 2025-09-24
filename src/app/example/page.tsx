'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';

import InputModal from '@/app/example/_shared/components/example-modals/input-modal';
import ExampleSelect from '@/app/example/_shared/components/example-select/example-select';
import { MoreIcon } from '@/assets/icons';
import Button from '@/shared/components/button/functional-button/functional-button';
import Dropdown from '@/shared/components/dropdown/dropdown';
import RadioGroup from '@/shared/components/radio/radio';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import Select from '@/shared/components/ui/select/select';

import styles from './page.module.scss';

const selectList = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2 (비활성화)', disabled: true },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
];

function Page() {
  const { open, close } = useModalStore();

  // InputModal 사용 예시 함수들
  const handleOpenInputModal = async () => {
    try {
      const result = await open('input-modal', InputModal, {
        title: '이름 입력',
        description: '사용자 이름을 입력해주세요.\nasdasdasd',
        placeholder: '이름을 입력하세요',
        initialValue: '',
        firstButtonLabel: '취소',
      });
      console.log('모달 결과:', result);
      toast(`입력 완료: ${result}`);
    } catch (error) {
      console.log('모달 취소됨:', error);
    }
  };

  const handleOpenEmailModal = async () => {
    try {
      const result = await open('email-modal', InputModal, {
        title: '이메일 주소',
        description: '이메일 주소를 입력해주세요.',
        placeholder: 'example@email.com',
        firstButtonLabel: '닫기',
        secondButtonLabel: '저장',
      });
      console.log('이메일 모달 결과:', result);
      toast(`이메일 저장됨: ${result}`);
    } catch (error) {
      console.log('이메일 모달 취소됨:', error);
    }
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
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button className={styles.button} onClick={handleOpenInputModal}>
          이름 입력 모달
        </button>
        <button className={styles.button} onClick={handleOpenEmailModal}>
          이메일 입력 모달
        </button>
      </div>
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
