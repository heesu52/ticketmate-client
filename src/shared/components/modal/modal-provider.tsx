'use client';

import { Fragment } from 'react';

import { useModalStore } from '@/shared/components/modal/modal-store';

const ModalProvider = () => {
  const { modals } = useModalStore();
  return (
    <>
      {modals.map((modal) => (
        <Fragment key={modal.id}>{modal.content}</Fragment>
      ))}
    </>
  );
};

export default ModalProvider;
