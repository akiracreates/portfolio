"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SpinEmailForm({
  onSubmit,
  emailLabel,
  emailPlaceholder,
  ctaLabel,
  invalidMessage,
  alreadySpun,
  alreadyMessage,
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handle = (event) => {
    event.preventDefault();
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError(invalidMessage);
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <form className="mx-auto max-w-md space-y-4" onSubmit={handle}>
      <label htmlFor={id} className="block text-[0.8125rem] font-medium text-text-secondary">
        {emailLabel}
      </label>
      <input
        id={id}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={emailPlaceholder}
        required
        className="w-full rounded-[var(--radius-md)] border border-border-default bg-bg-inset px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-[var(--duration-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary-soft)]"
        aria-invalid={Boolean(error) || undefined}
      />
      {error && (
        <p
          role="alert"
          className="rounded-[var(--radius-md)] border border-[color:var(--error)]/40 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error"
        >
          {error}
        </p>
      )}
      {alreadySpun && (
        <p
          role="alert"
          className="rounded-[var(--radius-md)] border border-[color:var(--warning)]/40 bg-[color:var(--warning)]/10 px-3 py-2 text-sm text-warning"
        >
          {alreadyMessage}
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        {ctaLabel}
      </Button>
    </form>
  );
}
