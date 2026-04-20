import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from './lib/auth';

// Belt-and-suspenders: the /admin page already does a server-side auth check
// and redirects, but middleware bounces unauthenticated requests before any
// admin component code runs. The actual session validity is checked inside
// the Route Handlers as well — middleware just catches the obvious case of
// "no cookie at all".
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
    // /admin/login is the only admin page that doesn't require a session.
    if (url.pathname === '/admin/login') return NextResponse.next();

    const hasCookie = req.cookies.get(SESSION_COOKIE)?.value;
    if (!hasCookie) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
