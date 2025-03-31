import type { InputHTMLAttributes, ReactNode } from 'react';

interface IconProps {
  icon: ReactNode;
  position?: 'left' | 'right';
  onIconClick?: () => void;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  iconProps?: IconProps;
  error?: boolean;
  errorMessage?: string;
}

export type { InputProps, IconProps };
