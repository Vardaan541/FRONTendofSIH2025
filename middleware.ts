import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") ||
    pathname.startsWith("/student") || // Allow direct access to student pages
    pathname.startsWith("/alumni") // Allow direct access to alumni pages
  ) {
    return NextResponse.next();
  }

  // Handle developer routes with custom authentication
  if (pathname.startsWith("/developer")) {
    // For developer routes, we'll handle authentication in the component itself
    // since we're using localStorage for developer auth
    return NextResponse.next();
  }

  // Handle admin routes with custom authentication
  if (pathname.startsWith("/admin")) {
    // For admin routes, we'll handle authentication in the component itself
    // since we're using localStorage for admin auth
    return NextResponse.next();
  }

  // For all other routes, use Supabase authentication
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
