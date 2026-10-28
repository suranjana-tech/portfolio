"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";

const CONTACT_EMAIL = "suranjanaghosh2312@gmail.com";
const MESSAGE_LIMIT = 5000;
const TOPICS = ["Job opportunity", "Collaboration", "Just saying hi"];

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const inputClass =
  "w-full rounded-xl border border-[#c9c2b0] bg-white px-4 py-3 text-base text-[var(--ink)] shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#9aa393] hover:border-[var(--pine)]/50 focus:border-[var(--pine)] focus:ring-4 focus:ring-[var(--gold)]/25 aria-[invalid=true]:border-[#a12d21] aria-[invalid=true]:focus:ring-[#a12d21]/20 motion-reduce:transition-none";

function Field({
  id,
  label,
  optional,
  error,
  valid,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  valid?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-[var(--pine-dark)]">
        {label}
        {optional && <span className="ml-1 font-normal text-[#6b7566]">(optional)</span>}
      </label>
      <div className="relative">
        {children}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--pine)] text-white transition-[transform,opacity] duration-300 motion-reduce:transition-none ${
            valid ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
      </div>
      <p
        id={`${id}-error`}
        className="min-h-5 text-sm text-[#a12d21] motion-safe:animate-fade-up"
        role={error ? "alert" : undefined}
      >
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const [sentTo, setSentTo] = useState<{ name: string; email: string } | null>(null);
  const [topic, setTopic] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setFocus,
    getValues,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ContactFields>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  const [nameValue, emailValue, phoneValue, messageValue] = useWatch({
    control,
    name: ["name", "email", "phone", "message"],
  });
  const messageLength = messageValue.length;
  const isValid = (field: "name" | "email" | "phone", value: string) =>
    Boolean(touchedFields[field]) && !errors[field] && value.trim().length > 0;

  useEffect(() => {
    if (sentTo) {
      successRef.current?.focus();
    }
  }, [sentTo]);

  async function onSubmit(fields: ContactFields) {
    clearErrors("root");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, topic }),
      });
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "Your message could not be sent. Please try again.";
        setError("root", { message });
        return;
      }
      setSentTo({ name: fields.name.trim(), email: fields.email.trim() });
      setTopic("");
      reset();
    } catch {
      setError("root", {
        message: "Unable to reach the server. Check your connection and try again.",
      });
    }
  }

  function writeAnother() {
    setSentTo(null);
    requestAnimationFrame(() => setFocus("name"));
  }

  const draft = getValues();
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Portfolio enquiry from ${draft.name || "a visitor"}`
  )}&body=${encodeURIComponent(draft.message.slice(0, 1500))}`;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-6 text-left shadow-xl ring-1 ring-[var(--line)] motion-safe:animate-fade-up sm:p-8">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--pine)] via-[var(--gold)] to-[var(--gold-soft)]"
      />

      {sentTo ? (
        <div role="status" className="flex flex-col items-center gap-4 py-8 text-center motion-safe:animate-fade-up">
          <span className="flex size-20 items-center justify-center rounded-full bg-[var(--pine)] text-[var(--gold-soft)] shadow-lg motion-safe:animate-pop-in">
            <svg className="size-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path pathLength="1" className="[stroke-dasharray:1] motion-safe:animate-draw-check" d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h3 ref={successRef} tabIndex={-1} className="text-2xl! font-bold text-[var(--pine-dark)] outline-none">
            Thank you{sentTo.name ? `, ${sentTo.name.split(" ")[0]}` : ""}!
          </h3>
          <p className="max-w-sm text-[#3d4a3d]">
            Your message has been sent. I&apos;ll reply to <strong>{sentTo.email}</strong>.
          </p>
          <button
            type="button"
            onClick={writeAnother}
            className="mt-2 cursor-pointer rounded-xl border border-[var(--pine)] px-5 py-2.5 font-semibold text-[var(--pine)] transition-colors duration-200 hover:bg-[var(--pine)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pine)] motion-reduce:transition-none"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-4 sm:grid-cols-2">
          <fieldset className="mb-4 sm:col-span-2">
            <legend className="mb-2 text-sm font-semibold text-[var(--pine-dark)]">
              What&apos;s this about? <span className="font-normal text-[#6b7566]">(optional)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((option) => {
                const selected = topic === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTopic(selected ? "" : option)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-[background-color,color,box-shadow,translate] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pine)] motion-safe:active:scale-95 motion-reduce:transition-none ${
                      selected
                        ? "bg-[var(--pine)] text-white ring-[var(--pine)]"
                        : "bg-[var(--cream)] text-[var(--pine-dark)] ring-[var(--line)] hover:bg-[var(--gold-soft)]/60 hover:ring-[var(--gold)]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Field id="contact-name" label="Name *" error={errors.name?.message} valid={isValid("name", nameValue)}>
            <input
              id="contact-name"
              autoComplete="name"
              maxLength={100}
              placeholder="Your name"
              className={`${inputClass} pr-11`}
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-error"
              {...register("name", {
                required: "Please enter your name.",
                validate: (value) => value.trim().length > 0 || "Please enter your name.",
                maxLength: 100,
              })}
            />
          </Field>
          <Field id="contact-email" label="Email *" error={errors.email?.message} valid={isValid("email", emailValue)}>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="you@company.com"
              className={`${inputClass} pr-11`}
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-error"
              {...register("email", {
                required: "Please enter your email.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
                maxLength: 254,
              })}
            />
          </Field>
          <Field
            id="contact-phone"
            label="Phone"
            optional
            className="sm:col-span-2"
            error={errors.phone?.message}
            valid={isValid("phone", phoneValue)}
          >
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="+49 …"
              className={`${inputClass} pr-11`}
              aria-invalid={!!errors.phone}
              aria-describedby="contact-phone-error"
              {...register("phone", {
                pattern: { value: /^[+()\d\s.-]{5,40}$/, message: "Enter a valid phone number, or leave it blank." },
              })}
            />
          </Field>
          <div className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
            <div className="flex items-end justify-between gap-3">
              <label htmlFor="contact-message" className="text-sm font-semibold text-[var(--pine-dark)]">
                Message *
              </label>
              <span
                aria-hidden="true"
                className={`text-xs tabular-nums ${messageLength > MESSAGE_LIMIT * 0.9 ? "font-bold text-[#a12d21]" : "text-[#6b7566]"}`}
              >
                {messageLength}/{MESSAGE_LIMIT}
              </span>
            </div>
            <textarea
              id="contact-message"
              rows={5}
              maxLength={MESSAGE_LIMIT}
              placeholder="Tell me about the role, project or idea…"
              className={`${inputClass} min-h-32 resize-y`}
              aria-invalid={!!errors.message}
              aria-describedby="contact-message-error contact-message-hint"
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                  event.preventDefault();
                  void handleSubmit(onSubmit)();
                }
              }}
              {...register("message", {
                required: "Please enter a message.",
                validate: (value) => value.trim().length > 0 || "Please enter a message.",
                maxLength: MESSAGE_LIMIT,
              })}
            />
            <p id="contact-message-error" className="min-h-5 text-sm text-[#a12d21] motion-safe:animate-fade-up" role={errors.message ? "alert" : undefined}>
              {errors.message?.message}
            </p>
            <span id="contact-message-hint" className="sr-only">
              Press Control and Enter to send.
            </span>
          </div>

          <div aria-hidden="true" className="absolute size-px overflow-hidden [clip-path:inset(50%)]">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          {errors.root && (
            <div role="alert" className="mb-4 rounded-xl bg-[#fbeceb] p-4 text-sm text-[#7a1f16] ring-1 ring-[#a12d21]/30 sm:col-span-2 motion-safe:animate-fade-up">
              <p className="font-semibold">{errors.root.message}</p>
              <p className="mt-1">
                You can also{" "}
                <a href={mailto} className="font-bold underline underline-offset-2">
                  email me directly
                </a>
                .
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
            <p className="hidden text-xs text-[#6b7566] sm:block">
              Tip: press <kbd className="rounded border border-[#c9c2b0] bg-[var(--cream)] px-1.5 py-0.5 font-sans">Ctrl</kbd> +{" "}
              <kbd className="rounded border border-[#c9c2b0] bg-[var(--cream)] px-1.5 py-0.5 font-sans">Enter</kbd> to send
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group ml-auto inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[var(--pine)] px-6 py-3 font-bold whitespace-nowrap text-white shadow-md transition-[background-color,box-shadow,translate] duration-200 hover:bg-[var(--pine-dark)] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pine)] disabled:cursor-wait disabled:opacity-80 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-reduce:transition-none max-sm:w-full"
            >
              {isSubmitting ? (
                <>
                  <svg className="size-5 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <svg className="size-5 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </>
              )}
            </button>
          </div>
          <p className="mt-4 text-xs text-[#6b7566] sm:col-span-2">
            Your details are used only to reply to your enquiry.
          </p>
        </form>
      )}
    </div>
  );
}
