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
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  
  if (!token && isDashboardRoute) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si hay sesión y el usuario intenta acceder a auth, redirigir a dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Especificar las rutas donde se aplicará el middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
  ],
}; 