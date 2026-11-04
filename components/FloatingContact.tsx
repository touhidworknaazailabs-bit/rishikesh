"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { buildTelLink, buildWhatsAppLink } from "@/lib/booking";

/**
 * Floating Call / WhatsApp / Book button, bottom-right, on every screen
 * size. Previously mobile had its own separate fixed bottom bar (edge to
 * edge, reserving page padding for itself) while desktop got this floating
 * bubble — that meant two different patterns to maintain, and the bottom
 * bar's real height (safe-area inset included) kept drifting out of sync
 * with the padding reserved for it, so it periodically covered page
 * content. Using one floating overlay everywhere removes that whole class
 * of bug: it sits ON TOP of content by design (like it always did on
 * desktop), so there's no reserved space to keep in sync.
 */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed right-4 md:right-6 z-50 flex flex-col items-end gap-3"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-2.5"
          >
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-full bg-ivory text-charcoal pl-4 pr-3 py-2.5 shadow-lg border border-charcoal/10 text-sm hover:bg-charcoal hover:text-ivory transition-colors"
            >
              Book Your Stay
              <span className="flex size-8 items-center justify-center rounded-full bg-terracotta text-ivory shrink-0">
                <img src="/icons/calendar-check-ivory.svg" className="size-4" alt="" aria-hidden />
              </span>
            </Link>
            <a
              href={buildWhatsAppLink({})}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-ivory text-charcoal pl-4 pr-3 py-2.5 shadow-lg border border-charcoal/10 text-sm hover:bg-charcoal hover:text-ivory transition-colors"
            >
              WhatsApp Us
              <span className="flex size-8 items-center justify-center rounded-full bg-sage text-ivory shrink-0">
                <img src="/icons/message-circle-ivory.svg" className="size-4" alt="" aria-hidden />
              </span>
            </a>
            <a
              href={buildTelLink()}
              className="flex items-center gap-2.5 rounded-full bg-ivory text-charcoal pl-4 pr-3 py-2.5 shadow-lg border border-charcoal/10 text-sm hover:bg-charcoal hover:text-ivory transition-colors"
            >
              Call Now
              <span className="flex size-8 items-center justify-center rounded-full bg-charcoal text-ivory shrink-0">
                <img src="/icons/phone-ivory.svg" className="size-4" alt="" aria-hidden />
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* A restrained surface doesn't have anything pulsing for attention —
          this sits quietly in the corner and only responds to the visitor's
          own hover/tap, rather than looping an animation at them. */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact Hotel Chandreshwar"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex size-14 items-center justify-center rounded-full bg-charcoal text-ivory shadow-xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
              <img src="/icons/x-ivory.svg" className="size-6" alt="" aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
              <img src="/icons/message-circle-ivory.svg" className="size-6" alt="" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
