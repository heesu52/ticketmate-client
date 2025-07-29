'use client';

import { useContext } from 'react';

import {
  type NavigateArgs,
  NavigationContext,
} from '@/shared/context/navigation-context';

/**
 * `useNavigation` 훅은 React Router의 `useNavigate`와 유사한 역할을 하며,
 * 페이지 이동 시 상태(`state`)를 함께 전달할 수 있는 기능을 제공합니다.
 * 전달된 상태는 이동한 페이지에서 `useLocation()`을 통해 접근할 수 있습니다.
 *
 * @template T - navigate 시 전달할 상태 객체의 타입
 *
 * @returns {{
 *   navigate: (args: NavigateArgs<T>) => void;
 * }}
 * - `navigate`: 상태와 함께 경로를 이동하는 함수
 *
 * @example
 * ```tsx
 * const { navigate } = useNavigation<{ message: string }>();
 * navigate({
 *   pathname: '/result',
 *   search: '?step=2',
 *   state: { message: '완료되었습니다.' },
 * });
 * ```
 *
 * @throws `Error` - NavigationProvider 외부에서 사용 시 예외 발생
 */
export const useNavigation = <T>() => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error('useNavigation must be used within NavigationProvider');

  const navigate = (args: NavigateArgs<T>) => ctx.navigate<T>(args);

  return { navigate };
};
