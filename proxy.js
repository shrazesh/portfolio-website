import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifySessionToken } from "./lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const session = token ? await verifySessionToken(token) : null;

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("from", pathname);

      const response = NextResponse.redirect(loginUrl);

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: "",
        path: "/",
        maxAge: 0,
      });

      return response;
    }

    return NextResponse.next();
  }

  // Logged-in admin should not see login page
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
