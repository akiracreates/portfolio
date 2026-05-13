"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { SpinEmailForm } from "@/components/easter-egg/spin-email-form";
import { SpinWheel } from "@/components/easter-egg/spin-wheel";
import { getRewardsForLocale, getSpinRewardById } from "@/lib/content/rewards";
import { pickLocale } from "@/lib/i18n/config";

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function rewardFromStoredEntry(entry) {
  if (!entry || typeof entry.rewardId !== "string") return null;
  const fromCatalog = getSpinRewardById(entry.rewardId);
  if (fromCatalog) return fromCatalog;
  const snap = entry.rewardSnapshot;
  if (isRecord(snap) && typeof snap.id === "string") return snap;
  return null;
}

async function postSpinBegin(body) {
  const res = await fetch("/api/spin/begin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

async function postSpinCommit(body) {
  const res = await fetch("/api/spin/commit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

function errorMessageFor(code, t) {
  switch (code) {
    case "rate_limited":
      return t.rateLimited ?? t.saveError;
    case "storage_unavailable":
      return t.storageUnavailable ?? t.storageUnavailableError ?? t.saveError;
    case "pending_not_found":
    case "pending_token_mismatch":
      return t.pendingExpired ?? t.saveError;
    case "invalid_email":
      return t.emailInvalid;
    default:
      return t.saveError;
  }
}

export function SpinExperience({ dict, locale }) {
  const t = dict.spin;
  const rewards = getRewardsForLocale(locale);

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [reward, setReward] = useState(null);
  const [resultFromStorage, setResultFromStorage] = useState(false);
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailLookupError, setEmailLookupError] = useState("");
  const [syncError, setSyncError] = useState("");
  const [pendingClaim, setPendingClaim] = useState(null);
  const [emailDeliveryNote, setEmailDeliveryNote] = useState("");

  const submitClaim = useCallback(
    async () => {
      if (!pendingClaim?.token) {
        setSyncError(errorMessageFor("pending_not_found", t));
        setStep("sync-failed");
        return;
      }
      setSyncError("");
      setEmailDeliveryNote("");
      setStep("syncing");
      try {
        const { res, data } = await postSpinCommit({
          email,
          locale,
          pendingToken: pendingClaim.token,
        });

        if (!res.ok || data.ok !== true) {
          setSyncError(errorMessageFor(data?.error, t));
          setStep("sync-failed");
          return;
        }

        const record = data.record;
        if (!record?.rewardId) {
          setSyncError(t.saveError);
          setStep("sync-failed");
          return;
        }

        const displayReward = rewardFromStoredEntry(record);
        if (!displayReward) {
          setSyncError(t.saveError);
          setStep("sync-failed");
          return;
        }

        const emailInfo = data.email;
        if (
          !data.alreadySpun &&
          emailInfo &&
          (emailInfo.skipped || !emailInfo.userSent)
        ) {
          setEmailDeliveryNote(t.emailDeliveryNote);
        } else {
          setEmailDeliveryNote("");
        }

        setReward(displayReward);
        setResultFromStorage(Boolean(data.alreadySpun));
        setPendingClaim(null);
        setStep("result");
      } catch {
        setSyncError(t.saveError);
        setStep("sync-failed");
      }
    },
    [email, locale, pendingClaim, t],
  );

  const handleResult = useCallback(
    (chosen) => {
      if (pendingClaim?.rewardId && pendingClaim.rewardId !== chosen.id) {
        setSyncError(errorMessageFor("pending_token_mismatch", t));
        setStep("sync-failed");
        return;
      }
      void submitClaim();
    },
    [pendingClaim, submitClaim, t],
  );

  const handleEmailSubmit = useCallback(
    async (submittedEmail) => {
      setEmailLookupError("");
      setEmailBusy(true);
      try {
        const { res, data } = await postSpinBegin({
          email: submittedEmail,
          locale,
        });

        if (!res.ok || data.ok !== true) {
          setEmailLookupError(errorMessageFor(data?.error, t));
          return;
        }

        if (data.alreadySpun) {
          const serverReward = data.record
            ? rewardFromStoredEntry(data.record)
            : null;
          if (serverReward) {
            setEmail(submittedEmail);
            setReward(serverReward);
            setResultFromStorage(true);
            setPendingClaim(null);
            setStep("result");
            return;
          }
          setEmailLookupError(t.saveError);
          return;
        }

        if (!data.pending?.token || typeof data.pending.rewardIndex !== "number") {
          setEmailLookupError(t.saveError);
          return;
        }

        setEmail(submittedEmail);
        setResultFromStorage(false);
        setPendingClaim(data.pending);
        setStep("spinning");
      } catch {
        setEmailLookupError(t.saveError);
      } finally {
        setEmailBusy(false);
      }
    },
    [locale, t],
  );

  const handleRetryClaim = useCallback(() => {
    if (pendingClaim) void submitClaim();
  }, [pendingClaim, submitClaim]);

  return (
    <>
      <div className="hidden md:block">
        <Container className="py-20 md:py-28">
          <div className="spin-celebration mx-auto max-w-3xl space-y-8 px-5 py-6 text-center md:px-8 md:py-9">
            <header className="space-y-3 px-2 pt-1">
              <Heading level="display">{t.pageTitle}</Heading>
              <p className="body-lg mx-auto max-w-2xl">{t.pageDescription}</p>
            </header>

            {emailLookupError && step === "result" && (
              <p
                role="status"
                className="mx-auto max-w-xl rounded-[var(--radius-md)] border border-dashed border-[color:var(--error)]/40 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error"
              >
                {emailLookupError}
              </p>
            )}

            {step === "email" && (
              <SpinEmailForm
                onSubmit={handleEmailSubmit}
                emailLabel={t.emailLabel}
                emailPlaceholder={t.emailPlaceholder}
                ctaLabel={t.spinCta}
                emailRequiredMessage={t.emailRequired}
                emailInvalidMessage={t.emailInvalid}
                disabled={emailBusy}
                serverMessage={
                  step === "email" ? emailLookupError : ""
                }
                onClearServerMessage={() => setEmailLookupError("")}
              />
            )}

            {step === "spinning" && (
              <div className="mx-auto flex max-w-md flex-col gap-6">
                <div className="scrap-caption space-y-2 px-5 text-left">
                  <label
                    htmlFor="spin-email-locked"
                    className="block text-[0.8125rem] font-medium text-text-secondary"
                  >
                    {t.emailLabel}
                  </label>
                  <input
                    id="spin-email-locked"
                    type="email"
                    value={email}
                    readOnly
                    disabled
                    autoComplete="email"
                    className="w-full cursor-not-allowed rounded-[var(--radius-md)] border border-dashed border-border-default bg-bg-inset px-3.5 py-2.5 text-sm text-text-secondary opacity-90"
                  />
                </div>
                <SpinWheel
                  rewards={rewards}
                  targetIndex={pendingClaim?.rewardIndex}
                  locale={locale}
                  spinningLabel={t.spinning}
                  spinButtonLabel={t.spinButton}
                  onResult={handleResult}
                />
              </div>
            )}

            {step === "syncing" && (
              <div className="scrap-caption mx-auto max-w-md space-y-4 px-5 py-8">
                <p className="body text-text-secondary">{t.savingReward}</p>
              </div>
            )}

            {step === "sync-failed" && (
              <div className="scrap-caption mx-auto max-w-md space-y-4 px-5 py-6">
                <p
                  role="alert"
                  className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--error)]/40 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error"
                >
                  {syncError || t.saveError}
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleRetryClaim}
                  disabled={!pendingClaim}
                >
                  {t.retrySave}
                </Button>
              </div>
            )}

            {step === "result" && reward && (
              <div className="scrap-caption mx-auto max-w-xl space-y-4 px-6 py-6">
                {resultFromStorage && (
                  <p
                    role="status"
                    className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--warning)]/40 bg-[color:var(--warning)]/10 px-3 py-2 text-sm text-warning"
                  >
                    {t.alreadySpunWithReward}
                  </p>
                )}
                {emailDeliveryNote && (
                  <p
                    role="status"
                    className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--warning)]/40 bg-[color:var(--warning)]/10 px-3 py-2 text-sm text-warning"
                  >
                    {emailDeliveryNote}
                  </p>
                )}
                <p className="caption">{t.youWon}</p>
                <p className="heading-display text-highlight">
                  {pickLocale(reward.label, locale)}
                </p>
                <p className="body">{t.notedNote}</p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <Button
                    as="link"
                    href={`/${locale}/commissions`}
                    variant="primary"
                    size="md"
                  >
                    {t.backToCommissions}
                  </Button>
                  <Button
                    as="link"
                    href={`/${locale}`}
                    variant="outline"
                    size="md"
                  >
                    {dict.common.backHome}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      <div className="md:hidden">
        <Container className="py-20">
          <div className="spin-celebration mx-auto max-w-md space-y-6 px-6 py-7 text-center">
            <Heading level="h1">{t.desktopOnlyTitle}</Heading>
            <p className="body">{t.desktopOnlyBody}</p>
            <Button
              as="link"
              href={`/${locale}`}
              variant="primary"
              size="md"
            >
              {dict.common.backHome}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
