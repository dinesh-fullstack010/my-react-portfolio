import React, { useState, useRef } from "react";
import { profile } from "../data/portfolio";
export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");
  const busy = useRef(false);
  async function submit(e) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    if (fields.get("_honey")) return;
    if (
      ["name", "subject", "message"].some(
        (key) => !String(fields.get(key) || "").trim(),
      )
    ) {
      setStatus("error");
      setNotice("Please fill in your name, subject and message.");
      return;
    }
    busy.current = true;
    setStatus("sending");
    setNotice("Submitting your message…");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: fields.get("name").trim(),
            email: fields.get("email").trim(),
            subject: fields.get("subject").trim(),
            message: fields.get("message").trim(),
            _subject: "New portfolio contact message",
            _template: "table",
            _honey: "",
          }),
          signal: controller.signal,
        },
      );
      const data = await response.json();
      if (!response.ok || !(data.success === true || data.success === "true"))
        throw new Error("Submission was not accepted");
      setStatus("success");
      setNotice(
        "Your message was accepted for forwarding. Thank you for getting in touch.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setNotice(
        "We couldn’t confirm your submission. Your message is still here—please try again or email me directly.",
      );
    } finally {
      clearTimeout(timer);
      busy.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Contact Dinesh"
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="How should I address you?"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Subject
        <input
          name="subject"
          placeholder="An opportunity, a project, or a hello"
          required
          maxLength={160}
        />
      </label>
      <label>
        Your message
        <textarea
          name="message"
          placeholder="Tell me what you have in mind…"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
        />
      </label>
      <input
        type="text"
        name="_honey"
        className="form-honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="form-submit">
        <p>
          Your name, email and message are processed by{" "}
          <a href="https://formsubmit.co/" target="_blank" rel="noreferrer">
            FormSubmit
          </a>{" "}
          and forwarded to Dinesh.
        </p>
        <button
          className="primary"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"} <span>↗</span>
        </button>
      </div>
      <p className={"form-status " + status} role="status" aria-live="polite">
        {notice}
      </p>
    </form>
  );
}
