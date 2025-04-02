// hooks/useModal.ts
import { useCallback } from 'react';

import { ModalKey } from '@/shared/components/modal/modal-keys';
import { useModalStore } from '@/shared/components/modal/modal-store';

interface ModalOptions {
  key?: ModalKey | string; // 모달 키 (정의된 키 또는 동적)
  props?: Record<string, unknown>;
}

export const useModal = () => {
  const { openModal, closeModal, closeTopModal, closeAllModals } =
    useModalStore();

  const open = useCallback(
    ({ key, props }: ModalOptions) => {
      const id = key || crypto.randomUUID(); // key가 없으면 자동 생성
      return openModal({ id, props });
    },
    [openModal],
  );

  const close = useCallback((key: string) => closeModal(key), [closeModal]);
  const closeTop = useCallback(() => closeTopModal(), [closeTopModal]);
  const closeAll = useCallback(() => closeAllModals(), [closeAllModals]);

  return { open, close, closeTop, closeAll };
};
