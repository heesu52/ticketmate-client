import { useCallback, ReactNode } from 'react';

import { useModalStore } from './modal-store';

interface ModalOptions {
  content: ReactNode;
  id?: string;
}

export const useModal = () => {
  const { openModal, closeModal, closeTopModal, closeAllModals } =
    useModalStore();

  const open = useCallback(
    ({ content, id }: ModalOptions) => {
      const modalId = id || crypto.randomUUID();
      return openModal({ id: modalId, content });
    },
    [openModal],
  );

  const close = useCallback((id: string) => closeModal(id), [closeModal]);

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
