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
