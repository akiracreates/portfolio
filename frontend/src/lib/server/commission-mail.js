import { commissionTypes } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";
import { getCommissionAdminEmail, getEmailFrom, getResend } from "@/lib/server/email";

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
    "thank you for sending a commission request through my site.",
    "",
    "i received it and will look through the details before replying. this does not confirm the commission yet — i'll contact you first to discuss the idea, price, timeline, and any questions.",
    "",
    "if anything changes or you want to add more references, you can reply to this email or contact me on telegram.",
    "",
    summary,
    "thank you for trusting me with your idea,",
    "akira",
  ].join("\n");
}

function buildUserConfirmationRu(data) {
  const summary = buildUserSummarySectionRu(data, "ru");
  return [
    "привет!",
    "",
    "спасибо, что отправил(а) заявку на заказ через мой сайт.",
    "",
    "я получила её и посмотрю детали перед ответом. это ещё не подтверждение заказа — сначала я свяжусь с тобой, чтобы обсудить идею, цену, сроки и вопросы.",
    "",
    "если что-то изменится или ты хочешь добавить ещё референсы, можешь ответить на это письмо или написать мне в telegram.",
    "",
    summary,
    "спасибо за доверие к моей работе,",
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
    "budget / price note:",
    data.budget || "—",
    "",
    "deadline / rush:",
    data.deadline || "—",
    "",
    "preferred language (form field):",
    data.language || "—",
    "",
    "description:",
    data.description,
    "",
    "references / links:",
    data.references || "—",
    "",
    "terms agreed:",
    data.agreedTerms,
    "",
    "contact consent:",
    data.consent,
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

  try {
    await resend.emails.send({
      from,
      to: getCommissionAdminEmail(),
      subject,
      text,
    });
    return { ok: true };
  } catch (e) {
    console.error("[commission] admin Resend error:", e?.message ?? e);
    return { ok: false };
  }
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
      ? "я получила твою заявку"
      : "i got your commission request";
  const text =
    locale === "ru"
      ? buildUserConfirmationRu(data)
      : buildUserConfirmationEn(data);

  const replyTo = getCommissionAdminEmail();

  try {
    await resend.emails.send({
      from,
      to: data.email,
      subject,
      text,
      replyTo: [replyTo],
    });
    return { ok: true };
  } catch (e) {
    console.error(
      "[commission] user confirmation Resend error:",
      e?.message ?? e,
    );
    return { ok: false };
  }
}
