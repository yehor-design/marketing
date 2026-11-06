"use client";

import { useState } from "react";
import { RollingText } from "@/components/motion";
import styles from "@/components/contact/contact.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REASONS = [
  { value: "general", label: "General" },
  { value: "support", label: "Support" },
  { value: "sales", label: "Sales" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
] as const;

type Errors = {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
};

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("Full name") ?? "").trim();
  const email = String(data.get("Email") ?? "").trim();
  const reason = String(data.get("Inquiry type") ?? "").trim();
  const message = String(data.get("Message") ?? "").trim();

  if (!name) {
    errors.name = "Enter your full name.";
  }
  if (!email) {
    errors.email = "Enter your email.";
  } else if (!EMAIL.test(email)) {
    errors.email = "Enter a valid email.";
  }
  if (!reason) {
    errors.reason = "Select a reason for contact.";
  }
  if (!message) {
    errors.message = "Tell us how we can help.";
  }
  return errors;
}

export function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <div className={styles.page}>
      <section className={styles.frame} aria-labelledby="contact-title">
        <div className={styles.intro}>
          <div className={styles.introCopy}>
            <h1 id="contact-title">Get in touch with Jet</h1>
            <p>
              We’re here to help—whether you have a question, or need support. Reach out and our
              team will get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className={styles.panel}>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              setErrors({});
              setDone(true);
            }}
          >
            <div className={styles.heading}>
              <h2>Send us a message</h2>
              <p>We’d love to hear from you.</p>
            </div>
            <div className={styles.split}>
              <label className={styles.field} htmlFor="contact-name">
                <span>Full name</span>
                <input
                  id="contact-name"
                  name="Full name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  required
                  disabled={done}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name ? (
                  <span className={styles.fieldError} id="contact-name-error" role="alert">
                    {errors.name}
                  </span>
                ) : null}
              </label>
              <label className={styles.field} htmlFor="contact-email">
                <span>Email</span>
                <input
                  id="contact-email"
                  name="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="orin@framer.com"
                  required
                  disabled={done}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email ? (
                  <span className={styles.fieldError} id="contact-email-error" role="alert">
                    {errors.email}
                  </span>
                ) : null}
              </label>
            </div>
            <label className={styles.field} htmlFor="contact-reason">
              <span>Reason for contact</span>
              <select
                id="contact-reason"
                name="Inquiry type"
                required
                disabled={done}
                value={reason}
                data-empty={reason ? undefined : "true"}
                aria-invalid={errors.reason ? true : undefined}
                aria-describedby={errors.reason ? "contact-reason-error" : undefined}
                onChange={(event) => setReason(event.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {REASONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.reason ? (
                <span className={styles.fieldError} id="contact-reason-error" role="alert">
                  {errors.reason}
                </span>
              ) : null}
            </label>
            <label className={styles.field} htmlFor="contact-message">
              <span>How can we help?</span>
              <textarea
                id="contact-message"
                name="Message"
                placeholder="Tell us what you need help with…"
                required
                disabled={done}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message ? (
                <span className={styles.fieldError} id="contact-message-error" role="alert">
                  {errors.message}
                </span>
              ) : null}
            </label>
            {done ? (
              <p className={styles.success} role="status">
                We&apos;ll get back to you soon!
              </p>
            ) : (
              <button
                className={styles.submit}
                type="submit"
                onPointerEnter={() => setRolling(true)}
                onPointerLeave={() => setRolling(false)}
                onFocus={() => setRolling(true)}
                onBlur={() => setRolling(false)}
              >
                <RollingText text="Get in touch" rolling={rolling} />
              </button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
