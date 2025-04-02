import React, { Suspense } from 'react';

import { ModalKey, MODAL_KEYS } from '@/shared/components/modal/modal-keys';
import { useModal } from '@/shared/components/modal/use-modal';

const ExampleModal = React.lazy(
  () => import('@/app/example/_shared/components/example-modal/example-modal'),
);

interface ModalContentProps {
  modalKey: ModalKey | string;
  props?: Record<string, unknown>;
}

const ModalContent: React.FC<ModalContentProps> = ({ modalKey, props }) => {
  const { closeTop } = useModal();

  switch (modalKey) {
    case MODAL_KEYS.EXAMPLE:
      return (
        <Suspense fallback={<div>로딩 중...</div>}>
          <ExampleModal {...props} />
        </Suspense>
      );
    default:
      return (
        <div>
          <h1>알 수 없는 모달</h1>
          <p>정의되지 않은 모달입니다: {modalKey}</p>
          <button onClick={closeTop}>닫기</button>
        </div>
      );
  }
};

export default ModalContent;
