import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🚀 MIDDLEWARE EJECUTÁNDOSE EN:', request.nextUrl.pathname);

  const token = request.cookies.get('sesion_token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === '/' || pathname.startsWith('/get-started');
  const isPrivateRoute = pathname.startsWith('/les');

  // 1. Ruta privada sin sesión -> Redirigir a Login (/get-started)
  if (isPrivateRoute && !token) {
    const loginUrl = new URL('/get-started', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Ruta pública con sesión -> Redirigir al dashboard (/les)
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/les', request.url));
  }

  return NextResponse.next();
}

// ⚠️ CORRECCIÓN EN EL MATCHER:
// Los símbolos (.*) permiten que haga match TANTO con "/les" como con "/les/cualquier/subruta"
export const config = {
  matcher: [
    '/',
    '/les',
    '/les/(.*)',
    '/get-started',
    '/get-started/(.*)',
  ],
};