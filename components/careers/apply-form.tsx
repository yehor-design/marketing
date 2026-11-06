"use client";

import { useState } from "react";
import { RollSubmit } from "@/components/careers/roll-link";
import styles from "@/components/careers/careers.module.css";

const FIELDS = [
  {
    name: "Full name",
    label: "Full name",
    type: "text",
    placeholder: "Jane Smith",
    autoComplete: "name",
    wide: false,
  },
  {
    name: "Email",
    label: "Email",
    type: "email",
    placeholder: "orin@framer.com",
    autoComplete: "email",
    wide: false,
  },
  {
    name: "Website/Portfolio",
    label: "Website/Portfolio (URL)",
    type: "url",
    placeholder: "https://...",
    autoComplete: "url",
    wide: true,
  },
  {
    name: "Why do you want to join",
    label: "Why do you want to join?",
    type: "textarea",
    placeholder: "Tell us about your motivations...",
    autoComplete: "off",
    wide: true,
  },
  {
    name: "Relevant experience",
    label: "Tell us about your relevant experience",
    type: "textarea",
    placeholder: "Briefly highlight your background and key strengths...",
    autoComplete: "off",
    wide: true,
  },
  {
    name: "Most proud of",
    label: "Tell us about the work you’re most proud of",
    type: "textarea",
    placeholder: "Share your proudest achievement or project…",
    autoComplete: "off",
    wide: true,
  },
] as const;

function fieldValue(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

function validate(data: FormData) {
  const errors: Record<string, string> = {};
  const fullName = fieldValue(data, "Full name");
  const email = fieldValue(data, "Email");
  const website = fieldValue(data, "Website/Portfolio");

  if (!fullName) {
    errors["Full name"] = "Enter your full name.";
  }
  if (!email) {
    errors.Email = "Enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.Email = "Enter a valid email.";
  }
  if (!website) {
    errors["Website/Portfolio"] = "Enter a website or portfolio URL.";
  } else {
    try {
      const url = new URL(website);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("protocol");
      }
    } catch {
      errors["Website/Portfolio"] = "Enter a valid URL.";
    }
  }
  if (!fieldValue(data, "Why do you want to join")) {
    errors["Why do you want to join"] = "Tell us why you want to join.";
  }
  if (!fieldValue(data, "Relevant experience")) {
    errors["Relevant experience"] = "Tell us about your relevant experience.";
  }
  if (!fieldValue(data, "Most proud of")) {
    errors["Most proud of"] = "Tell us about the work you’re most proud of.";
  }
  return errors;
}

export function ApplyForm({ title, slug }: { title: string; slug: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        setErrors({});
        setDone(true);
      }}
    >
      <div className={styles.fields}>
        {FIELDS.map((field) => {
          const error = errors[field.name];
          const errorId = error ? `${slug}-${field.name}-error` : undefined;
          const controlId = `${slug}-${field.name}`;
          return (
            <label
              key={field.name}
              className={field.wide ? styles.fieldWide : styles.field}
              htmlFor={controlId}
            >
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  id={controlId}
                  name={field.name}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={errorId}
                  disabled={done}
                />
              ) : (
                <input
                  id={controlId}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={errorId}
                  disabled={done}
                />
              )}
              {error ? (
                <span className={styles.fieldError} id={errorId} role="alert">
                  {error}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
      <input type="hidden" name="Role" value={slug} />
      {done ? (
        <p className={styles.success} role="status">
          Thanks for your application!
        </p>
      ) : (
        <RollSubmit className={styles.submit} text={`Apply for ${title}`} />
      )}
    </form>
  );
}
