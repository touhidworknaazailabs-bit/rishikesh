import Link from "next/link";
import { hotel } from "@/data/hotel";
import { footerNav } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/booking";
import NewsletterSignup from "./NewsletterSignup";
import { BookStayButton } from "./CtaButtons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="border-b border-ivory/10">
        <div className="container-editorial py-8">
          <NewsletterSignup />
        </div>
      </div>

      <div className="container-editorial grid gap-12 py-16 md:py-20 md:grid-cols-[1.3fr_1fr_1fr]">
        {/* min-w-0: without it, a CSS grid item defaults to min-width:auto
            — sized to its content's intrinsic minimum. The wordmark text
            next to the logo has no natural break point wide enough on its
            own, so it (and the grid track under it) was forcing the whole
            footer wider than the viewport on narrow phones. */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            {/* Ivory backing disc — the mark's navy/gold colors are fixed
                in the image and would otherwise read very dark against
                this footer's charcoal background. */}
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ivory/90">
              <img src="/images/logo/mark.png" alt="" className="size-8 object-contain" aria-hidden />
            </span>
            <div className="min-w-0 font-display text-2xl tracking-[0.15em]">HOTEL CHANDRESHWAR</div>
          </div>
          <p className="mt-3 text-ivory/70 font-display text-lg italic">
            &ldquo;{hotel.tagline}&rdquo;
          </p>
          <p className="mt-4 max-w-sm text-sm text-ivory/60 leading-relaxed">
            {hotel.shortDescription}
          </p>
          {/* Inverted fill to match every other Book button on a dark
              section — the default solid (charcoal-on-ivory) would
              disappear against this footer's own charcoal background. */}
          <BookStayButton size="md" className="mt-6 !bg-ivory !text-charcoal hover:!bg-sand" />
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] text-ivory/50 mb-4">QUICK LINKS</div>
          <ul className="space-y-2.5 text-sm">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ivory/80 hover:text-terracotta transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] text-ivory/50 mb-4">CONTACT</div>
          <ul className="space-y-3 text-sm text-ivory/80">
            <li>
              <a href={`tel:${hotel.contact.primaryPhoneDial}`} className="flex items-start gap-2.5 hover:text-terracotta transition-colors">
                <img src="/icons/phone-ivory.svg" className="size-4 mt-0.5 shrink-0" alt="" aria-hidden />
                {hotel.contact.primaryPhone}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink({})}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-terracotta transition-colors"
              >
                <img src="/icons/message-circle-ivory.svg" className="size-4 mt-0.5 shrink-0" alt="" aria-hidden />
                WhatsApp Us
              </a>
            </li>
            <li>
              <a href={`mailto:${hotel.contact.email}`} className="flex items-start gap-2.5 hover:text-terracotta transition-colors">
                <img src="/icons/mail-ivory.svg" className="size-4 mt-0.5 shrink-0" alt="" aria-hidden />
                <span className="break-all">{hotel.contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-terracotta transition-colors"
              >
                <img src="/icons/map-pin-ivory.svg" className="size-4 mt-0.5 shrink-0" alt="" aria-hidden />
                <span>{hotel.address.lines.join(", ")}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-editorial flex flex-col md:flex-row items-center justify-between gap-3 py-6 text-xs text-ivory/50">
          <p>© {year} Hotel Chandreshwar. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-ivory/80 transition-colors">
            Privacy Policy
          </Link>
          <p>Rishikesh, Uttarakhand, India</p>
        </div>
        <div className="container-editorial pb-6 text-center">
          <a
            href="https://naazailabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ivory/40 transition-colors hover:text-ivory/70"
          >
            Designed and developed with ❤️ by{" "}
            <span className="text-sm font-extrabold tracking-wide text-terracotta">Naaz AI Labs</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
