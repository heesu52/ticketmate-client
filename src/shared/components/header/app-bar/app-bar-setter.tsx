'use client';

import { useLayoutEffect } from 'react';

import {
  AppBarColor,
  useAppBarStore,
} from '@/shared/components/header/app-bar/use-app-bar-store';

interface AppBarSetterProps {
  title: string;
  backURL?: string | null;
  isShowMoreButton?: boolean;
  color?: keyof typeof AppBarColor;
}

const AppBarSetter = ({
  title,
  backURL,
  isShowMoreButton,
  color,
}: AppBarSetterProps) => {
  const { setTitle, setBackURL, setShowMoreButton, setColor } =
    useAppBarStore();

  useLayoutEffect(() => {
    setTitle(title);
    setBackURL(backURL ?? null);
    setShowMoreButton(isShowMoreButton ?? true);
    setColor(color ?? AppBarColor.default);
  }, [
    title,
    backURL,
    isShowMoreButton,
    color,
    setTitle,
    setBackURL,
    setShowMoreButton,
    setColor,
  ]);

  return null;
};

export default AppBarSetter;
