import { ComponentType } from 'react';

export type ModalControl<TResult = unknown> = {
  onResolve?: (value: TResult) => void;
  onReject?: (reason?: unknown) => void;
};

export type ModalComponent<
  TProps = Record<string, never>,
  TResult = unknown,
> = ComponentType<TProps & ModalControl<TResult>>;

export type ModalItem<TProps = Record<string, never>, TResult = unknown> = {
  key: string;
  Component: ModalComponent<TProps, TResult>;
  props?: TProps;
  resolve: (value: TResult) => void;
  reject: (reason?: unknown) => void;
};
