import { ReactNode } from 'react';

export interface SettingItem {
  title: string;
  description?: string;
  trailing?: ReactNode;
  href?: string; // link일 때 사용
  disabled?: boolean;
  type?: 'link' | 'text' | 'action';
  trailingIcon?: ReactNode; // 우측 아이콘 교체용
  onClick?: () => void;
}
