import { NextResponse } from "next/server";
import { beginSpinClaim, commitSpinClaim } from "@/lib/server/spin-service";
import {
  clearPendingSpin,
  getPendingSpin,
  isSpinStorageConfigured,
} from "@/lib/server/spin-storage";
import {
  getRequestIp,
  isValidSpinEmail,
  normalizeSpinEmail,
} from "@/lib/server/spin-utils";

/** Resend is a Node SDK; keep on the Node runtime on serverless hosts. */
export const runtime = "nodejs";

function isStorageConfigError(err) {
  const msg = String(err?.message ?? "").toLowerCase();
  return (
    msg.includes("spin_storage_not_configured") ||
    msg.includes("unauthorized") ||
    msg.includes("invalid password") ||
    msg.includes("forbidden")
  );
}

function publicConfig() {
  return {
    storageConfigured: isSpinStorageConfigured(),
    resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    emailFromConfigured: Boolean(process.env.EMAIL_FROM?.trim()),
    adminSpinEmailConfigured: Boolean(process.env.ADMIN_SPIN_EMAIL?.trim()),
    appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL?.trim()),
  };
}

export async function GET() {
  return NextResponse.json({ ok: true, diagnostics: publicConfig() });
}

export async function POST(request) {
  if (!isSpinStorageConfigured()) {
    return NextResponse.json(
      { ok: false, error: "storage_unavailable" },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const locale = body.locale === "ru" ? "ru" : "en";
  const normalized = normalizeSpinEmail(body.email);
  if (!isValidSpinEmail(normalized)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const pendingToken =
    typeof body.pendingToken === "string" ? body.pendingToken.trim() : "";
  const rewardId = typeof body.rewardId === "string" ? body.rewardId.trim() : "";

  // Backward-compat shim:
  // - old clients call with only email => begin
  // - old clients call with rewardId => commit using server-side pending token
  if (!pendingToken && !rewardId) {
    try {
      const result = await beginSpinClaim({
        normalizedEmail: normalized,
        locale,
        ip: getRequestIp(request),
      });
      if (!result.ok) {
        return NextResponse.json(result, { status: result.status || 500 });
      }
      return NextResponse.json(result);
    } catch (e) {
      if (isStorageConfigError(e)) {
        return NextResponse.json(
          { ok: false, error: "storage_unavailable" },
          { status: 503 },
        );
      }
      console.error("[spin] begin(shim) error:", e?.message ?? e);
      return NextResponse.json(
        { ok: false, error: "server_error" },
        { status: 500 },
      );
    }
  }

  try {
    const tokenToUse =
      pendingToken || (await getPendingSpin(normalized))?.token || "";
    if (!tokenToUse) {
      return NextResponse.json(
        { ok: false, error: "pending_not_found", hint: "restart_spin" },
        { status: 409 },
      );
    }

    const result = await commitSpinClaim({
      normalizedEmail: normalized,
      locale,
      pendingToken: tokenToUse,
      ip: getRequestIp(request),
    });
    if (!result.ok) {
      if (result.error === "pending_token_mismatch") {
        await clearPendingSpin(normalized);
      }
      return NextResponse.json(result, { status: result.status || 500 });
    }
    return NextResponse.json(result);
  } catch (e) {
    if (isStorageConfigError(e)) {
      return NextResponse.json(
        { ok: false, error: "storage_unavailable" },
        { status: 503 },
      );
    }
    console.error("[spin] commit(shim) error:", e?.message ?? e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }
}
