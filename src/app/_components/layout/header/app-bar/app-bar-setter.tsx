'use client';

import { ReactNode, useEffect } from 'react';

import { useAppBarStore } from './use-app-bar-store';

interface AppBarSetterProps {
  title: string;
  hasBackground?: boolean;
  action?: ReactNode;
}

export default function AppBarSetter({
  title,
  hasBackground = true,
  action,
}: AppBarSetterProps) {
  const { setAppBar } = useAppBarStore();

  useEffect(() => {
    setAppBar({
      title,
      hasBackground,
      action,
      hasAppBar: true,
    });

    return () => {
      setAppBar({
        hasAppBar: false,
        title: '',
        hasBackground: true,
        action: null,
      });
    };
  }, [setAppBar, title, hasBackground, action]);

  return null;
}
