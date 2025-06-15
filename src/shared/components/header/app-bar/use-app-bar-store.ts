import { create } from 'zustand';

interface AppBarStore {
  hasAppBar: boolean;
  setHasAppBar: (hasAppBar: boolean) => void;
}

export const useAppBarStore = create<AppBarStore>((set) => ({
  hasAppBar: false,
  setHasAppBar: (hasAppBar) => set({ hasAppBar }),
}));
