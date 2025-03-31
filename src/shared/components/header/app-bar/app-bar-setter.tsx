'use client';

import { useLayoutEffect } from 'react';

import {
  BackgroundColor,
  useAppBarStore,
} from '@/shared/components/header/app-bar/use-app-bar-store';

interface AppBarSetterProps {
  title: string;
  backURL?: string | null;
  hasShareButton?: boolean;
  backgroundColor?: BackgroundColor;
}

const AppBarSetter = ({
  title,
  backURL,
  hasShareButton,
  backgroundColor,
}: AppBarSetterProps) => {
  const { setTitle, setBackURL, setHasShareButton, setBackgroundColor } =
    useAppBarStore();

  useLayoutEffect(() => {
    setTitle(title);
    setBackURL(backURL ?? null);
    setHasShareButton(hasShareButton ?? true);
    setBackgroundColor(backgroundColor ?? 'white');
  }, [
    title,
    backURL,
    hasShareButton,
    backgroundColor,
    setTitle,
    setBackURL,
    setHasShareButton,
    setBackgroundColor,
  ]);

  return null;
};

export default AppBarSetter;
