import { commissionTypes } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";
import {
  formatResendErrorForLog,
  getCommissionAdminEmail,
  getEmailFrom,
  getResend,
  resendSendResult,
} from "@/lib/server/email";

const DESCRIPTION_PREVIEW_MAX = 220;

function descriptionPreview(text) {
  const d = typeof text === "string" ? text.trim() : "";
  if (d.length <= DESCRIPTION_PREVIEW_MAX) return d;
  return `${d.slice(0, DESCRIPTION_PREVIEW_MAX)}…`;
}

function commissionTypeUserLabel(typeId, locale) {
  const row = commissionTypes.find((c) => c.id === typeId);
  if (!row) return typeId;
  return pickLocale(row.title, locale);
}

function buildUserSummarySection(data, locale) {
  const typeLabel = commissionTypeUserLabel(data.commissionType, locale);
  return [
    "",
    "your request summary:",
    "",
    `commission type: ${typeLabel}`,
    `preferred contact: ${data.preferredContact}`,
    `email: ${data.email}`,
    "",
    "details (preview):",
    descriptionPreview(data.description),
    "",
  ].join("\n");
}

function buildUserSummarySectionRu(data, locale) {
  const typeLabel = commissionTypeUserLabel(data.commissionType, locale);
  return [
    "",
    "кратко о заявке:",
    "",
    `тип заказа: ${typeLabel}`,
    `предпочтительная связь: ${data.preferredContact}`,
    `email: ${data.email}`,
    "",
    "описание (фрагмент):",
    descriptionPreview(data.description),
    "",
  ].join("\n");
}

function buildUserConfirmationEn(data) {
  const summary = buildUserSummarySection(data, "en");
  return [
    "hi!",
    "",
    "thank you for sending your commission request. i received it and will review the details as soon as i can.",
    "",
    "this does not mean the commission is accepted yet — i'll contact you first so we can confirm the idea, details, timing, and price.",
    "",
    "if you want to add more references, details, or corrections, please contact me through one of these:",
    "",
    "email: akiracreates.comms@gmail.com",
    "telegram: https://t.me/akiracreates",
    "vk: https://vk.ru/akirasartisticmess",
    "discord: @akiracreates",
    "",
    "telegram is usually the fastest way to reach me.",
    "",
    summary,
    "thank you again,",
    "akira",
  ].join("\n");
}

function buildUserConfirmationRu(data) {
  const summary = buildUserSummarySectionRu(data, "ru");
  return [
    "привет!",
    "",
    "спасибо, что отправили заявку на коммишен. я получила её и посмотрю детали, как только смогу.",
    "",
    "это ещё не значит, что коммишен принят — сначала я свяжусь с вами, чтобы уточнить идею, детали, сроки и цену.",
    "",
    "если вы хотите добавить референсы, детали или что-то исправить, пожалуйста, напишите мне сюда:",
    "",
    "почта: akiracreates.comms@gmail.com",
    "telegram: https://t.me/akiracreates",
    "vk: https://vk.ru/akirasartisticmess",
    "discord: @akiracreates",
    "",
    "telegram обычно самый быстрый способ связаться со мной.",
    "",
    summary,
    "спасибо ещё раз,",
    "akira",
  ].join("\n");
}

/**
 * @param {object} data normalized payload for the admin inbox
 */
export function buildCommissionAdminText(data) {
  const lines = [
    "new commission request",
    "",
    "submitted at:",
    data.submittedAt,
    "",
    "site locale (ui):",
    data.siteLocale,
    "",
    "form source:",
    data.formSource || "unknown",
    "",
    "name:",
    data.name,
    "",
    "email:",
    data.email,
    "",
    "preferred contact:",
    data.preferredContact,
    "",
    "handle (telegram/discord/etc.):",
    data.handle,
    "",
    "commission type:",
    data.commissionType,
    "",
    "number of characters/animals:",
    data.characterCount || "—",
    "",
    "intended use:",
    data.intendedUse || "—",
    "",
    "background:",
    data.background || "—",
    "",
    "strict deadline:",
    data.strictDeadline || "no",
    "",
    "deadline details:",
    data.deadlineDetails || "—",
    "",
    "budget / price note:",
    data.budget || "—",
    "",
    "description:",
    data.description,
    "",
    "references / links:",
    data.references || "—",
    "",
    "anything to avoid:",
    data.avoidances || "—",
    "",
    "permission to post finished artwork:",
    data.postPermission || "—",
    "",
    "terms agreed:",
    data.agreedTerms,
    "",
    "personal data processing consent:",
    data.consentData,
  ];
  return lines.join("\n");
}

/**
 * @param {object} data same shape as buildCommissionAdminText
 * @returns {Promise<{ ok: boolean }>}
 */
export async function sendCommissionRequestAdminEmail(data) {
  const resend = getResend();
  const from = getEmailFrom();
  if (!resend || !from) {
    console.error(
      "[commission] RESEND_API_KEY or EMAIL_FROM missing; cannot send email",
    );
    return { ok: false };
  }

  const subject = `new commission request from ${data.name} (${data.email})`;
  const text = buildCommissionAdminText(data);

  const sent = await resendSendResult(
    resend.emails.send({
      from,
      to: getCommissionAdminEmail(),
      subject,
      text,
    }),
  );
  if (!sent.ok) {
    console.error(
      "[commission] admin Resend error:",
      formatResendErrorForLog(sent.error),
    );
    return { ok: false };
  }
  return { ok: true };
}

/**
 * Receipt email to the submitter. Failures are logged; caller should not fail the request if admin already sent.
 * @param {object} data same normalized payload as admin email
 * @returns {Promise<{ ok: boolean }>}
 */
export async function sendCommissionRequestUserConfirmationEmail(data) {
  const resend = getResend();
  const from = getEmailFrom();
  if (!resend || !from) {
    console.warn(
      "[commission] skipping user confirmation: RESEND_API_KEY or EMAIL_FROM missing",
    );
    return { ok: false };
  }

  const locale = data.siteLocale === "ru" ? "ru" : "en";
  const subject =
    locale === "ru"
      ? "заявка на коммишен получена"
      : "commission request received";
  const text =
    locale === "ru"
      ? buildUserConfirmationRu(data)
      : buildUserConfirmationEn(data);

  const sent = await resendSendResult(
    resend.emails.send({
      from,
      to: data.email,
      subject,
      text,
    }),
  );
  if (!sent.ok) {
    console.error(
      "[commission] user confirmation Resend error:",
      formatResendErrorForLog(sent.error),
    );
    return { ok: false };
  }
  return { ok: true };
}
