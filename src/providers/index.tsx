import { type ReactNode } from 'react';

import HeadProvider from '@/providers/head-provider';
import ModalProvider from '@/providers/modal-provider';
import ReactQueryProviders from '@/providers/react-query-provider';
import ReactToastProvider from '@/providers/react-toast-provider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeadProvider />
      <ReactQueryProviders>{children}</ReactQueryProviders>
      <ModalProvider />
      <ReactToastProvider />
    </>
  );
};

export default Provider;
