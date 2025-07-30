import { createElement, type ReactNode } from 'react';

import { NavigationProvider } from '@/shared/context/navigation-context';

/**
 * `ContextProvider`는 애플리케이션에서 사용할 모든 전역 Context Provider들을 감싸는 컴포넌트입니다.
 * 내부적으로 등록된 Provider들을 배열로 순회하여 계층적으로 children을 감싸며 반환합니다.
 *
 * 이 컴포넌트를 `app/layout.tsx`의 `<body>` 내부에 위치시키면,
 * 하위 모든 컴포넌트에서 전역 상태를 사용할 수 있습니다.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - 하위에 렌더링될 자식 컴포넌트
 *
 * @returns {JSX.Element} 모든 Context Provider로 감싸진 컴포넌트 트리
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import ContextProvider from '@/shared/context/context-provider';
 *
 * export default function RootLayout({ children }: { children: ReactNode }) {
 *   return (
 *     <html lang="ko">
 *       <body>
 *         <ContextProvider>
 *           {children}
 *         </ContextProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function ContextProvider({ children }: { children: ReactNode }) {
  const contexts = [NavigationProvider];

  return contexts.reduce(
    (prev, context) => createElement(context, null, prev),
    children,
  );
}
