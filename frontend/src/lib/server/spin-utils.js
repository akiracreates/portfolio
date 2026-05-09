const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeSpinEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

export function isValidSpinEmail(email) {
  return Boolean(email && EMAIL_RE.test(email));
}

/**
 * @param {string} [baseUrl]
 * @param {string} locale
 */
export function commissionsPageUrl(locale, baseUrl) {
  const base = (baseUrl || process.env.NEXT_PUBLIC_APP_URL || "").replace(
    /\/$/,
    "",
  );
  const path = `/${locale === "ru" ? "ru" : "en"}/commissions`;
  return base ? `${base}${path}` : path;
}

export function getRequestIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "";
  }
  return request.headers.get("x-real-ip")?.trim() || "";
}
