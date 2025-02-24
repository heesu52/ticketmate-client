'use client';

import React, { Ref } from 'react';

import DialogModal, {
  type DialogModalContextType,
} from '@/shared/components/modal/dialog-modal/dialog-modal';
import ModalPortal from '@/shared/utils/components/modal-portal';

import styles from './example-modal.module.scss';

interface ExampleModalProps {
  ref: Ref<DialogModalContextType>;
}

const ExampleModal = ({ ref }: ExampleModalProps) => {
  const handleButton = () => {
    console.log('버튼 클릭');
  };

  return (
    <ModalPortal>
      <DialogModal modalRef={ref}>
        <DialogModal.Content>
          <div className={styles.container}>
            <span className={styles.title}>테스트 모달입니다.</span>
            <p className={styles.content}>
              테스트 모달입니다. 테스트 모달입니다.
            </p>
          </div>
        </DialogModal.Content>
        <DialogModal.Action>
          <DialogModal.Button onClick={handleButton} buttonType="negative">
            취소
          </DialogModal.Button>
          <DialogModal.Button
            onClick={handleButton}
            buttonType="positive"
            buttonSize="medium"
          >
            확인
          </DialogModal.Button>
        </DialogModal.Action>
      </DialogModal>
    </ModalPortal>
  );
};

export default ExampleModal;
