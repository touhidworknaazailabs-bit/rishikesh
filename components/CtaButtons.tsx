"use client";

import Link from "next/link";
import clsx from "clsx";
import { hotel } from "@/data/hotel";
import { buildWhatsAppLink, buildTelLink } from "@/lib/booking";

/**
 * Two variants only, deliberately — a "warm minimal luxury" surface reads as
 * considered when there's one signature filled action per screen, not a
 * button in every accent color:
 *   - solid: charcoal fill, ivory text. The one filled action (booking).
 *   - line:  transparent, an underline that draws in on hover. Every other
 *            action (WhatsApp, Call, secondary links) uses this so the
 *            filled button keeps its weight as "the" action.
 */
type Variant = "solid" | "line";
type Size = "md" | "lg";

const base = "inline-flex items-center justify-center gap-2.5 font-sans tracking-wide whitespace-nowrap transition-colors duration-200";

const variants: Record<Variant, string> = {
  solid: "rounded-lg bg-charcoal text-ivory hover:bg-brown",
  line: "border-b border-current/40 pb-1 hover:border-current",
};

const sizes: Record<Variant, Record<Size, string>> = {
  solid: { md: "px-7 py-3 text-sm", lg: "px-9 py-4 text-[15px]" },
  line: { md: "text-sm", lg: "text-base" },
};

/** Primary conversion CTA: "Book Your Stay" -> booking inquiry page. */
export function BookStayButton({
  variant = "solid",
  size = "md",
  className,
  label = "Book Your Stay",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <Link href="/book" className={clsx(base, variants[variant], sizes[variant][size], className)}>
      {label}
    </Link>
  );
}

/** "WhatsApp Us" -> opens wa.me with a pre-filled generic inquiry. */
export function WhatsAppButton({
  variant = "line",
  size = "md",
  className,
  label = "WhatsApp Us",
  message,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
  message?: Parameters<typeof buildWhatsAppLink>[0];
}) {
  return (
    <a
      href={buildWhatsAppLink(message || {})}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(base, variants[variant], sizes[variant][size], className)}
    >
      {variant === "solid" && <img src="/icons/message-circle-ivory.svg" className="size-4" alt="" aria-hidden />}
      {label}
    </a>
  );
}

/** "Call Now" -> tel: link, primary phone by default. */
export function CallButton({
  variant = "line",
  size = "md",
  className,
  label = "Call Now",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <a href={buildTelLink()} className={clsx(base, variants[variant], sizes[variant][size], className)}>
      {variant === "solid" && <img src="/icons/phone-ivory.svg" className="size-4" alt="" aria-hidden />}
      {label}
    </a>
  );
}

export const whatsappHref = () => buildWhatsAppLink({});
export const primaryTelHref = () => buildTelLink(hotel.contact.primaryPhoneDial);
