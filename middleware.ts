import { NextRequest, NextResponse } from 'next/server';

// Middleware runs on Next.js's Edge runtime, which can't load Node built-ins
// like crypto/fs/path. So we do NOT import lib/auth here — we just inline the
// cookie name. The actual session validity is re-checked inside every admin
// Route Handler, which runs on the Node runtime and can use lib/auth safely.
const SESSION_COOKIE = 'nn_admin_session';

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
