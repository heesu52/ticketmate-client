'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import { usePathname } from 'next/navigation';

import { useGetMember } from '@/shared/services/member/query';
import { Member } from '@/shared/types';

/**
 * @typedef {Object} MemberContextType
 * @property {Member | null} member - 현재 로그인된 멤버 정보. 조회 성공 시 `Member` 객체, 실패 또는 비로그인 시 `null`.
 * @property {() => Promise<Member | undefined>} refresh - 서버에서 멤버 정보를 다시 불러와 갱신하는 비동기 함수.
 * @property {boolean} isLoading - 멤버 정보가 로딩 중인지 여부.
 * @property {unknown | null} error - 멤버 조회 과정에서 발생한 오류 객체. 없으면 `null`.
 */
interface MemberContextType {
  member: Member | null;
  refresh: () => Promise<Member | null>;
  isLoading: boolean;
  error: unknown | null;
}
const MemberContext = createContext<MemberContextType | null>(null);

/**
 * Member API를 실행하지 않아야 하는 라우트들
 */
const EXCLUDED_ROUTES = [
  '/',
  '/auth/sign-in',
  '/auth/sign-in/verification',
  '/auth/sign-in/profile',
];

/**
 * 전역 멤버 컨텍스트를 제공하는 Provider 컴포넌트
 *
 * @remarks
 * - 특정 라우트(로그인, 회원가입 등)에서는 member API를 호출하지 않습니다.
 * - 내부적으로 `useGetMember()` 쿼리를 호출하여 사용자 정보를 가져옵니다.
 * - `refresh()`를 통해 서버 데이터를 강제로 재요청할 수 있습니다.
 * - 데이터를 가져오는 동안 `isLoading`이 `true`로 설정됩니다.
 */
export function MemberProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 현재 라우트가 제외된 라우트인지 확인
  const shouldSkipMemberAPI = EXCLUDED_ROUTES.some(
    (route) => pathname === route,
  );

  // 조건부로 member API 호출
  const { data, isLoading, refetch, error, isSuccess } =
    useGetMember(!shouldSkipMemberAPI);

  /**
   * 서버로부터 멤버 데이터를 다시 가져오는 함수.
   * @returns {Promise<Member | undefined>} 최신 멤버 데이터 반환
   */
  const refresh = useCallback(
    () => refetch().then((res) => res.data as Member | null),
    [refetch],
  );

  const value = useMemo<MemberContextType>(() => {
    const member = isSuccess && data ? data : null;
    return { member, refresh, isLoading, error: error ?? null };
  }, [data, isLoading, error, isSuccess, refresh]);

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

/**
 * 전역 멤버 컨텍스트를 사용하는 커스텀 hook
 *
 * @returns {MemberContextType} 멤버 정보, 로딩 상태, 에러, 갱신 함수 등을 포함한 컨텍스트 객체
 *
 * @throws {Error} `MemberProvider` 외부에서 호출할 경우 에러 발생
 *
 * @example
 * ```tsx
 * const { member, isLoading, refresh } = useMember();
 *
 * if (isLoading) return <Spinner />;
 * return <div>{member?.nickname ?? '게스트'}</div>;
 * ```
 */
export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error('MemberProvider 외부에서 사용 불가');
  return ctx;
}
