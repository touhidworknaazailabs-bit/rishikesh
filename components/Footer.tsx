import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { hotel } from "@/data/hotel";
import { footerNav } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/booking";
import NewsletterSignup from "./NewsletterSignup";

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
        <div>
          <div className="font-display text-2xl tracking-[0.15em]">HOTEL CHANDRESHWAR</div>
          <p className="mt-3 text-ivory/70 font-display text-lg italic">
            &ldquo;{hotel.tagline}&rdquo;
          </p>
          <p className="mt-4 max-w-sm text-sm text-ivory/60 leading-relaxed">
            {hotel.shortDescription}
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center justify-center bg-terracotta text-ivory px-6 py-3 text-sm font-medium tracking-wide hover:bg-[#b25a26] transition-colors"
          >
            Book Your Stay
          </Link>
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
                <Phone className="size-4 mt-0.5 shrink-0" aria-hidden />
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
                <MessageCircle className="size-4 mt-0.5 shrink-0" aria-hidden />
                WhatsApp Us
              </a>
            </li>
            <li>
              <a href={`mailto:${hotel.contact.email}`} className="flex items-start gap-2.5 hover:text-terracotta transition-colors">
                <Mail className="size-4 mt-0.5 shrink-0" aria-hidden />
                {hotel.contact.email}
              </a>
            </li>
            <li>
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-terracotta transition-colors"
              >
                <MapPin className="size-4 mt-0.5 shrink-0" aria-hidden />
                <span>{hotel.address.lines.join(", ")}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-editorial flex flex-col md:flex-row items-center justify-between gap-3 py-6 text-xs text-ivory/50">
          <p>© {year} Hotel Chandreshwar. All rights reserved.</p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-terracotta transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-terracotta transition-colors">
              Terms &amp; Conditions
            </Link>
          </nav>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://naazailabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 underline underline-offset-2 hover:text-terracotta transition-colors"
            >
              Naaz AI Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
