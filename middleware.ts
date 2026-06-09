import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE_NAMES = [
  'authjs.session-token',
  '__Secure-authjs.session-token',
  'next-auth.session-token',
  '__Secure-next-auth.session-token',
];

const NO_STORE = 'private, no-cache, no-store, must-revalidate';

function hasSessionCookie(req: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) => req.cookies.has(name));
}

function shouldNoStore(pathname: string): boolean {
  if (pathname.startsWith('/api/')) {
    return true;
  }
  if (pathname.startsWith('/_next/') || pathname.includes('.')) {
    return false;
  }
  return !pathname.startsWith('/admin');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasSessionCookie(req)) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (shouldNoStore(pathname)) {
    response.headers.set('Cache-Control', NO_STORE);
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
