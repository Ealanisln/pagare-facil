import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the NextAuth.js session token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET
  });

  // Si no hay sesión y la ruta está protegida, redirigir a login
  const isAuthRoute = request.nextUrl.pathname.startsWith("/autenticacion");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/panel");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/administrador");
  
  // Si no hay token y la ruta es protegida, redirigir a login
  if (!token && (isDashboardRoute || isAdminRoute)) {
    const redirectUrl = new URL("/autenticacion/iniciar-sesion", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Para rutas de admin, verificar si el usuario es admin
  if (isAdminRoute) {
    // @ts-ignore - isAdmin podría no estar tipado en el token
    const isAdmin = token?.isAdmin === true;
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
  }

  // Si hay sesión y el usuario intenta acceder a auth, redirigir a dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  return NextResponse.next();
}

// Especificar las rutas donde se aplicará el middleware
export const config = {
  matcher: [
    "/panel/:path*",
    "/autenticacion/:path*",
    "/administrador/:path*",
  ],
}; 