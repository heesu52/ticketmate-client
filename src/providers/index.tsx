import { type ReactNode } from 'react';

import HeadProvider from '@/providers/head-provider';
import ReactQueryProviders from '@/providers/react-query-provider';
import ReactToastProvider from '@/providers/react-toast-provider';
import StackModalProvider from '@/providers/stack-modal-provider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeadProvider />
      <ReactQueryProviders>{children}</ReactQueryProviders>
      <StackModalProvider />
      <ReactToastProvider />
    </>
  );
};

export default Provider;
