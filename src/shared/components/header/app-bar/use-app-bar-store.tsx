import { create } from 'zustand';

export type BackgroundColor = 'white' | 'transparent';

interface AppBarState {
  isShow: boolean;
  title: string | null;
  backURL: string | null;
  hasShareButton: boolean;
  backgroundColor: BackgroundColor;
  setTitle: (title: string | null) => void;
  setBackURL: (backURL: string | null) => void;
  setHasShareButton: (hasShareButton: boolean) => void;
  setBackgroundColor: (backgroundColor: BackgroundColor) => void;
}

export const useAppBarStore = create<AppBarState>((set) => ({
  isShow: false,
  title: null,
  backURL: null,
  hasShareButton: true,
  backgroundColor: 'white',
  setTitle: (title) => {
    set({ title });
    set(() => ({ isShow: title !== null }));
  },
  setBackURL: (backURL) => set({ backURL }),
  setHasShareButton: (hasShareButton) => set({ hasShareButton }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
}));
