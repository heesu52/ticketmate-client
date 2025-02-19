import { type ReactNode } from 'react';

import HeadProvider from '@/providers/head-provider';
import ReactQueryProviders from '@/providers/react-query-provider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeadProvider />
      <ReactQueryProviders>{children}</ReactQueryProviders>
    </>
  );
};

export default Provider;
