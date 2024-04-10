import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let sessionToken = request.cookies.get("next-auth.session-token");

  // If there's no session token and the user is not on the login page, redirect to "/login"
  if (!sessionToken && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If there's a session token and the user is on the login page, redirect to "/"
  if (sessionToken && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // normal in all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin", "/dashboard", "/inventory"],
};
