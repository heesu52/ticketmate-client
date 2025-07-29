'use client';

import { useContext, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { NavigationContext } from '@/shared/context/navigation-context';

/**
 * `useLocation` 훅은 React Router의 `useLocation`과 유사한 역할을 하며,
 * `navigate` 시 전달된 상태(`state`)와 현재 URL의 검색 쿼리(`searchParams`)를 반환합니다.
 * 이때 state는 새로고침 시 초기화됩니다.
 * @template T - navigate 시 전달한 상태(state)의 타입
 *
 * @returns {{
 *   state: T | null;
 *   searchParams: URLSearchParams;
 * }}
 * - `state`: `navigate()` 시 넘긴 제네릭 타입의 상태 값
 * - `search`: URL 쿼리 파라미터 객체 (ex: `search.get("room")`)
 *
 * @example
 * ```tsx
 * const { state, searchParams } = useLocation<{ message: string }>();
 * console.log(state?.message); // "hello"
 * console.log(searchParams.get('room')); // "123"
 * ```
 *
 * @throws `Error` - NavigationProvider 외부에서 사용 시 예외 발생
 */
export const useLocation = <T>() => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error('useLocation must be used within NavigationProvider');

  /** 상태 */
  const [state, setState] = useState<T | null>(() => ctx.consume() as T | null);
  /** 검색 쿼리 */
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state == null) {
      setState(ctx.consume() as T | null);
    }
  }, []);

  return { state, searchParams };
};
