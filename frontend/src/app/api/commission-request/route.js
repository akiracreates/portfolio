import { NextResponse } from "next/server";
import { commissionTypes } from "@/lib/content/commissions";
import {
  sendCommissionRequestAdminEmail,
  sendCommissionRequestUserConfirmationEmail,
} from "@/lib/server/commission-mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_COMMISSION_TYPES = new Set(commissionTypes.map((c) => c.id));

const PREFERRED_CONTACT = new Set(["email", "telegram", "discord"]);
const VALID_INTENDED_USE = new Set(["personal", "commercial", "unsure"]);
const VALID_BACKGROUND = new Set(["simple", "detailed", "artist-choice"]);
const VALID_POST_PERMISSION = new Set(["yes", "no", "ask-first"]);

const MIN_DESCRIPTION = 10;

function normalizeEmail(value) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function isValidEmail(email) {
  return Boolean(email && EMAIL_RE.test(email));
}

function sanitizeText(value, maxLen) {
  if (value == null) return "";
  if (typeof value !== "string") return String(value).slice(0, maxLen);
  return value
    .trim()
    .replace(/\r\n/g, "\n")
    .slice(0, maxLen);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const siteLocale = body.locale === "ru" ? "ru" : "en";

  const name = sanitizeText(body.name, 200);
  const email = normalizeEmail(body.email);
  const handle = sanitizeText(body.handle, 200);
  let preferredContact = sanitizeText(body.preferredContact, 40).toLowerCase();
  if (!PREFERRED_CONTACT.has(preferredContact)) {
    preferredContact = "email";
  }

  const commissionType = sanitizeText(body.commissionType, 80);
  const characterCount = sanitizeText(body.characterCount, 200);
  const intendedUse = sanitizeText(body.intendedUse, 40).toLowerCase();
  const background = sanitizeText(body.background, 40).toLowerCase();
  const strictDeadline = sanitizeText(body.strictDeadline, 10).toLowerCase() === "yes" ? "yes" : "no";
  const deadlineDetails = sanitizeText(body.deadlineDetails, 500);
  const budget = sanitizeText(body.budget, 200);
  const description = sanitizeText(body.description, 8000);
  const references = sanitizeText(body.references, 4000);
  const avoidances = sanitizeText(body.avoidances, 4000);
  const postPermission = sanitizeText(body.postPermission, 40).toLowerCase();
  const formSource = sanitizeText(body.formSource, 120) || "unknown";

  const agreedTerms =
    body.agreedTerms === true || body.agreedTerms === "true";
  const consentData =
    body.consentData === true || body.consentData === "true";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (!commissionType || !VALID_COMMISSION_TYPES.has(commissionType)) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (!intendedUse || !VALID_INTENDED_USE.has(intendedUse)) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (!postPermission || !VALID_POST_PERMISSION.has(postPermission)) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (description.length < MIN_DESCRIPTION) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (strictDeadline === "yes" && !deadlineDetails) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (!agreedTerms) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }
  if (!consentData) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    siteLocale,
    formSource,
    name,
    email,
    preferredContact,
    handle: handle || "—",
    commissionType,
    characterCount: characterCount || "—",
    intendedUse,
    background: background && VALID_BACKGROUND.has(background) ? background : "—",
    strictDeadline,
    deadlineDetails: strictDeadline === "yes" ? deadlineDetails : "—",
    budget: budget || "—",
    description,
    references: references || "—",
    avoidances: avoidances || "—",
    postPermission,
    agreedTerms: "yes",
    consentData: "yes",
  };

  const adminSent = await sendCommissionRequestAdminEmail(payload);
  if (!adminSent.ok) {
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }

  const userSent = await sendCommissionRequestUserConfirmationEmail(payload);
  if (!userSent.ok) {
    console.error(
      "[commission] admin email delivered but user confirmation failed for",
      payload.email,
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
