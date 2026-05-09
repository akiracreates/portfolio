"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { SpinEmailForm } from "@/components/easter-egg/spin-email-form";
import { SpinWheel } from "@/components/easter-egg/spin-wheel";
import { getRewardsForLocale, getSpinRewardById } from "@/lib/content/rewards";
import { pickLocale } from "@/lib/i18n/config";

const SPIN_RESULTS_KEY = "spinWheelResults";

/** Legacy key: not used for logic; safe remove after a successful save. */
const LEGACY_SPIN_EMAILS_KEY = "akira.spin.emails.v1";

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseSpinResultsMap() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SPIN_RESULTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!isRecord(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

function upsertSpinResultEntry(normalizedEmail, entry) {
  if (typeof window === "undefined") return;
  try {
    const map = parseSpinResultsMap();
    map[normalizedEmail] = entry;
    window.localStorage.setItem(SPIN_RESULTS_KEY, JSON.stringify(map));
    try {
      window.localStorage.removeItem(LEGACY_SPIN_EMAILS_KEY);
    } catch {
      /* ignore */
    }
  } catch {
    /* ignore */
  }
}

/** Drop a single corrupt entry so the user can spin again (full map parse already safe). */
function removeSpinResultEntry(normalizedEmail) {
  if (typeof window === "undefined") return;
  try {
    const map = parseSpinResultsMap();
    if (!map[normalizedEmail]) return;
    delete map[normalizedEmail];
    window.localStorage.setItem(SPIN_RESULTS_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function rewardFromStoredEntry(entry) {
  if (!entry || typeof entry.rewardId !== "string") return null;
  const fromCatalog = getSpinRewardById(entry.rewardId);
  if (fromCatalog) return fromCatalog;
  const snap = entry.rewardSnapshot;
  if (isRecord(snap) && typeof snap.id === "string") return snap;
  return null;
}

async function postSpin(body) {
  const res = await fetch("/api/spin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
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
  const [pendingRetryReward, setPendingRetryReward] = useState(null);
  const [emailDeliveryNote, setEmailDeliveryNote] = useState("");

  const submitClaim = useCallback(
    async (chosen) => {
      setSyncError("");
      setEmailDeliveryNote("");
      setStep("syncing");
      try {
        const { res, data } = await postSpin({
          email,
          locale,
          rewardId: chosen.id,
          spunAt: new Date().toISOString(),
        });

        if (!res.ok || data.ok !== true) {
          setSyncError(t.saveError);
          setPendingRetryReward(chosen);
          setStep("sync-failed");
          return;
        }

        const record = data.record;
        if (!record?.rewardId) {
          setSyncError(t.saveError);
          setPendingRetryReward(chosen);
          setStep("sync-failed");
          return;
        }

        upsertSpinResultEntry(email, record);
        const displayReward = rewardFromStoredEntry(record);
        if (!displayReward) {
          setSyncError(t.saveError);
          setPendingRetryReward(chosen);
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
        setPendingRetryReward(null);
        setStep("result");
      } catch {
        setSyncError(t.saveError);
        setPendingRetryReward(chosen);
        setStep("sync-failed");
      }
    },
    [email, locale, t.emailDeliveryNote, t.saveError],
  );

  const handleResult = useCallback(
    (chosen) => {
      void submitClaim(chosen);
    },
    [submitClaim],
  );

  const handleEmailSubmit = useCallback(
    async (submittedEmail) => {
      setEmailLookupError("");
      setEmailBusy(true);
      try {
        const map = parseSpinResultsMap();
        const stored = map[submittedEmail];
        const localResolved = stored ? rewardFromStoredEntry(stored) : null;

        if (stored && !localResolved) {
          removeSpinResultEntry(submittedEmail);
        }

        const { res, data } = await postSpin({
          email: submittedEmail,
          locale,
        });

        if (!res.ok || data.ok !== true) {
          if (localResolved) {
            setEmail(submittedEmail);
            setReward(localResolved);
            setResultFromStorage(true);
            setStep("result");
            setEmailLookupError(t.saveError);
            return;
          }
          setEmailLookupError(t.saveError);
          return;
        }

        if (data.alreadySpun) {
          const serverReward = data.record
            ? rewardFromStoredEntry(data.record)
            : null;
          if (serverReward) {
            upsertSpinResultEntry(submittedEmail, data.record);
            setEmail(submittedEmail);
            setReward(serverReward);
            setResultFromStorage(true);
            setStep("result");
            return;
          }
          setEmailLookupError(t.saveError);
          return;
        }

        setEmail(submittedEmail);
        setResultFromStorage(false);
        setStep("spinning");
      } catch {
        setEmailLookupError(t.saveError);
      } finally {
        setEmailBusy(false);
      }
    },
    [locale, t.saveError],
  );

  const handleRetryClaim = useCallback(() => {
    if (pendingRetryReward) void submitClaim(pendingRetryReward);
  }, [pendingRetryReward, submitClaim]);

  return (
    <>
      <div className="desktop-only">
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
                  disabled={!pendingRetryReward}
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

      <div className="mobile-only">
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
