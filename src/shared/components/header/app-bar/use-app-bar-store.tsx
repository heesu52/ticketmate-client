import { create } from 'zustand';

interface AppBarState {
  isShow: boolean;
  title: string | null;
  backURL: string | null;
  setTitle: (title: string) => void;
  setbackURL: (backURL: string | null) => void;
}

export const useAppBarStore = create<AppBarState>((set) => ({
  isShow: false,
  title: null,
  backURL: null,
  setTitle: (title) => {
    set({ title });
    set((state) => ({ isShow: title !== null }));
  },
  setbackURL: (backURL) => set({ backURL }),
}));
