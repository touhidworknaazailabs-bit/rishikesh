"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "chandreshwar-cookie-consent";

export type ConsentValue = "accepted" | "rejected";

/**
 * Reads the visitor's stored cookie-consent choice, if any. Exported so
 * that if/when this site adds analytics or another non-essential script,
 * that code can gate itself on `getCookieConsent() === "accepted"` instead
 * of loading unconditionally.
 */
export function getCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    // Private browsing / storage blocked — treat as no decision made yet
    // rather than throwing.
    return null;
  }
}

/**
 * A simple accept/reject cookie banner. This site sets no analytics or
 * advertising cookies today (see the Privacy Policy) — the banner exists
 * so that's true by design, not by accident, and so the mechanism is
 * already in place the day a non-essential script is added. Storing the
 * choice itself is a strictly-necessary use of localStorage, so the
 * banner doesn't reappear on every visit.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Deferred to an effect (rather than a lazy useState initializer) on
    // purpose: this component server-renders with nothing visible (no
    // access to localStorage there), and only decides whether to show the
    // banner once mounted on the client — reading localStorage during the
    // render pass itself would mismatch that server-rendered markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  function decide(value: ConsentValue) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Non-fatal — the banner will just reappear next visit.
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-charcoal/10 bg-ivory/98 p-5 md:p-6 shadow-[0_8px_40px_rgba(25,24,23,0.18)] backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-charcoal/75 leading-relaxed">
                We use only strictly-necessary cookies to run this site — nothing
                is used for tracking or advertising today. Read our{" "}
                <Link href="/privacy-policy" className="text-terracotta underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                to learn more.
              </p>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => decide("rejected")}
                  className="rounded-lg border border-charcoal/20 px-5 py-2.5 text-sm text-charcoal hover:border-charcoal transition-colors"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => decide("accepted")}
                  className="rounded-lg bg-charcoal px-5 py-2.5 text-sm text-ivory hover:bg-brown transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
