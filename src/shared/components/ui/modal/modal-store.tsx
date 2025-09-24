'use client';

import { create } from 'zustand';

import type {
  ModalComponent,
  ModalItem,
} from '@/shared/components/ui/modal/modal.type';

export type ModalStoreType = {
  modals: ModalItem<unknown, unknown>[];
  open: <
    TProps extends Record<string, unknown> | Record<string, never> = Record<
      string,
      never
    >,
    TResult = unknown,
  >(
    key: string,
    Component: ModalComponent<TProps, TResult>,
    props?: TProps,
  ) => Promise<TResult>;

  close: (key: string) => void;
  clear: () => void;
};

export const useModalStore = create<ModalStoreType>((set, get) => ({
  modals: [],

  open: (key, Component, props) =>
    new Promise((resolve, reject) => {
      type TProps = typeof props extends undefined
        ? Record<string, never>
        : NonNullable<typeof props>;

      type TResult =
        Parameters<
          NonNullable<ModalComponent<TProps, unknown>['prototype']>
        > extends never
          ? unknown
          : unknown;

      // store에서 resolve/reject를 래핑해 자동 close
      const handleResolve = (value: unknown) => {
        (resolve as (v: unknown) => void)(value);
        // 호출 즉시 key 제거
        set((s) => ({ modals: s.modals.filter((m) => m.key !== key) }));
      };

      const handleReject = (reason?: unknown) => {
        reject(reason);
        set((s) => ({ modals: s.modals.filter((m) => m.key !== key) }));
      };

      const item: ModalItem<TProps, TResult> = {
        key,
        Component: Component as ModalComponent<TProps, TResult>,
        props: props as TProps | undefined,
        resolve: handleResolve as (value: TResult) => void,
        reject: handleReject,
      };

      set((s) => ({
        modals: [...s.modals, item as ModalItem<unknown, unknown>],
      }));
    }),

  close: (key) =>
    set((s) => ({ modals: s.modals.filter((m) => m.key !== key) })),

  clear: () => set(() => ({ modals: [] })),
}));
