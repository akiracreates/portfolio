import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Stub spin notification endpoint.
 *
 * Accepts: { email: string, rewardId: string, locale?: string }
 * Returns: { ok: true } on success.
 *
 * NOTE — placeholder only. Future wiring (Resend, Nodemailer, or DB persistence)
 * goes here. For now we validate the payload and log to the server console so
 * dev/staging observers can see incoming spins.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "invalid request body" },
        { status: 400 },
      );
    }
    const { email, rewardId, locale } = body;
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "valid email required" },
        { status: 400 },
      );
    }
    if (!rewardId || typeof rewardId !== "string") {
      return NextResponse.json(
        { ok: false, error: "rewardId required" },
        { status: 400 },
      );
    }
    console.info(
      `[spin] reward=${rewardId} email=${email} locale=${locale ?? "?"}`,
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid request" },
      { status: 400 },
    );
  }
}
