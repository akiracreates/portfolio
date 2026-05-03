"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setError("could not submit right now. please try again later.");
    }
  };

  return (
    <form
      className="card-inner space-y-5 p-5 sm:p-6"
      onSubmit={onSubmit}
      aria-label="contact and commission request form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="name" name="name" value={form.name} required onChange={onChange} />
        <Field label="email" name="email" value={form.email} required type="email" onChange={onChange} />
        <Field label="social handle (optional)" name="socialHandle" value={form.socialHandle} onChange={onChange} />
        <Field label="commission type" name="commissionType" value={form.commissionType} required onChange={onChange} />
        <Field label="budget (optional)" name="budget" value={form.budget} onChange={onChange} />
        <Field label="deadline (optional)" name="deadline" value={form.deadline} type="date" onChange={onChange} />
      </div>

      <Field label="reference link (optional)" name="references" value={form.references} onChange={onChange} />

      <label className="flex flex-col gap-2 text-xs text-text-secondary">
        description *
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          required
          rows={5}
          className="input-cute px-3 py-2 text-sm transition-colors duration-[var(--duration-fast)]"
        />
      </label>

      <div className="space-y-3">
        <Checkbox
          label="i agree to commission terms and conditions *"
          name="agreedTerms"
          checked={form.agreedTerms}
          onChange={onChange}
        />
        <Checkbox
          label="i consent to being contacted about this request"
          name="consent"
          checked={form.consent}
          onChange={onChange}
        />
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="form-error"
            role="alert"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-error"
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-success"
          >
            request sent. thanks for reaching out.
          </motion.p>
        ) : null}
      </AnimatePresence>

      <Button type="submit" variant="primary" loading={status === "submitting"}>
        submit
      </Button>
    </form>
  );
}

function Field({ label, name, value, onChange, required = false, type = "text" }) {
  return (
    <label className="flex flex-col gap-2 text-xs text-text-secondary">
      {label}{required && " *"}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="input-cute px-3 py-2 text-sm transition-colors duration-[var(--duration-fast)]"
      />
    </label>
  );
}

function Checkbox({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 text-xs text-text-secondary cursor-pointer group">
      <input
        className="h-4 w-4 rounded-md border-2 border-dashed border-primary/40 bg-bg-inset accent-primary transition-colors"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="group-hover:text-text-primary transition-colors duration-[var(--duration-fast)]">
        {label}
      </span>
    </label>
  );
}
