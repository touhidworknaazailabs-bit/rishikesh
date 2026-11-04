import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { BookStayButton, WhatsAppButton } from "@/components/CtaButtons";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Contact — Hotel Chandreshwar, Rishikesh",
  description:
    "Contact Hotel Chandreshwar in Rishikesh — call, WhatsApp, email, or send a booking enquiry directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

        <Reveal className="max-w-2xl mt-6 mb-16">
          <p className="eyebrow">CONTACT</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">Get in Touch</h1>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Reach Hotel Chandreshwar directly — no booking platform in between.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-14">
          {/* min-w-0: without it, a CSS grid item defaults to
              min-width:auto — sized to its content's intrinsic minimum.
              The email address below has no natural break point, so its
              un-wrapped width was forcing this whole column (and the page)
              wider than the viewport on narrow phones. */}
          <Reveal className="space-y-8 min-w-0">
            <div>
              <p className="text-xs tracking-[0.2em] text-charcoal/50 mb-2">HOTEL</p>
              <p className="font-display text-2xl text-charcoal">{hotel.name}</p>
              <p className="flex items-center gap-2 text-charcoal/70 mt-1">
                <img src="/icons/user-charcoal.svg" className="size-4" alt="" aria-hidden /> {hotel.owner}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-charcoal/50 mb-3">PHONE</p>
              <ul className="space-y-2">
                <li>
                  <a href={`tel:${hotel.contact.primaryPhoneDial}`} className="flex items-center gap-2.5 text-charcoal hover:text-terracotta transition-colors text-lg">
                    <img src="/icons/phone-charcoal.svg" className="size-4" alt="" aria-hidden /> {hotel.contact.primaryPhone}
                  </a>
                </li>
                <li>
                  <a href={`tel:${hotel.contact.secondaryPhoneDial}`} className="flex items-center gap-2.5 text-charcoal/80 hover:text-terracotta transition-colors">
                    <img src="/icons/phone-charcoal.svg" className="size-4" alt="" aria-hidden /> {hotel.contact.secondaryPhone}
                  </a>
                </li>
                <li>
                  <a href={`tel:${hotel.contact.landlineDial}`} className="flex items-center gap-2.5 text-charcoal/80 hover:text-terracotta transition-colors">
                    <img src="/icons/phone-charcoal.svg" className="size-4" alt="" aria-hidden /> {hotel.contact.landline} (Landline)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-charcoal/50 mb-3">EMAIL</p>
              <a href={`mailto:${hotel.contact.email}`} className="flex items-center gap-2.5 text-charcoal hover:text-terracotta transition-colors">
                <img src="/icons/mail-charcoal.svg" className="size-4 shrink-0" alt="" aria-hidden /> <span className="break-all">{hotel.contact.email}</span>
              </a>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-charcoal/50 mb-3">ADDRESS</p>
              <address className="not-italic flex items-start gap-2.5 text-charcoal/80 leading-relaxed">
                <img src="/icons/map-pin-charcoal.svg" className="size-4 mt-1 shrink-0" alt="" aria-hidden />
                <span>{hotel.address.lines.join(", ")}</span>
              </address>
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 ml-[26px] text-sm text-terracotta underline"
              >
                View on Google Maps
              </a>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <BookStayButton size="lg" label="Booking Enquiry" />
              <WhatsAppButton size="lg" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <iframe
                title="Hotel Chandreshwar location map"
                src={hotel.googleMapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
