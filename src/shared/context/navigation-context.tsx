'use client';

import { createContext, ReactNode, useState, useMemo } from 'react';

import { useRouter } from 'next/navigation';

export interface NavigateArgs<T> {
  /** 경로 */
  pathname: string;
  /** 검색 쿼리 */
  search?: string;
  /** 상태 */
  state?: T;
}

export interface NavigationContextType<T = unknown> {
  /** 상태 */
  state: T | null;
  /** 상태 설정 */
  setState: (data: T | null) => void;
  /** 네비게이션 */
  navigate: <T>(args: NavigateArgs<T>) => void;
  /** 상태 소비(path에 넣은 페이지로 네비게이션하여 상태 return 이후, 상태 초기화) */
  consume: () => T | null;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState<unknown>(null);

  const navigate = <T,>({
    pathname,
    search = '',
    state: newState,
  }: NavigateArgs<T>) => {
    if (newState !== undefined) setState(newState);

    const searchParams = new URLSearchParams(search);
    const fullPath = `${pathname}?${searchParams.toString()}`;
    router.push(fullPath);
  };

  const consume = () => {
    const data = state;
    setState(null);
    return data;
  };

  const value: NavigationContextType = useMemo(
    () => ({
      state,
      setState,
      navigate,
      consume,
    }),
    [state],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
