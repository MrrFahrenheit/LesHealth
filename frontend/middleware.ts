import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🚀 MIDDLEWARE EJECUTÁNDOSE EN:', request.nextUrl.pathname);

  const token = request.cookies.get('sesion_token')?.value;
  
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === '/' || pathname.startsWith('/get-started');
  const isPrivateRoute = pathname.startsWith('/les');

  // 1. Ruta privada sin sesión -> Redirigir a Login (/get-started/auth)
  if (isPrivateRoute && !token) {
    const loginUrl = new URL('/get-started/auth', request.url);
    loginUrl.searchParams.set('from', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return response;
  }

  // 2. Ruta pública con sesión -> Redirigir al dashboard (/les)
  if (isPublicRoute && token) {
    const response = NextResponse.redirect(new URL('/les', request.url));
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return response;
  }

  return NextResponse.next();
}

// ⚠️ CORRECCIÓN EN EL MATCHER:
export const config = {
  matcher: [
    '/',
    '/les',
    '/les/(.*)',
    '/get-started',
    '/get-started/(.*)',
  ],
};