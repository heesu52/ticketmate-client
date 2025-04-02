import { useCallback } from 'react';

import { ModalKey } from '@/shared/components/modal/modal-keys';
import { useModalStore } from '@/shared/components/modal/modal-store';

interface ModalOptions {
  key?: ModalKey | string;
  props?: Record<string, unknown>;
}

export const useModal = () => {
  const { openModal, closeModal, closeTopModal, closeAllModals } =
    useModalStore();

  const open = useCallback(
    ({ key, props }: ModalOptions) => {
      const id = key || crypto.randomUUID();
      return openModal({ id, props });
    },
    [openModal],
  );

  const close = useCallback((key: string) => closeModal(key), [closeModal]);

  const closeTop = useCallback(
    () =>
      new Promise<void>((resolve) => {
        closeTopModal();
        setTimeout(resolve, 0);
      }),
    [closeTopModal],
  );

  const closeAll = useCallback(() => closeAllModals(), [closeAllModals]);

  return { open, close, closeTop, closeAll };
};
