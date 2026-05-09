/**
 * Next.js App Router edge handler (`middleware`).
 * This repo keeps locale redirects/cookies in `proxy.js`, which Next links at build time.
 * Behavior: bare `/` → `/en` or negotiated locale; sync `NEXT_LOCALE` cookie.
 */
import { NextResponse } from "next/server";

const LOCALES = ["en", "ru"];
const DEFAULT_LOCALE = "en";
const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function pathHasLocale(pathname) {
  return LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
}

function detectLocale(request) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;

  const accept = request.headers.get("accept-language") || "";
  const wanted = accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of wanted) {
    const base = tag.split("-")[0];
    if (LOCALES.includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  if (pathHasLocale(pathname)) {
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0];
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    if (cookie === locale) {
      return NextResponse.next();
    }
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, locale, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const response = NextResponse.redirect(url);
  response.cookies.set(COOKIE_NAME, locale, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|placeholders|.*\\..*).*)",
  ],
};
