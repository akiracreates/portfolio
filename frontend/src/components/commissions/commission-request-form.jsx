"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { pickLocale } from "@/lib/i18n/config";

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-dashed border-border-default bg-bg-inset px-3.5 py-2.5 text-sm max-md:min-h-[44px] text-text-primary placeholder:text-text-tertiary transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] focus:border-highlight focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-[color:var(--highlight-soft)]";

const initialForm = {
  name: "",
  email: "",
  handle: "",
  preferredContact: "email",
  commissionType: "",
  characterCount: "",
  intendedUse: "",
  background: "",
  strictDeadline: "no",
  deadlineDetails: "",
  budget: "",
  description: "",
  references: "",
  avoidances: "",
  postPermission: "",
  agreedTerms: false,
  consentData: false,
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

  const needsDeadlineDetails = form.strictDeadline === "yes";

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("idle");

    if (
      !form.name ||
      !form.email ||
      !form.commissionType ||
      !form.intendedUse ||
      !form.postPermission ||
      !form.description
    ) {
      setError(pickLocale(content.requiredError, locale));
      return;
    }
    if (form.description.trim().length < MIN_DESCRIPTION_LEN) {
      setError(pickLocale(content.descriptionTooShort, locale));
      return;
    }
    if (needsDeadlineDetails && !form.deadlineDetails.trim()) {
      setError(pickLocale(content.deadlineDetailsError, locale));
      return;
    }
    if (!form.agreedTerms) {
      setError(pickLocale(content.termsError, locale));
      return;
    }
    if (!form.consentData) {
      setError(pickLocale(content.consentDataError, locale));
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
          characterCount: form.characterCount,
          intendedUse: form.intendedUse,
          background: form.background,
          strictDeadline: form.strictDeadline,
          deadlineDetails: needsDeadlineDetails ? form.deadlineDetails : "",
          budget: form.budget,
          description: form.description,
          references: form.references,
          avoidances: form.avoidances,
          postPermission: form.postPermission,
          agreedTerms: form.agreedTerms,
          consentData: form.consentData,
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
    <form onSubmit={onSubmit} className="relative space-y-5 max-md:space-y-6" noValidate>
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

      {/* --- about you --- */}
      <div className="grid gap-4 max-md:gap-5 md:grid-cols-2">
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

      <div className="grid gap-4 max-md:gap-5 md:grid-cols-2">
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
          options={content.options.preferredContact.map((o) => ({
            value: o.value,
            label: pickLocale(o.label, locale),
          }))}
        />
      </div>

      {/* --- project details --- */}
      <div className="grid gap-4 max-md:gap-5 md:grid-cols-2">
        <SelectField
          label={pickLocale(content.labels.commissionType, locale)}
          name="commissionType"
          value={form.commissionType}
          required
          onChange={onChange}
          options={content.options.commissionType.map((o) => ({
            value: o.value,
            label: pickLocale(o.label, locale),
          }))}
        />
        <Field
          label={pickLocale(content.labels.characterCount, locale)}
          name="characterCount"
          value={form.characterCount}
          onChange={onChange}
          placeholder={pickLocale(content.placeholders.characterCount, locale)}
        />
      </div>

      <div className="grid gap-4 max-md:gap-5 md:grid-cols-2">
        <SelectFieldWithHelper
          label={pickLocale(content.labels.intendedUse, locale)}
          name="intendedUse"
          value={form.intendedUse}
          required
          onChange={onChange}
          options={content.options.intendedUse.map((o) => ({
            value: o.value,
            label: pickLocale(o.label, locale),
          }))}
          helper={pickLocale(content.helpers.intendedUse, locale)}
        />
        <SelectFieldWithHelper
          label={pickLocale(content.labels.background, locale)}
          name="background"
          value={form.background}
          onChange={onChange}
          options={content.options.background.map((o) => ({
            value: o.value,
            label: pickLocale(o.label, locale),
          }))}
          helper={pickLocale(content.helpers.background, locale)}
        />
      </div>

      {/* --- deadline --- */}
      <div className="grid gap-4 max-md:gap-5 md:grid-cols-2">
        <SelectField
          label={pickLocale(content.labels.strictDeadline, locale)}
          name="strictDeadline"
          value={form.strictDeadline}
          onChange={onChange}
          options={content.options.strictDeadline.map((o) => ({
            value: o.value,
            label: pickLocale(o.label, locale),
          }))}
          noEmpty
        />
        {needsDeadlineDetails ? (
          <Field
            label={pickLocale(content.labels.deadlineDetails, locale)}
            name="deadlineDetails"
            value={form.deadlineDetails}
            required
            onChange={onChange}
            placeholder={pickLocale(content.placeholders.deadlineDetails, locale)}
          />
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
      {needsDeadlineDetails ? (
        <p className="caption rounded-[var(--radius-md)] border border-dashed border-border-accent/40 bg-accent-soft/50 px-3.5 py-2.5 text-text-secondary max-md:text-[0.8rem] max-md:leading-relaxed">
          {pickLocale(content.helpers.deadlineWarning, locale)}
        </p>
      ) : null}

      {/* --- budget --- */}
      <FieldShell label={pickLocale(content.labels.budget, locale)}>
        <input
          name="budget"
          type="text"
          value={form.budget}
          onChange={onChange}
          className={inputClass}
          placeholder={pickLocale(content.placeholders.budget, locale)}
        />
        <Helper text={pickLocale(content.helpers.budget, locale)} />
      </FieldShell>

      {/* --- idea details --- */}
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

      <FieldShell label={pickLocale(content.labels.references, locale)} required>
        <textarea
          name="references"
          value={form.references}
          onChange={onChange}
          required
          rows={3}
          className={inputClass}
          placeholder={pickLocale(content.placeholders.references, locale)}
        />
      </FieldShell>

      <FieldShell label={pickLocale(content.labels.avoidances, locale)}>
        <textarea
          name="avoidances"
          value={form.avoidances}
          onChange={onChange}
          rows={3}
          className={`${inputClass} min-h-[5rem]`}
          placeholder={pickLocale(content.placeholders.avoidances, locale)}
        />
      </FieldShell>

      {/* --- post permission --- */}
      <SelectFieldWithHelper
        label={pickLocale(content.labels.postPermission, locale)}
        name="postPermission"
        value={form.postPermission}
        required
        onChange={onChange}
        options={content.options.postPermission.map((o) => ({
          value: o.value,
          label: pickLocale(o.label, locale),
        }))}
        helper={pickLocale(content.helpers.postPermission, locale)}
      />

      {/* --- agreements --- */}
      <div className="space-y-4 max-sm:space-y-5 pt-3 max-md:pt-4 border-t border-dashed border-border-subtle">
        <label className="flex min-h-[44px] items-start gap-2.5 text-sm text-text-secondary">
          <input
            type="checkbox"
            name="agreedTerms"
            checked={form.agreedTerms}
            onChange={onChange}
            className="mt-0.5 h-5 w-5 shrink-0 rounded-[4px] border border-dashed border-border-default bg-bg-inset accent-[color:var(--highlight)]"
          />
          <span>
            {pickLocale(content.labels.terms, locale)}
            <span className="text-highlight"> *</span>
          </span>
        </label>

        <label className="flex min-h-[44px] items-start gap-2.5 text-sm text-text-secondary">
          <input
            type="checkbox"
            name="consentData"
            checked={form.consentData}
            onChange={onChange}
            className="mt-0.5 h-5 w-5 shrink-0 rounded-[4px] border border-dashed border-border-default bg-bg-inset accent-[color:var(--highlight)]"
          />
          <span>
            {pickLocale(content.labels.consentData, locale)}
            <span className="text-highlight"> *</span>
          </span>
        </label>
      </div>

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

      <div className="flex flex-wrap items-center justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
        <p className="caption max-sm:text-center">{pickLocale(content.note, locale)}</p>
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="max-sm:w-full max-sm:min-h-[48px] max-sm:justify-center max-sm:text-base"
          loading={status === "submitting"}
          disabled={status === "submitting"}
        >
          {pickLocale(content.submit, locale)}
        </Button>
      </div>
    </form>
  );
}

function Helper({ text }) {
  if (!text) return null;
  return <p className="caption mt-1.5 text-text-secondary/80 max-md:text-[0.78rem] max-md:leading-relaxed">{text}</p>;
}

function FieldShell({ label, required = false, children }) {
  return (
    <label className="flex flex-col gap-1.5 max-md:gap-2">
      <span className="text-[0.8125rem] font-medium text-text-secondary max-md:text-sm">
        {label}
        {required ? <span className="text-highlight"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}) {
  return (
    <FieldShell label={label} required={required}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </FieldShell>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  noEmpty = false,
}) {
  return (
    <FieldShell label={label} required={required}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      >
        {!noEmpty && <option value="">-</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function SelectFieldWithHelper({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  helper,
}) {
  return (
    <div className="flex flex-col gap-1.5 max-md:gap-2">
      <span className="text-[0.8125rem] font-medium text-text-secondary max-md:text-sm">
        {label}
        {required ? <span className="text-highlight"> *</span> : null}
      </span>
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
      <Helper text={helper} />
    </div>
  );
}
