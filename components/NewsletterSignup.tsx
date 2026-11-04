"use client";

import { useState, FormEvent } from "react";

/**
 * Simple email capture strip. Submits to /api/newsletter (currently just
 * logs server-side — see that route's comment). No claim of "you'll get
 * exclusive offers" since there's no active mailing list yet to send any.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <span className="flex items-center gap-2 text-ivory/70 text-sm shrink-0">
        <img src="/icons/mail-ivory.svg" className="size-4" alt="" aria-hidden />
        Stay updated on Hotel Chandreshwar
      </span>
      {status === "done" ? (
        <p className="flex items-center gap-2 text-sm text-sage">
          <img src="/icons/check-sage.svg" className="size-4" alt="" aria-hidden />
          Thanks — we&rsquo;ve noted your email.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto max-w-sm rounded-lg overflow-hidden">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 min-w-0 bg-ivory/10 border border-ivory/20 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 outline-none focus:border-terracotta"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 bg-terracotta text-ivory px-5 py-2.5 text-sm font-medium hover:bg-brown transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {status === "loading" ? (
              <img src="/icons/loader-2-ivory.svg" className="size-4 animate-spin" alt="" aria-hidden />
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-terracotta">Something went wrong — please try again.</p>
      )}
    </div>
  );
}
