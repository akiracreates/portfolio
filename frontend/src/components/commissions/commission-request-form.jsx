"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { pickLocale } from "@/lib/i18n/config";

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-dashed border-border-default bg-bg-inset px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] focus:border-highlight focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-[color:var(--highlight-soft)]";

const initialForm = {
  name: "",
  email: "",
  handle: "",
  preferredContact: "email",
  commissionType: "",
  description: "",
  references: "",
  agreedTerms: false,
  website: "",
};

const MIN_DESCRIPTION_LEN = 10;

export function CommissionRequestForm({ locale = "en", content }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("idle");

    if (!form.name || !form.email || !form.commissionType || !form.description) {
      setError(pickLocale(content.requiredError, locale));
      return;
    }
    if (form.description.trim().length < MIN_DESCRIPTION_LEN) {
      setError(pickLocale(content.descriptionTooShort, locale));
      return;
    }
    if (!form.agreedTerms) {
      setError(pickLocale(content.termsError, locale));
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/commission-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          handle: form.handle,
          preferredContact: form.preferredContact,
          commissionType: form.commissionType,
          description: form.description,
          references: form.references,
          agreedTerms: form.agreedTerms,
          website: form.website,
          locale,
          formSource: "commission-request",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) {
        throw new Error("request failed");
      }
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
      setError(pickLocale(content.error, locale));
    }
  };

  const successLines = pickLocale(content.successLines, locale);
  const successLineItems = Array.isArray(successLines) ? successLines : [];

  return (
    <form onSubmit={onSubmit} className="relative space-y-4" noValidate>
      <div
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="commission-website-hp">
          website
          <input
            id="commission-website-hp"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={pickLocale(content.labels.name, locale)}
          name="name"
          value={form.name}
          required
          onChange={onChange}
        />
        <Field
          label={pickLocale(content.labels.email, locale)}
          name="email"
          value={form.email}
          required
          type="email"
          onChange={onChange}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={pickLocale(content.labels.handle, locale)}
          name="handle"
          value={form.handle}
          onChange={onChange}
        />
        <SelectField
          label={pickLocale(content.labels.preferredContact, locale)}
          name="preferredContact"
          value={form.preferredContact}
          onChange={onChange}
          options={content.options.preferredContact.map((item) => ({
            value: item.value,
            label: pickLocale(item.label, locale),
          }))}
        />
      </div>

      <SelectField
        label={pickLocale(content.labels.commissionType, locale)}
        name="commissionType"
        value={form.commissionType}
        required
        onChange={onChange}
        options={content.options.commissionType.map((item) => ({
          value: item.value,
          label: pickLocale(item.label, locale),
        }))}
      />

      <FieldShell label={pickLocale(content.labels.description, locale)} required>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          required
          rows={5}
          className={inputClass}
          placeholder={pickLocale(content.placeholders.description, locale)}
        />
      </FieldShell>

      <FieldShell label={pickLocale(content.labels.references, locale)}>
        <textarea
          name="references"
          value={form.references}
          onChange={onChange}
          rows={3}
          className={inputClass}
          placeholder={pickLocale(content.placeholders.references, locale)}
        />
      </FieldShell>

      <label className="flex items-start gap-2 text-sm text-text-secondary">
        <input
          type="checkbox"
          name="agreedTerms"
          checked={form.agreedTerms}
          onChange={onChange}
          className="mt-1 h-4 w-4 rounded-[4px] border border-dashed border-border-default bg-bg-inset accent-[color:var(--highlight)]"
        />
        <span>
          {pickLocale(content.labels.terms, locale)}
          <span className="text-highlight"> *</span>
        </span>
      </label>

      {error ? (
        <p className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--error)]/45 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error">
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <div className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--success)]/45 bg-[color:var(--success)]/10 px-3 py-2 text-sm text-success space-y-0.5">
          {successLineItems.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="caption">{pickLocale(content.note, locale)}</p>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={status === "submitting"}
          disabled={status === "submitting"}
        >
          {pickLocale(content.submit, locale)}
        </Button>
      </div>
    </form>
  );
}

function FieldShell({ label, required = false, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.8125rem] font-medium text-text-secondary">
        {label}
        {required ? <span className="text-highlight"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function Field({ label, name, value, onChange, required = false, type = "text" }) {
  return (
    <FieldShell label={label} required={required}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      />
    </FieldShell>
  );
}

function SelectField({ label, name, value, onChange, options = [], required = false }) {
  return (
    <FieldShell label={label} required={required}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      >
        <option value="">-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
