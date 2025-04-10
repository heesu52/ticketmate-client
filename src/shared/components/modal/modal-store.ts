import { ReactNode } from 'react';

import { create } from 'zustand';

interface ModalState {
  id: string;
  content: ReactNode;
}

interface ModalStore {
  modals: ModalState[];
  openModal: (modal: Omit<ModalState, 'id'> & { id?: string }) => string;
  closeModal: (id: string) => void;
  closeTopModal: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (modal) => {
    const id = modal.id || crypto.randomUUID();
    set((state) => ({
      modals: [...state.modals, { ...modal, id }],
    }));
    return id;
  },
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    })),
  closeTopModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
  closeAllModals: () =>
    set(() => ({
      modals: [],
    })),
}));
