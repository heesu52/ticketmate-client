import { ReactNode } from 'react';

export interface AppBarProps {
  variant?: 'default' | 'transparent';

  title: ReactNode;
  showBack?: boolean;
  backHref?: string;

  right?: ReactNode;

  additionalContent?: ReactNode;
}
