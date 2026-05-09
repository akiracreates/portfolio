import { NextResponse } from "next/server";
import {
  getSpinRewardById,
  snapshotSpinReward,
} from "@/lib/content/rewards";
import { sendSpinClaimEmails } from "@/lib/server/spin-mail";
import {
  claimSpinRecord,
  getSpinRecord,
  isSpinStorageConfigured,
} from "@/lib/server/spin-storage";
import { isValidSpinEmail, normalizeSpinEmail } from "@/lib/server/spin-utils";

/** Resend is a Node SDK; keep on the Node runtime on serverless hosts. */
export const runtime = "nodejs";

function publicRecord(rec) {
  if (!rec) return null;
  return {
    rewardId: rec.rewardId,
    localeAtSpin: rec.localeAtSpin,
    spunAt: rec.spunAt,
    rewardSnapshot: rec.rewardSnapshot,
  };
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

  const rewardId =
    typeof body.rewardId === "string" ? body.rewardId.trim() : "";

  if (!rewardId) {
    try {
      const existing = await getSpinRecord(normalized);
      if (!existing) {
        return NextResponse.json({ ok: true, alreadySpun: false });
      }
      return NextResponse.json({
        ok: true,
        alreadySpun: true,
        record: publicRecord(existing),
      });
    } catch (e) {
      console.error("[spin] lookup error:", e?.message ?? e);
      return NextResponse.json(
        { ok: false, error: "storage_error" },
        { status: 503 },
      );
    }
  }

  const canonical = getSpinRewardById(rewardId);
  if (!canonical) {
    return NextResponse.json(
      { ok: false, error: "invalid_reward" },
      { status: 400 },
    );
  }

  const spunAt =
    typeof body.spunAt === "string" && body.spunAt.trim()
      ? body.spunAt.trim()
      : new Date().toISOString();

  const newRecord = {
    normalizedEmail: normalized,
    rewardId: canonical.id,
    localeAtSpin: locale,
    spunAt,
    rewardSnapshot: snapshotSpinReward(canonical),
  };

  try {
    const { created, record } = await claimSpinRecord(normalized, newRecord);

    if (!created) {
      if (!record?.rewardId) {
        return NextResponse.json(
          { ok: false, error: "corrupt_record" },
          { status: 500 },
        );
      }
      const existingCanonical = getSpinRewardById(record.rewardId);
      if (!existingCanonical) {
        return NextResponse.json(
          { ok: false, error: "corrupt_record" },
          { status: 500 },
        );
      }
      return NextResponse.json({
        ok: true,
        alreadySpun: true,
        record: publicRecord(record),
      });
    }

    const email = await sendSpinClaimEmails({
      toUserEmail: normalized,
      locale,
      reward: canonical,
      record: newRecord,
    });

    return NextResponse.json({
      ok: true,
      alreadySpun: false,
      record: publicRecord(newRecord),
      email: {
        skipped: email.skipped,
        userSent: email.userSent,
        adminSent: email.adminSent,
      },
    });
  } catch (e) {
    if (e?.message === "spin_storage_not_configured") {
      return NextResponse.json(
        { ok: false, error: "storage_unavailable" },
        { status: 503 },
      );
    }
    console.error("[spin] claim error:", e?.message ?? e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }
}
