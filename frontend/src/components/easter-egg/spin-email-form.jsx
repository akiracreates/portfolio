"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SpinEmailForm({
  onSubmit,
  emailLabel,
  emailPlaceholder,
  ctaLabel,
  emailRequiredMessage,
  emailInvalidMessage,
  disabled = false,
  serverMessage = "",
  onClearServerMessage,
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const trimmed = email.trim().toLowerCase();
  const canSubmit =
    !disabled && trimmed.length > 0 && EMAIL_RE.test(trimmed);

  const handle = (event) => {
    event.preventDefault();
    setError("");
    const next = email.trim().toLowerCase();
    if (!next) {
      setError(emailRequiredMessage);
      return;
    }
    if (!EMAIL_RE.test(next)) {
      setError(emailInvalidMessage);
      return;
    }
    onSubmit(next);
  };

  return (
    <form
      className="scrap-caption mx-auto max-w-md space-y-4 px-5 py-5"
      onSubmit={handle}
      noValidate
    >
      <label htmlFor={id} className="block text-[0.8125rem] font-medium text-text-secondary">
        {emailLabel}
      </label>
      <input
        id={id}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          onClearServerMessage?.();
        }}
        placeholder={emailPlaceholder}
        autoComplete="email"
        disabled={disabled}
        className="w-full rounded-[var(--radius-md)] border border-dashed border-border-default bg-bg-inset px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-[var(--duration-fast)] focus:border-highlight focus:outline-none focus:ring-2 focus:ring-[color:var(--highlight-soft)] disabled:cursor-not-allowed disabled:opacity-70"
        aria-invalid={Boolean(error || serverMessage) || undefined}
      />
      {(error || serverMessage) && (
        <p
          role="alert"
          className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--error)]/40 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error"
        >
          {error || serverMessage}
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={disabled || !canSubmit}
      >
        {ctaLabel}
      </Button>
    </form>
  );
}
