"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { commissionTypes } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";
import { useDictionary, useDictLocale } from "@/components/i18n/locale-provider";

const initialForm = {
  name: "",
  email: "",
  preferredContact: "telegram",
  handle: "",
  commissionType: "",
  budget: "",
  deadline: "",
  references: "",
  language: "",
  description: "",
  agreedTerms: false,
  consent: false,
};

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-border-default bg-bg-inset px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-[var(--duration-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary-soft)]";

export function ContactForm() {
  const dict = useDictionary();
  const locale = useDictLocale() || "en";
  const t = dict?.commissions ?? {};

  const [form, setForm] = useState({
    ...initialForm,
    language: locale === "ru" ? "russian" : "english",
  });
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

    if (
      !form.name ||
      !form.email ||
      !form.commissionType ||
      !form.description
    ) {
      setError(t.formMissing || "please fill all required fields.");
      return;
    }
    if (!form.agreedTerms) {
      setError(t.formNeedTerms || "please agree to terms before submitting.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      setForm({
        ...initialForm,
        language: locale === "ru" ? "russian" : "english",
      });
    } catch {
      setStatus("error");
      setError(
        t.formError || "could not submit right now. please try again later.",
      );
    }
  };

  return (
    <form
      className="space-y-8"
      onSubmit={onSubmit}
      aria-label="contact and commission request form"
    >
      <Fieldset legend={t.formGroupYou || "about you"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={t.formName || "name"}
            name="name"
            value={form.name}
            required
            onChange={onChange}
          />
          <Field
            label={t.formEmail || "email"}
            name="email"
            value={form.email}
            required
            type="email"
            onChange={onChange}
          />
        </div>

        <RadioGroup
          legend={t.formPreferredContact || "preferred contact method"}
          name="preferredContact"
          value={form.preferredContact}
          onChange={onChange}
          options={[
            { value: "telegram", label: t.formContactTelegram || "telegram" },
            { value: "email", label: t.formContactEmail || "email" },
            { value: "discord", label: t.formContactDiscord || "discord" },
          ]}
        />

        <Field
          label={t.formHandle || "telegram or discord handle"}
          name="handle"
          value={form.handle}
          optional
          onChange={onChange}
        />
      </Fieldset>

      <Fieldset legend={t.formGroupProject || "project details"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label={t.formCommissionType || "commission type"}
            name="commissionType"
            value={form.commissionType}
            required
            onChange={onChange}
            options={commissionTypes.map((c) => ({
              value: c.id,
              label: pickLocale(c.title, locale),
            }))}
          />
          <SelectField
            label={t.formLanguage || "preferred language"}
            name="language"
            value={form.language}
            onChange={onChange}
            options={[
              { value: "english", label: "english" },
              { value: "russian", label: "русский" },
            ]}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={t.formBudget || "budget"}
            optional
            name="budget"
            value={form.budget}
            onChange={onChange}
          />
          <Field
            label={t.formDeadline || "deadline"}
            optional
            name="deadline"
            value={form.deadline}
            type="date"
            onChange={onChange}
          />
        </div>
        <Field
          label={t.formReferences || "reference link"}
          optional
          name="references"
          value={form.references}
          onChange={onChange}
        />
        <FieldShell label={t.formDescription || "description"} required>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            rows={5}
            className={inputClass}
            placeholder={
              t.formDescriptionPlaceholder ||
              "tell me about your idea, mood, references..."
            }
          />
        </FieldShell>
      </Fieldset>

      <Fieldset legend={t.formGroupConfirm || "confirm"}>
        <div className="space-y-3">
          <Checkbox
            label={t.formAgreeTerms || "i agree to commission terms above"}
            required
            name="agreedTerms"
            checked={form.agreedTerms}
            onChange={onChange}
          />
          <Checkbox
            label={
              t.formConsent ||
              "i consent to being contacted about this request"
            }
            name="consent"
            checked={form.consent}
            onChange={onChange}
          />
        </div>
      </Fieldset>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="form-error"
            role="alert"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="rounded-[var(--radius-md)] border border-[color:var(--error)]/40 bg-[color:var(--error)]/10 px-3 py-2 text-sm text-error"
          >
            {error}
          </motion.p>
        ) : null}
        {status === "success" ? (
          <motion.p
            key="form-success"
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            className="rounded-[var(--radius-md)] border border-[color:var(--success)]/40 bg-[color:var(--success)]/10 px-3 py-2 text-sm text-success"
          >
            {t.formSuccess || "request sent. thanks for reaching out."}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4">
        <p className="caption">{t.formFootnote || ""}</p>
        <Button
          type="submit"
          variant="primary"
          loading={status === "submitting"}
        >
          {dict?.common?.sendRequest || "send request"}
        </Button>
      </div>
    </form>
  );
}

function Fieldset({ legend, children }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function FieldShell({ label, required, optional, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-1.5 text-[0.8125rem] font-medium text-text-secondary">
        <span>{label}</span>
        {required && <span className="text-highlight">*</span>}
        {optional && <span className="caption">optional</span>}
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
  optional = false,
  type = "text",
}) {
  const id = useId();
  return (
    <FieldShell label={label} required={required} optional={optional}>
      <input
        id={id}
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

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  const id = useId();
  return (
    <FieldShell label={label} required={required}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      >
        <option value="">—</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function RadioGroup({ legend, name, value, onChange, options }) {
  return (
    <fieldset>
      <legend className="text-[0.8125rem] font-medium text-text-secondary">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-[0.8125rem] transition-colors ${
                active
                  ? "border-border-accent bg-accent-soft text-text-primary"
                  : "border-border-default bg-bg-inset text-text-secondary hover:border-border-strong"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={onChange}
                className="sr-only"
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Checkbox({ label, name, checked, onChange, required = false }) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-start gap-3 text-[0.8125rem] text-text-secondary"
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border border-border-default bg-bg-inset accent-[color:var(--accent-primary)]"
      />
      <span className="transition-colors group-hover:text-text-primary">
        {label}
        {required && <span className="ml-1 text-highlight">*</span>}
      </span>
    </label>
  );
}
