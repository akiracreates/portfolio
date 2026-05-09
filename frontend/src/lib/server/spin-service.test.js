import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/server/spin-storage", () => ({
  claimSpinRecord: vi.fn(),
  clearPendingSpin: vi.fn(),
  consumeSpinRateLimit: vi.fn(),
  getPendingSpin: vi.fn(),
  getSpinRecord: vi.fn(),
  setPendingSpin: vi.fn(),
}));

vi.mock("@/lib/server/spin-mail", () => ({
  sendSpinClaimEmails: vi.fn(),
}));

vi.mock("@/lib/content/rewards", () => ({
  getSpinRewardById: vi.fn(),
  pickWeightedRewardIndex: vi.fn(),
  snapshotSpinReward: vi.fn(),
  spinRewards: [{ id: "pct-5" }, { id: "flat-2" }],
}));

import { beginSpinClaim, commitSpinClaim } from "@/lib/server/spin-service";
import {
  claimSpinRecord,
  clearPendingSpin,
  consumeSpinRateLimit,
  getPendingSpin,
  getSpinRecord,
  setPendingSpin,
} from "@/lib/server/spin-storage";
import { sendSpinClaimEmails } from "@/lib/server/spin-mail";
import {
  getSpinRewardById,
  pickWeightedRewardIndex,
  snapshotSpinReward,
} from "@/lib/content/rewards";

describe("spin-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consumeSpinRateLimit.mockResolvedValue({ allowed: true });
    getSpinRecord.mockResolvedValue(null);
  });

  it("creates pending server-authoritative claim on begin", async () => {
    pickWeightedRewardIndex.mockReturnValue({
      reward: { id: "pct-5" },
      index: 0,
    });

    const res = await beginSpinClaim({
      normalizedEmail: "a@example.com",
      locale: "en",
      ip: "127.0.0.1",
    });

    expect(res.ok).toBe(true);
    expect(res.alreadySpun).toBe(false);
    expect(res.pending.rewardId).toBe("pct-5");
    expect(typeof res.pending.token).toBe("string");
    expect(setPendingSpin).toHaveBeenCalledTimes(1);
  });

  it("returns existing record on begin for already spun email", async () => {
    getSpinRecord.mockResolvedValue({
      rewardId: "pct-5",
      localeAtSpin: "en",
      spunAt: "2026-01-01T00:00:00.000Z",
      rewardSnapshot: { id: "pct-5" },
    });

    const res = await beginSpinClaim({
      normalizedEmail: "a@example.com",
      locale: "en",
      ip: "127.0.0.1",
    });

    expect(res.ok).toBe(true);
    expect(res.alreadySpun).toBe(true);
    expect(setPendingSpin).not.toHaveBeenCalled();
  });

  it("rejects commit when pending token does not match", async () => {
    getPendingSpin.mockResolvedValue({ token: "server-token", rewardId: "pct-5" });

    const res = await commitSpinClaim({
      normalizedEmail: "a@example.com",
      locale: "en",
      pendingToken: "client-token",
      ip: "127.0.0.1",
    });

    expect(res.ok).toBe(false);
    expect(res.error).toBe("pending_token_mismatch");
    expect(claimSpinRecord).not.toHaveBeenCalled();
  });

  it("commits claim and sends emails with canonical reward", async () => {
    getPendingSpin.mockResolvedValue({
      token: "server-token",
      rewardId: "pct-5",
    });
    getSpinRewardById.mockReturnValue({
      id: "pct-5",
      type: "percent",
      value: 5,
      label: { en: "5%", ru: "5%" },
    });
    snapshotSpinReward.mockReturnValue({ id: "pct-5" });
    claimSpinRecord.mockResolvedValue({
      created: true,
      record: null,
    });
    sendSpinClaimEmails.mockResolvedValue({
      userSent: true,
      adminSent: true,
      skipped: false,
      errorCode: null,
    });

    const res = await commitSpinClaim({
      normalizedEmail: "a@example.com",
      locale: "en",
      pendingToken: "server-token",
      ip: "127.0.0.1",
    });

    expect(res.ok).toBe(true);
    expect(res.alreadySpun).toBe(false);
    expect(sendSpinClaimEmails).toHaveBeenCalledTimes(1);
    expect(clearPendingSpin).toHaveBeenCalledWith("a@example.com");
  });
});

