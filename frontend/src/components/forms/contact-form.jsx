"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  socialHandle: "",
  commissionType: "",
  budget: "",
  description: "",
  deadline: "",
  references: "",
  agreedTerms: false,
  consent: false,
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.commissionType || !form.description) {
      setError("please fill all required fields.");
      return;
    }
    if (!form.agreedTerms) {
      setError("please agree to terms before submitting.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("request failed");
      }
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setError("could not submit right now. please try again later.");
    }
  };

  return (
    <form className="card-frame space-y-4 p-5" onSubmit={onSubmit} aria-label="contact and commission request form">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="name" name="name" value={form.name} required onChange={onChange} />
        <Field label="email" name="email" value={form.email} required type="email" onChange={onChange} />
        <Field label="social handle (optional)" name="socialHandle" value={form.socialHandle} onChange={onChange} />
        <Field label="commission type" name="commissionType" value={form.commissionType} required onChange={onChange} />
        <Field label="budget (optional)" name="budget" value={form.budget} onChange={onChange} />
        <Field label="deadline (optional)" name="deadline" value={form.deadline} type="date" onChange={onChange} />
      </div>
      <Field label="reference link (optional)" name="references" value={form.references} onChange={onChange} />
      <label className="flex flex-col gap-2 text-xs text-text-muted">
        description *
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          required
          rows={5}
          className="rounded-md border border-border-soft bg-bg-canvas/40 px-3 py-2 text-sm text-text-primary"
        />
      </label>
      <label className="flex items-center gap-2 text-xs text-text-muted">
        <input type="checkbox" name="agreedTerms" checked={form.agreedTerms} onChange={onChange} />
        i agree to commission terms and conditions *
      </label>
      <label className="flex items-center gap-2 text-xs text-text-muted">
        <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} />
        i consent to being contacted about this request
      </label>

      {error ? <p className="text-sm text-error">{error}</p> : null}
      {status === "success" ? <p className="text-sm text-success">request sent. thanks for reaching out.</p> : null}

      <button
        type="submit"
        className="rounded-full bg-accent-peach px-5 py-2 text-sm font-medium text-[#1b1731]"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "sending..." : "submit"}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, required = false, type = "text" }) {
  return (
    <label className="flex flex-col gap-2 text-xs text-text-muted">
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-md border border-border-soft bg-bg-canvas/40 px-3 py-2 text-sm text-text-primary"
      />
    </label>
  );
}
