"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { sendInquiry } from "@/lib/booking";

export default function BookingForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
    guests: params.get("guests") || "2",
    roomType: params.get("roomType") || "any",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const result = await sendInquiry(form);
    setStatus("sent");
    // Open WhatsApp with the pre-filled inquiry so the hotel gets it
    // immediately, in addition to the website-side record.
    window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-8 text-center">
        <h3 className="font-display text-2xl text-charcoal mb-2">Thank you.</h3>
        <p className="text-charcoal/70">
          Your booking enquiry has been received. The hotel team will contact you
          shortly. We&rsquo;ve also opened WhatsApp so you can send this enquiry directly —
          please tap send there if it didn&rsquo;t go automatically.
        </p>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" required>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone Number" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input"
            placeholder="+91 XXXXX XXXXX"
          />
        </Field>
      </div>

      <Field label="Email (optional)">
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="input"
          placeholder="you@example.com"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Check-in">
          <input
            type="date"
            min={today}
            value={form.checkIn}
            // Blur after picking — the native calendar popup otherwise
            // stays open right against the adjacent Check-out field, and
            // the next click just lands on that popup instead of the field.
            onChange={(e) => {
              update("checkIn", e.target.value);
              e.target.blur();
            }}
            className="input"
          />
        </Field>
        <Field label="Check-out">
          <input
            type="date"
            min={form.checkIn || today}
            value={form.checkOut}
            onChange={(e) => {
              update("checkOut", e.target.value);
              e.target.blur();
            }}
            className="input"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Guests">
          <select value={form.guests} onChange={(e) => update("guests", e.target.value)} className="input">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} Guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Room Type">
          <select value={form.roomType} onChange={(e) => update("roomType", e.target.value)} className="input">
            <option value="any">No Preference</option>
            <option value="ac">AC Double Bed Room</option>
            <option value="non-ac">Non-AC Double Bed Room</option>
          </select>
        </Field>
      </div>

      <Field label="Message (optional)">
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="input min-h-28 resize-y"
          placeholder="Anything else you'd like the hotel to know"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-charcoal text-ivory px-8 py-4 text-sm font-medium tracking-wide hover:bg-brown transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? (
          <img src="/icons/loader-2-ivory.svg" className="size-4 animate-spin" alt="" aria-hidden />
        ) : (
          <img src="/icons/calendar-check-ivory.svg" className="size-4" alt="" aria-hidden />
        )}
        Request Booking
      </button>

      <p className="text-xs text-charcoal/50 leading-relaxed">
        This sends a booking enquiry — it is not an instant confirmation. The
        hotel team will get back to you with availability and tariff.
      </p>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid rgba(25, 24, 23, 0.15);
          background: var(--color-ivory);
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          color: var(--color-charcoal);
          outline: none;
          border-radius: 0.5rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .input:focus {
          border-color: var(--color-terracotta);
          box-shadow: 0 0 0 3px rgba(168, 90, 48, 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs tracking-[0.1em] text-charcoal/60">
        {label.toUpperCase()} {required && <span className="text-terracotta">*</span>}
      </span>
      {children}
    </label>
  );
}
