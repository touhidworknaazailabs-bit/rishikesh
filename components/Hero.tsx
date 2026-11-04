"use client";

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import PropertyImage from "./PropertyImage";

/**
 * Full-screen cinematic hero: a rotated location marker running down the
 * left edge, large vertically-stacked serif type anchored low, and a slim
 * booking strip built into the hero's own bottom edge rather than a
 * separate card overlapping into the next section. The photo, the
 * identity, and the first booking action are one continuous frame instead
 * of three stacked blocks.
 */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 140]);

  function handleCheck(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/book?${params.toString()}`);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY }}
        initial={{ scale: shouldReduceMotion ? 1 : 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {shouldReduceMotion ? (
          // prefers-reduced-motion: a still frame instead of the
          // autoplaying video — same visual, no motion.
          <PropertyImage
            src="/videos/hero-rishikesh-poster.jpg"
            alt="Laxman Jhula bridge and the Ganga at Rishikesh"
            fill
            priority
            sizes="100vw"
            className="saturate-[0.82] contrast-[1.06] brightness-[0.86]"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hero-rishikesh-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover saturate-[0.82] contrast-[1.06] brightness-[0.86]"
            aria-hidden
          >
            <source src="/videos/hero-rishikesh.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-charcoal/30" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="container-editorial pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-ivory/70 text-xs md:text-sm tracking-[0.3em] mb-4 md:mb-5"
          >
            RISHIKESH · UTTARAKHAND
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] text-ivory leading-[0.92] tracking-tight"
          >
            Hotel
            <br />
            Chandreshwar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-5 font-display italic text-xl md:text-2xl text-ivory/85 max-w-md"
          >
            A quiet, comfortable stay by the Ganga.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-lg bg-ivory px-8 py-3.5 text-sm tracking-[0.1em] text-charcoal hover:bg-sand transition-colors"
            >
              BOOK DIRECT
            </Link>
            <Link
              href="/rooms"
              className="text-sm tracking-[0.1em] text-ivory border-b border-ivory/40 pb-1 hover:border-ivory transition-colors"
            >
              EXPLORE ROOMS
            </Link>
          </motion.div>
        </div>

        {/* Booking strip — part of the hero's own bottom edge, not a
            separate card overlapping the section below. */}
        <motion.form
          onSubmit={handleCheck}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="relative z-10 border-t border-ivory/15 bg-charcoal/50 backdrop-blur-md"
        >
          <div className="container-editorial flex flex-col md:flex-row md:items-end gap-4 md:gap-8 py-5">
            <Field label="Check-in">
              <input
                type="date"
                min={today}
                value={checkIn}
                // The invisible full-size ::-webkit-calendar-picker-indicator
                // (globals.css) means the native calendar popup stays open
                // right up against the Check-out field next to it — without
                // blurring here, the very next click (meant for Check-out)
                // just lands on that still-open popup instead of the field.
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  e.target.blur();
                }}
                className="field-control field-control--dark w-full border-b border-ivory/25 bg-transparent pb-1.5 text-sm text-ivory outline-none transition-colors focus:border-ivory"
                aria-label="Check-in date"
              />
            </Field>
            <Field label="Check-out">
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  e.target.blur();
                }}
                className="field-control field-control--dark w-full border-b border-ivory/25 bg-transparent pb-1.5 text-sm text-ivory outline-none transition-colors focus:border-ivory"
                aria-label="Check-out date"
              />
            </Field>
            <Field label="Guests" className="md:w-28">
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="field-control field-control--dark w-full border-b border-ivory/25 bg-transparent pb-1.5 text-sm text-ivory outline-none transition-colors focus:border-ivory"
                aria-label="Number of guests"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} Guest{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </Field>
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-ivory px-6 py-2.5 text-sm tracking-wide text-charcoal transition-colors hover:bg-sand md:mb-0"
            >
              <img src="/icons/calendar-check-charcoal.svg" className="size-4" alt="" aria-hidden />
              Check Availability
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? "md:flex-1"}`}>
      <span className="text-[10px] tracking-[0.14em] text-ivory/50">{label.toUpperCase()}</span>
      {children}
    </label>
  );
}
