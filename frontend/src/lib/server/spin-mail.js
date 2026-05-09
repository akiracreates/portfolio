import { pickLocale } from "@/lib/i18n/config";
import {
  formatResendErrorForLog,
  getEmailFrom,
  getResend,
  getSpinAdminEmail,
  resendSendResult,
} from "@/lib/server/email";
import { commissionsPageUrl } from "@/lib/server/spin-utils";

function buildEnUserBody(rewardLine, commissionsUrl) {
  return [
    "hi!",
    "",
    "you found the hidden surprise on my site.",
    "",
    "your reward:",
    rewardLine,
    "",
    "mention this email when you contact me about a commission, and i'll apply it to your order.",
    "",
    commissionsUrl ? `commissions: ${commissionsUrl}` : "",
    "",
    "thank you for visiting my little artistic mess,",
    "akira",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildRuUserBody(rewardLine, commissionsUrl) {
  return [
    "привет!",
    "",
    "ты нашёл/нашла маленький сюрприз на моём сайте.",
    "",
    "твой результат:",
    rewardLine,
    "",
    "упомяни это письмо, когда будешь писать мне о заказе, и я применю скидку.",
    "",
    commissionsUrl ? `заказы: ${commissionsUrl}` : "",
    "",
    "спасибо, что заглянул(а) в мой творческий беспорядок,",
    "akira",
  ]
    .filter(Boolean)
    .join("\n");
}

function moneyLinesForAdmin(reward) {
  if (reward?.type === "flat") {
    return {
      usd: reward.usdValue != null ? String(reward.usdValue) : "n/a",
      rub: reward.rubValue != null ? String(reward.rubValue) : "n/a",
    };
  }
  return { usd: "n/a", rub: "n/a" };
}

function buildAdminBody({ userEmail, localeAtSpin, reward, record }) {
  const { usd, rub } = moneyLinesForAdmin(reward);
  const userFacing = pickLocale(reward.label, localeAtSpin);
  const pct =
    reward?.type === "percent" && reward.value != null
      ? String(reward.value)
      : "n/a";

  return [
    "new spin wheel reward claimed",
    "",
    `user email:\n${userEmail}`,
    "",
    `locale at spin:\n${localeAtSpin}`,
    "",
    `reward:\n${userFacing}`,
    "",
    `admin reward:\n${reward.adminLabel ?? "n/a"}`,
    "",
    `reward id:\n${reward.id}`,
    "",
    `reward type:\n${reward.type}`,
    "",
    `percent value:\n${pct}`,
    "",
    `usd value:\n${usd}`,
    "",
    `rub value:\n${rub}`,
    "",
    `spun at:\n${record.spunAt}`,
    "",
    "snapshot reward id:",
    record.rewardId,
  ].join("\n");
}

/**
 * @param {object} params
 * @param {string} params.toUserEmail normalized
 * @param {'en'|'ru'} params.locale
 * @param {object} params.reward canonical catalog entry
 * @param {object} params.record persisted server record
 */
export async function sendSpinClaimEmails({
  toUserEmail,
  locale,
  reward,
  record,
}) {
  const resend = getResend();
  const from = getEmailFrom();

  if (!resend || !from) {
    console.error(
      "[spin] email not sent: set RESEND_API_KEY and EMAIL_FROM on the server (e.g. Vercel → Settings → Environment Variables) for Production and Preview.",
    );
    return {
      userSent: false,
      adminSent: false,
      skipped: true,
      errorCode: "email_config_missing",
    };
  }
  const rewardLine = pickLocale(reward.label, locale);
  const commissionsUrl = commissionsPageUrl(
    locale,
    process.env.NEXT_PUBLIC_APP_URL,
  );

  const userSubject =
    locale === "ru"
      ? "твой маленький сюрприз от akira"
      : "your small surprise from akira";

  const userText =
    locale === "ru"
      ? buildRuUserBody(rewardLine, commissionsUrl)
      : buildEnUserBody(rewardLine, commissionsUrl);

  const adminSubject = `spin wheel result: ${toUserEmail}`;
  const adminText = buildAdminBody({
    userEmail: toUserEmail,
    localeAtSpin: record.localeAtSpin,
    reward,
    record,
  });

  const out = {
    userSent: false,
    adminSent: false,
    skipped: false,
    errorCode: null,
  };

  const userSend = await resendSendResult(
    resend.emails.send({
      from,
      to: toUserEmail,
      subject: userSubject,
      text: userText,
    }),
  );
  if (userSend.ok) {
    out.userSent = true;
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[spin] user email accepted by Resend, id:",
        userSend.data?.id ?? "—",
      );
    }
  } else {
    out.errorCode = out.errorCode || "user_email_send_failed";
    console.error(
      "[spin] user email error:",
      formatResendErrorForLog(userSend.error),
    );
    if (process.env.NODE_ENV === "development" && userSend.error) {
      console.error("[spin] user email Resend error detail:", userSend.error);
    }
  }

  const adminSend = await resendSendResult(
    resend.emails.send({
      from,
      to: getSpinAdminEmail(),
      subject: adminSubject,
      text: adminText,
    }),
  );
  if (adminSend.ok) {
    out.adminSent = true;
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[spin] admin email accepted by Resend, id:",
        adminSend.data?.id ?? "—",
      );
    }
  } else {
    out.errorCode = out.errorCode || "admin_email_send_failed";
    console.error(
      "[spin] admin email error:",
      formatResendErrorForLog(adminSend.error),
    );
    if (process.env.NODE_ENV === "development" && adminSend.error) {
      console.error("[spin] admin email Resend error detail:", adminSend.error);
    }
  }

  return out;
}
