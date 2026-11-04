"use client";

import { useEffect, useRef, useState } from "react";
import type { Attraction } from "@/data/attractions";

type Credit = NonNullable<Attraction["credit"]>;

/**
 * Attribution for a CC-licensed photo, collapsed into a small ⓘ badge in the
 * image corner that opens the full credit on click/tap.
 *
 * The credit itself is NOT optional — these images are Wikimedia Commons
 * photos under CC BY-SA, which requires attribution to stay with the image.
 * This keeps it present and reachable (one tap, no hover required, readable
 * by screen readers via the button label) while keeping the card visually
 * clean. Do not replace this with nothing.
 */
export default function PhotoCredit({ credit }: { credit: Credit }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // z-20, not z-10: on the Location page this sits alone inside a small
    // image container, so z-10 was always effectively topmost. On the
    // homepage's full-bleed "Welcome" section, a same-z-10 content wrapper
    // rendered later in the DOM silently intercepted every click on this
    // button — visible, but functionally dead. z-20 keeps it above any
    // z-10 content layer regardless of DOM order.
    <div ref={wrapRef} className="absolute bottom-2 right-2 z-20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Photo credit: ${credit.photographer}, Wikimedia Commons, ${credit.license}`}
        className="flex size-6 items-center justify-center rounded-full bg-charcoal/45 text-ivory/90 backdrop-blur-sm transition-colors hover:bg-charcoal/75"
      >
        <img src="/icons/info-ivory.svg" className="size-3.5" alt="" aria-hidden />
      </button>

      {open && (
        <div className="absolute bottom-8 right-0 w-56 rounded-lg bg-charcoal/95 p-3 text-[11px] leading-relaxed text-ivory/80 shadow-xl backdrop-blur-sm">
          Photo:{" "}
          <a
            href={credit.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-terracotta"
          >
            {credit.photographer}
          </a>
          {" / Wikimedia Commons, "}
          <a
            href={credit.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-terracotta"
          >
            {credit.license}
          </a>
        </div>
      )}
    </div>
  );
}
