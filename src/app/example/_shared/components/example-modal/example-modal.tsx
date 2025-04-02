'use client';

import React from 'react';

import classNames from 'classnames/bind';

import { useModal } from '@/shared/components/modal/use-modal';

import styles from './example-modal.module.scss';

const cn = classNames.bind(styles);

interface ExampleModalProps {
  title?: string;
  message?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}

const ExampleModal: React.FC<ExampleModalProps> = ({
  title = 'Example Modal',
  message = '이것은 예시 모달입니다.',
  onConfirm,
  onCancel,
}) => {
  const { closeTop } = useModal();

  const handleConfirm = () => {
    console.log('확인 버튼 클릭');
    if (onConfirm) {
      Promise.resolve(onConfirm()).then(() => {
        closeTop().then(() => {
          console.log('모달 닫기 완료 후 다음 동작');
        });
      });
    } else {
      closeTop();
    }
  };

  const handleCancel = () => {
    console.log('취소 버튼 클릭');
    if (onCancel) onCancel();
    closeTop();
  };

  return (
    <div className={cn('example_modal_content')}>
      <h1 className={cn('modal_title')}>{title}</h1>
      <p className={cn('modal_message')}>{message}</p>
      <div className={cn('modal_actions')}>
        <button
          type="button"
          onClick={handleConfirm}
          className={cn('modal_button', 'confirm')}
        >
          확인
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={cn('modal_button', 'cancel')}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ExampleModal;
