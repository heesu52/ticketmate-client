import { create } from 'zustand';

export const AppBarColor = {
  default: 'default',
  white: 'white',
} as const;

interface AppBarState {
  isShow: boolean;
  title: string | null;
  backURL: string | null;
  isShowMoreButton: boolean;
  color: keyof typeof AppBarColor;
  setTitle: (title: string | null) => void;
  setBackURL: (backURL: string | null) => void;
  setShowMoreButton: (isShowMoreButton: boolean) => void;
  setColor: (color: keyof typeof AppBarColor) => void;
}

export const useAppBarStore = create<AppBarState>((set) => ({
  isShow: false,
  title: null,
  backURL: null,
  isShowMoreButton: true,
  color: AppBarColor.default,
  setTitle: (title) => {
    set({ title });
    set(() => ({ isShow: title !== null }));
  },
  setBackURL: (backURL) => set({ backURL }),
  setShowMoreButton: (isShowMoreButton) => set({ isShowMoreButton }),
  setColor: (color) => set({ color }),
}));
