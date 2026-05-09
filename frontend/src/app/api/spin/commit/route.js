import { NextResponse } from "next/server";
import { commitSpinClaim } from "@/lib/server/spin-service";
import {
  getRequestIp,
  isValidSpinEmail,
  normalizeSpinEmail,
} from "@/lib/server/spin-utils";
import { isSpinStorageConfigured } from "@/lib/server/spin-storage";

export const runtime = "nodejs";

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
  const normalizedEmail = normalizeSpinEmail(body.email);
  if (!isValidSpinEmail(normalizedEmail)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const pendingToken =
    typeof body.pendingToken === "string" ? body.pendingToken.trim() : "";
  if (!pendingToken) {
    return NextResponse.json(
      { ok: false, error: "missing_pending_token" },
      { status: 400 },
    );
  }

  try {
    const result = await commitSpinClaim({
      normalizedEmail,
      locale,
      pendingToken,
      ip: getRequestIp(request),
    });
    if (!result.ok) {
      return NextResponse.json(result, { status: result.status || 500 });
    }
    return NextResponse.json(result);
  } catch (e) {
    if (e?.message === "spin_storage_not_configured") {
      return NextResponse.json(
        { ok: false, error: "storage_unavailable" },
        { status: 503 },
      );
    }
    console.error("[spin] commit error:", e?.message ?? e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }
}

