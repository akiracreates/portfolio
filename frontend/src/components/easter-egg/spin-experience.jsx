"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { SpinEmailForm } from "@/components/easter-egg/spin-email-form";
import { SpinWheel } from "@/components/easter-egg/spin-wheel";
import { getRewardsForLocale } from "@/lib/content/rewards";
import { pickLocale } from "@/lib/i18n/config";

const STORAGE_KEY = "akira.spin.emails.v1";

function loadSeen() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSeen(emails) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
  } catch {
    /* ignore */
  }
}

export function SpinExperience({ dict, locale }) {
  const t = dict.spin;
  const rewards = getRewardsForLocale(locale);

  const [step, setStep] = useState("email"); // 'email' | 'spinning' | 'result'
  const [email, setEmail] = useState("");
  const [reward, setReward] = useState(null);
  const [alreadySpun, setAlreadySpun] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleEmailSubmit = useCallback((submittedEmail) => {
    const seen = loadSeen();
    if (seen.includes(submittedEmail)) {
      setAlreadySpun(true);
      return;
    }
    setAlreadySpun(false);
    setEmail(submittedEmail);
    setStep("spinning");
  }, []);

  const handleResult = useCallback(
    async (chosen) => {
      setReward(chosen);
      setStep("result");

      const seen = loadSeen();
      if (!seen.includes(email)) {
        seen.push(email);
        saveSeen(seen);
      }

      try {
        const res = await fetch("/api/spin", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email,
            rewardId: chosen.id,
            locale,
          }),
        });
        if (!res.ok) {
          setSubmitError(t.failed);
        }
      } catch {
        setSubmitError(t.failed);
      }
    },
    [email, locale, t.failed],
  );

  return (
    <>
      {/* desktop experience */}
      <div className="desktop-only">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-xl space-y-8 text-center">
            <header className="space-y-3">
              <Heading level="display">{t.pageTitle}</Heading>
              <p className="body-lg">{t.pageDescription}</p>
            </header>

            {step === "email" && (
              <SpinEmailForm
                onSubmit={handleEmailSubmit}
                emailLabel={t.emailLabel}
                emailPlaceholder={t.emailPlaceholder}
                ctaLabel={t.spinCta}
                invalidMessage={t.invalidEmail}
                alreadySpun={alreadySpun}
                alreadyMessage={t.alreadySpun}
              />
            )}

            {step === "spinning" && (
              <SpinWheel
                rewards={rewards}
                locale={locale}
                spinningLabel={t.spinning}
                onResult={handleResult}
              />
            )}

            {step === "result" && reward && (
              <div className="space-y-4">
                <p className="caption">{t.youWon}</p>
                <p className="heading-display text-highlight">
                  {pickLocale(reward.label, locale)}
                </p>
                <p className="body">{t.notedNote}</p>
                {submitError && (
                  <p
                    role="alert"
                    className="rounded-[var(--radius-md)] border border-[color:var(--error)]/40 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error"
                  >
                    {submitError}
                  </p>
                )}
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

      {/* mobile fallback */}
      <div className="mobile-only">
        <Container className="py-20">
          <div className="mx-auto max-w-md space-y-6 text-center">
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
