import { ReactElement, ReactNode } from 'react';

export interface RightProps {
  icon: ReactElement;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface AppBarProps {
  variant?: 'default' | 'transparent';

  title: ReactNode;
  showBack?: boolean;
  onBack?: () => void;

  right?: RightProps[];
}
