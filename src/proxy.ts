import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ROUTES, PUBLIC_ROUTES } from "@/constants/routes";

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isVerified = req.auth?.user?.isVerified;

  const isAuthRoute =
    [
      ROUTES.LOGIN,
      ROUTES.REGISTER,
      ROUTES.FORGOT_PASSWORD,
      ROUTES.RESET_PASSWORD,
    ].includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith(ROUTES.RESET_PASSWORD);

  const isEmailValidationRoute = nextUrl.pathname === ROUTES.EMAIL_VALIDATION;
  const isApiAuthRoute = nextUrl.pathname.startsWith(
    ROUTES.API.AUTH.NEXT_AUTH_PREFIX,
  );

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (!isVerified) {
        return NextResponse.redirect(new URL(ROUTES.EMAIL_VALIDATION, nextUrl));
      }
      return NextResponse.redirect(new URL(ROUTES.HOME, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, nextUrl));
  }

  if (isLoggedIn) {
    if (!isVerified && !isEmailValidationRoute) {
      return NextResponse.redirect(new URL(ROUTES.EMAIL_VALIDATION, nextUrl));
    }
    if (isVerified && isEmailValidationRoute) {
      return NextResponse.redirect(new URL(ROUTES.HOME, nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|favicon.png).*)"],
};
