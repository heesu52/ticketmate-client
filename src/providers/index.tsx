import React, { type ReactNode } from 'react';

import ContextProvider from '@/providers/context-provider';
import HeadProvider from '@/providers/head-provider';
import ReactQueryProviders from '@/providers/react-query-provider';
import ReactToastProvider from '@/providers/react-toast-provider';
import StackModalProvider from '@/providers/stack-modal-provider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeadProvider />
      <ReactQueryProviders>
        <ContextProvider>
          {children}
          <StackModalProvider />
          <ReactToastProvider />
        </ContextProvider>
      </ReactQueryProviders>
    </>
  );
};

export default Provider;
