import { ReactNode } from 'react';

import { create } from 'zustand';

interface AppBarStore {
  hasAppBar: boolean;
  appBarTitle: string;
  hasBackground: boolean;
  action: ReactNode | null;
  setAppBar: (options: {
    hasAppBar?: boolean;
    title?: string;
    hasBackground?: boolean;
    action?: ReactNode;
  }) => void;
}

export const useAppBarStore = create<AppBarStore>((set) => ({
  hasAppBar: false,
  appBarTitle: '',
  hasBackground: true,
  action: null,
  setAppBar: ({ title, ...rest }) =>
    set((state) => ({
      ...state,
      ...rest,
      appBarTitle: title ?? state.appBarTitle,
    })),
}));
