import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // Get the current path
  const isPublicPath = path === "/login" || path === "/signup"; // Define public paths
  const token = request.cookies.get("token")?.value || ""; // Get the token from cookies

  // Redirect authenticated users trying to access public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home page
  }

  // Redirect unauthenticated users trying to access protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl)); // Redirect to login page
  }

  // Allow access to the requested path
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/login", "/profile"], // Specify paths to apply middleware
};
