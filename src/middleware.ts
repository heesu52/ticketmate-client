import { NextResponse, type NextRequest } from 'next/server';

// 쿠키 값을 boolean으로 변환
function asBool(value?: string | null): boolean {
  return value === 'true' || value === '1';
}

// 리다이렉트 헬퍼 함수
function redirect(url: URL, pathname: string, reason?: string): NextResponse {
  url.pathname = pathname;
  if (reason) {
    url.searchParams.set('reason', reason);
  }
  return NextResponse.redirect(url);
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  console.log('미들웨어 실행:', pathname);

  // 쿠키에서 인증 상태 확인
  const token = req.cookies.get('access_token')?.value;
  const isPhoneVerified = asBool(req.cookies.get('phoneNumberVerified')?.value);
  const isProfileSet = asBool(req.cookies.get('initialProfileSetKey')?.value);

  console.log('인증 상태:', { token: !!token, isPhoneVerified, isProfileSet });

  // 미들웨어가 처리하지 않는 공개 경로
  const publicPaths = ['/', '/auth/sign-in'];
  if (publicPaths.includes(pathname)) {
    console.log('공개 경로 접근:', pathname);
    return NextResponse.next();
  }

  // auth 관련 경로들
  const authPaths = ['/auth/sign-in/verification', '/auth/sign-in/profile'];

  // 토큰이 없으면 로그인 페이지로
  if (!token) {
    console.log('토큰 없음 -> /auth/sign-in');
    return redirect(url, '/auth/sign-in');
  }

  // 토큰이 있는 경우 온보딩 플로우 체크
  // 1. 폰 인증이 안 되어 있으면 폰 인증 페이지로
  if (!isPhoneVerified && pathname !== '/auth/sign-in/verification') {
    console.log('폰 인증 필요 -> /auth/sign-in/verification');
    return redirect(url, '/auth/sign-in/verification');
  }

  // 2. 프로필 설정이 안 되어 있으면 프로필 설정 페이지로
  if (
    isPhoneVerified &&
    !isProfileSet &&
    pathname !== '/auth/sign-in/profile'
  ) {
    console.log('프로필 설정 필요 -> /auth/sign-in/profile');
    return redirect(url, '/auth/sign-in/profile');
  }

  // 3. 모든 설정이 완료된 상태에서 설정 페이지에 접근하면 메인 페이지로
  if (isPhoneVerified && isProfileSet && authPaths.includes(pathname)) {
    console.log('설정 완료, 메인으로 -> /');
    return redirect(url, '/');
  }

  console.log('통과:', pathname);
  console.log('--------------------------------');
  // 기타 모든 경로는 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest file)
     * - app-assets/ (app assets)
     * - .well-known/ (well-known files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|app-assets/|\\.well-known/).*)',
  ],
};
