'use client';

import { ReactNode, useEffect } from 'react';

import { useAppBarStore } from './use-app-bar-store';

interface AppBarSetterProps {
  title: string;
  hasBackground?: boolean;
  isDynamicColor?: boolean;
  action?: ReactNode;
}

export default function AppBarSetter({
  title,
  hasBackground = true,
  isDynamicColor = false,
  action,
}: AppBarSetterProps) {
  const { setAppBar } = useAppBarStore();

  useEffect(() => {
    setAppBar({
      title,
      hasBackground,
      isDynamicColor,
      action,
      hasAppBar: true,
    });

    return () => {
      setAppBar({
        hasAppBar: false,
        title: '',
        hasBackground: true,
        isDynamicColor: false,
        action: null,
      });
    };
  }, [setAppBar, title, hasBackground, isDynamicColor, action]);

  return null;
}
