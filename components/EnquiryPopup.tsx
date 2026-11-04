"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BookingForm from "./BookingForm";

const SESSION_KEY = "chandreshwar-enquiry-popup-shown";
const DELAY_MS = 4000;

/**
 * A one-time-per-session booking enquiry popup, shown 4 seconds after a
 * visitor lands on the site — not on every page they navigate to
 * afterwards, and not on /book itself (that page already is the booking
 * form). sessionStorage (not localStorage) is deliberate: it resets when
 * the browser tab/session ends, so a visitor doesn't see it once ever and
 * never again on a later visit, but it won't fire again and again while
 * they browse around during the same visit.
 */
export default function EnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isBookPage = pathname === "/book";

  useEffect(() => {
    if (isBookPage) return;
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage blocked — fall back to showing it once per page load
      // rather than crashing.
    }
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Non-fatal.
      }
    }, DELAY_MS);

    return () => window.clearTimeout(timer);
    // Deliberately empty deps beyond the page-guard above — this should
    // fire once based on time-on-site, not re-arm on every route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Booking enquiry"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-ivory p-7 md:p-9 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 hover:text-charcoal transition-colors"
            >
              <img src="/icons/x-charcoal.svg" className="size-4" alt="" aria-hidden />
            </button>

            <p className="eyebrow">DIRECT BOOKING</p>
            <h2 className="font-display text-2xl md:text-3xl text-charcoal text-balance">
              Planning a stay in Rishikesh?
            </h2>
            <p className="mt-2 text-sm text-charcoal/60 leading-relaxed">
              Send a quick enquiry and the hotel team will confirm availability
              and tariff directly.
            </p>

            <div className="mt-6">
              <Suspense fallback={null}>
                <BookingForm />
              </Suspense>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
