/**
 * Next.js App Router edge handler (`middleware`).
 * This repo keeps locale redirects/cookies in `proxy.js`, which Next links at build time.
 * Behavior: bare `/` → `/en` or negotiated locale; sync `NEXT_LOCALE` cookie.
 * SEO: forwards `x-akira-locale` + `x-akira-pathname` on locale routes so `<html lang>`
 * and JSON-LD match the URL on the first request (cookie may not be readable yet).
 */
import { NextResponse } from "next/server";

import {
  LOCALE_REQUEST_HEADER,
  PATHNAME_REQUEST_HEADER,
} from "./lib/i18n/config.js";

const LOCALES = ["en", "ru"];
const DEFAULT_LOCALE = "en";
const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function pathHasLocale(pathname) {
  return LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
}

function forwardSeoHeaders(request, pathname, locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_REQUEST_HEADER, locale);
  requestHeaders.set(PATHNAME_REQUEST_HEADER, pathname);
  return requestHeaders;
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

/** Next.js edge entry: must be `export function proxy` or `export default` (see middleware-to-proxy). */
export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  if (pathHasLocale(pathname)) {
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0];
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    const requestHeaders = forwardSeoHeaders(request, pathname, locale);
    if (cookie === locale) {
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
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

export default proxy;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|placeholders|.*\\..*).*)",
  ],
};
