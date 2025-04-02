export const MODAL_KEYS = {
  EXAMPLE: 'EXAMPLE',
} as const;

export type ModalKey = keyof typeof MODAL_KEYS;
