import { ReactNode } from 'react';

import { create } from 'zustand';

interface AppBarStore {
  hasAppBar: boolean;
  appBarTitle: string;
  hasBackground: boolean;
  isDynamicColor: boolean;
  action: ReactNode | null;
  setAppBar: (options: {
    hasAppBar?: boolean;
    title?: string;
    hasBackground?: boolean;
    isDynamicColor?: boolean;
    action?: ReactNode;
  }) => void;
}

export const useAppBarStore = create<AppBarStore>((set) => ({
  hasAppBar: false,
  appBarTitle: '',
  hasBackground: true,
  isDynamicColor: false,
  action: null,
  setAppBar: (options) =>
    set((state) => ({
      ...state,
      ...options,
      appBarTitle: options.title ?? state.appBarTitle,
    })),
}));
