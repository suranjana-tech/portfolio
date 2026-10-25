"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>();

  async function onSubmit(values: ContactFields) {
    setSent(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const result: unknown = await response.json();
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
      reset();
      setSent(true);
    } catch {
      setError("root", {
        message: "Unable to reach the server. Check your connection and try again.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="contact-field">
        <label htmlFor="contact-name">Name *</label>
        <input id="contact-name" autoComplete="name" maxLength={100}
          aria-invalid={!!errors.name} aria-describedby="contact-name-error"
          {...register("name", {
            required: "Please enter your name.",
            validate: (value) => value.trim().length > 0 || "Please enter your name.",
            maxLength: 100,
          })} />
        <span id="contact-name-error" className="field-error">{errors.name?.message}</span>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Email *</label>
        <input id="contact-email" type="email" autoComplete="email" maxLength={254}
          aria-invalid={!!errors.email} aria-describedby="contact-email-error"
          {...register("email", {
            required: "Please enter your email.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
            maxLength: 254,
          })} />
        <span id="contact-email-error" className="field-error">{errors.email?.message}</span>
      </div>
      <div className="contact-field contact-field-wide">
        <label htmlFor="contact-phone">Phone <span>(optional)</span></label>
        <input id="contact-phone" type="tel" autoComplete="tel" maxLength={40}
          aria-invalid={!!errors.phone} aria-describedby="contact-phone-error"
          {...register("phone", {
            pattern: { value: /^[+()\d\s.-]{5,40}$/, message: "Enter a valid phone number, or leave it blank." },
          })} />
        <span id="contact-phone-error" className="field-error">{errors.phone?.message}</span>
      </div>
      <div className="contact-field contact-field-wide">
        <label htmlFor="contact-message">Message *</label>
        <textarea id="contact-message" rows={4} maxLength={5000}
          aria-invalid={!!errors.message} aria-describedby="contact-message-error"
          {...register("message", {
            required: "Please enter a message.",
            validate: (value) => value.trim().length > 0 || "Please enter a message.",
            maxLength: 5000,
          })} />
        <span id="contact-message-error" className="field-error">{errors.message?.message}</span>
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="contact-form-footer">
        <p role={errors.root ? "alert" : "status"} className={errors.root ? "field-error" : "form-status"}>
          {errors.root?.message || (sent ? "Message sent! Thank you for getting in touch." : "")}
        </p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </div>
      <p className="contact-privacy">Your details are emailed to Suranjana to respond to your enquiry.</p>
    </form>
  );
}
