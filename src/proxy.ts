import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { STORAGE_KEYS } from '@/lib/storage/keys';

// In a real app, you would verify a JWT or session cookie here.
// Since we are using localStorage for the mock backend, middleware cannot easily read it.
// However, we can check for a cookie if we set one on login.
// For now, we will just allow the request through and let the client-side
// Require[Role] components handle the redirection, OR we can check a generic 'auth' cookie.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public paths that do not require authentication
  const publicPaths = ['/login', '/owner-request', '/', '/superadmin/login', '/manager/login', '/owner/login', '/staff/login', '/student/login'];
  
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }
  
  // Verify token (Mock logic: assume a cookie 'session_token' exists)
  const token = request.cookies.get('session_token')?.value;
  
  if (!token) {
    // If trying to access a protected route without a token, redirect to generic login
    // In a full implementation, you'd redirect to the role-specific login based on the URL prefix
    let loginUrl = new URL('/login', request.url);
    if (pathname.startsWith('/superadmin')) loginUrl = new URL('/superadmin/login', request.url);
    else if (pathname.startsWith('/owner')) loginUrl = new URL('/owner/login', request.url);
    else if (pathname.startsWith('/manager')) loginUrl = new URL('/manager/login', request.url);
    else if (pathname.startsWith('/staff')) loginUrl = new URL('/staff/login', request.url);
    else if (pathname.startsWith('/student')) loginUrl = new URL('/student/login', request.url);
    
    return NextResponse.redirect(loginUrl);
  }

  // Add x-tenant-id for multi-tenancy (Rule 22) - mock value here, actual implementation would extract from token
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', 'mock-tenant-id');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
