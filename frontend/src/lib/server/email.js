import { Resend } from "resend";

let resendSingleton = null;

const DEFAULT_WORK_EMAIL = "akiracreates.comms@gmail.com";

/** @returns {Resend | null} */
export function getResend() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  if (!resendSingleton) {
    resendSingleton = new Resend(key);
  }
  return resendSingleton;
}

export function getEmailFrom() {
  return process.env.EMAIL_FROM?.trim() || "";
}

export function getSpinAdminEmail() {
  return process.env.ADMIN_SPIN_EMAIL?.trim() || DEFAULT_WORK_EMAIL;
}

export function getCommissionAdminEmail() {
  return (
    process.env.ADMIN_COMMISSION_EMAIL?.trim() ||
    process.env.ADMIN_SPIN_EMAIL?.trim() ||
    DEFAULT_WORK_EMAIL
  );
}

/**
 * Resend's `emails.send()` resolves to `{ data, error }` and does not throw on API errors.
 * @param {Promise<{ data?: unknown, error?: object }>} sendPromise
 */
export async function resendSendResult(sendPromise) {
  const { data, error } = await sendPromise;
  if (error) return { ok: false, error };
  return { ok: true, data };
}

/** @param {unknown} err */
export function formatResendErrorForLog(err) {
  if (err && typeof err === "object" && "message" in err) {
    const o = /** @type {{ message?: string, name?: string, statusCode?: number }} */ (
      err
    );
    const parts = [o.message, o.name, o.statusCode].filter(Boolean);
    if (parts.length) return parts.join(" — ");
  }
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
