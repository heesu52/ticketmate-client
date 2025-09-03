import { ReactNode } from 'react';

export type TabItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};
