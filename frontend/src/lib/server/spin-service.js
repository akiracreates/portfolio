import { randomUUID } from "node:crypto";
import {
  getSpinRewardById,
  pickWeightedRewardIndex,
  snapshotSpinReward,
  spinRewards,
} from "@/lib/content/rewards";
import { sendSpinClaimEmails } from "@/lib/server/spin-mail";
import {
  claimSpinRecord,
  clearPendingSpin,
  consumeSpinRateLimit,
  getPendingSpin,
  getSpinRecord,
  setPendingSpin,
} from "@/lib/server/spin-storage";

const BEGIN_EMAIL_LIMIT = 6;
const BEGIN_IP_LIMIT = 25;
const COMMIT_EMAIL_LIMIT = 12;
const COMMIT_IP_LIMIT = 50;
const RATE_WINDOW_SECONDS = 10 * 60;

function publicRecord(rec) {
  if (!rec) return null;
  return {
    rewardId: rec.rewardId,
    localeAtSpin: rec.localeAtSpin,
    spunAt: rec.spunAt,
    rewardSnapshot: rec.rewardSnapshot,
  };
}

function requestId() {
  return `spin_${randomUUID()}`;
}

function isLocaleRu(locale) {
  return locale === "ru";
}

async function checkLimits({ normalizedEmail, ip, stage }) {
  const emailLimit = stage === "begin" ? BEGIN_EMAIL_LIMIT : COMMIT_EMAIL_LIMIT;
  const ipLimit = stage === "begin" ? BEGIN_IP_LIMIT : COMMIT_IP_LIMIT;

  const email = await consumeSpinRateLimit(
    "email",
    normalizedEmail,
    emailLimit,
    RATE_WINDOW_SECONDS,
  );
  if (!email.allowed) return false;

  if (!ip) return true;
  const ipResult = await consumeSpinRateLimit(
    "ip",
    ip,
    ipLimit,
    RATE_WINDOW_SECONDS,
  );
  return ipResult.allowed;
}

export async function beginSpinClaim({ normalizedEmail, locale, ip }) {
  const spinRequestId = requestId();
  const allow = await checkLimits({ normalizedEmail, ip, stage: "begin" });
  if (!allow) {
    return { ok: false, error: "rate_limited", status: 429, spinRequestId };
  }

  const existing = await getSpinRecord(normalizedEmail);
  if (existing) {
    return {
      ok: true,
      alreadySpun: true,
      record: publicRecord(existing),
      spinRequestId,
    };
  }

  const draw = pickWeightedRewardIndex(spinRewards);
  if (!draw.reward || draw.index < 0) {
    return { ok: false, error: "no_rewards_available", status: 500, spinRequestId };
  }

  const token = randomUUID();
  const pending = {
    token,
    rewardId: draw.reward.id,
    rewardIndex: draw.index,
    localeAtBegin: isLocaleRu(locale) ? "ru" : "en",
    createdAt: new Date().toISOString(),
    spinRequestId,
  };

  await setPendingSpin(normalizedEmail, pending);

  return {
    ok: true,
    alreadySpun: false,
    pending: {
      token,
      rewardIndex: draw.index,
      rewardId: draw.reward.id,
    },
    spinRequestId,
  };
}

export async function commitSpinClaim({
  normalizedEmail,
  locale,
  pendingToken,
  ip,
}) {
  const spinRequestId = requestId();
  const allow = await checkLimits({ normalizedEmail, ip, stage: "commit" });
  if (!allow) {
    return { ok: false, error: "rate_limited", status: 429, spinRequestId };
  }

  const existing = await getSpinRecord(normalizedEmail);
  if (existing) {
    return {
      ok: true,
      alreadySpun: true,
      record: publicRecord(existing),
      spinRequestId,
    };
  }

  const pending = await getPendingSpin(normalizedEmail);
  if (!pending || !pending.token) {
    return {
      ok: false,
      error: "pending_not_found",
      status: 409,
      spinRequestId,
    };
  }
  if (pending.token !== pendingToken) {
    return {
      ok: false,
      error: "pending_token_mismatch",
      status: 409,
      spinRequestId,
    };
  }

  const canonical = getSpinRewardById(pending.rewardId);
  if (!canonical) {
    return {
      ok: false,
      error: "invalid_reward",
      status: 500,
      spinRequestId,
    };
  }

  const record = {
    normalizedEmail,
    rewardId: canonical.id,
    localeAtSpin: isLocaleRu(locale) ? "ru" : "en",
    spunAt: new Date().toISOString(),
    rewardSnapshot: snapshotSpinReward(canonical),
  };

  const claim = await claimSpinRecord(normalizedEmail, record);
  await clearPendingSpin(normalizedEmail);

  if (!claim.created && claim.record) {
    return {
      ok: true,
      alreadySpun: true,
      record: publicRecord(claim.record),
      spinRequestId,
    };
  }

  const email = await sendSpinClaimEmails({
    toUserEmail: normalizedEmail,
    locale: record.localeAtSpin,
    reward: canonical,
    record,
  });

  return {
    ok: true,
    alreadySpun: false,
    record: publicRecord(record),
    email,
    spinRequestId,
  };
}

