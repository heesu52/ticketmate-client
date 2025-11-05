import { NextResponse, type NextRequest } from 'next/server';

// 리다이렉트 헬퍼 함수
function redirect(url: URL, pathname: string, reason?: string): NextResponse {
  url.pathname = pathname;
  if (reason) {
    url.searchParams.set('reason', reason);
  }
  return NextResponse.redirect(url);
}

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const { pathname } = url;

  console.log('미들웨어 실행:', pathname);

  // 쿠키에서 인증 상태 확인
  const token = req.cookies.get('accessToken')?.value;

  console.log('인증 상태:', { token: !!token });

  // 이미 로그인된 상태에서 로그인 페이지 접근 시 메인으로 리다이렉트
  if (token && pathname === '/auth/sign-in') {
    console.log('이미 로그인됨 -> /');
    return redirect(url, '/');
  }

  // 미들웨어가 처리하지 않는 공개 경로
  const publicPaths = ['/', '/auth/sign-in'];
  if (publicPaths.includes(pathname)) {
    console.log('공개 경로 접근:', pathname);
    return NextResponse.next();
  }

  // 토큰이 없으면 로그인 페이지로
  if (!token) {
    console.log('토큰 없음 -> /auth/sign-in');
    return redirect(url, '/auth/sign-in');
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
