import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal, { RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import PropertyImage from "@/components/PropertyImage";
import CopyAddressButton from "@/components/CopyAddressButton";
import PhotoCredit from "@/components/PhotoCredit";
import { BookStayButton, WhatsAppButton } from "@/components/CtaButtons";
import { hotel } from "@/data/hotel";
import { nearbyAttractions } from "@/data/attractions";

export const metadata: Metadata = {
  title: "Location — Hotel in Chandreshwar Nagar, Rishikesh",
  description:
    "Hotel Chandreshwar is located near Durga Mandir, Dayanand Ashram Road, Chandreshwar Nagar, Rishikesh. Get directions, call, or WhatsApp the hotel directly.",
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "Location", url: "/location" }]} />

        <Reveal className="max-w-2xl mt-6 mb-14">
          <p className="eyebrow">LOCATION</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">
            Hotel in Chandreshwar Nagar, Rishikesh
          </h1>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Hotel Chandreshwar sits in Chandreshwar Nagar, near Durga Mandir and
            Dayanand Ashram Road — a residential, quieter part of Rishikesh that
            still keeps you within reach of the town&rsquo;s ghats, markets and main
            attractions.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-20 md:mb-28">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal/5">
              <iframe
                title="Hotel Chandreshwar location map"
                src={hotel.googleMapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <div className="flex items-start gap-3 mb-6">
              <img src="/icons/map-pin-terracotta.svg" className="size-5 mt-1 shrink-0" alt="" aria-hidden />
              <address className="not-italic text-charcoal/80 leading-relaxed">
                {hotel.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-terracotta text-ivory px-5 py-3 text-sm hover:bg-brown transition-colors"
              >
                <img src="/icons/navigation-ivory.svg" className="size-4" alt="" aria-hidden />
                Get Directions
              </a>
              <CopyAddressButton />
              <a
                href={`tel:${hotel.contact.primaryPhoneDial}`}
                className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-5 py-3 text-sm text-charcoal hover:border-charcoal transition-colors"
              >
                <img src="/icons/phone-charcoal.svg" className="size-4" alt="" aria-hidden />
                Call Hotel
              </a>
              <WhatsAppButton className="text-charcoal" label="WhatsApp Hotel" />
            </div>

            <div className="mt-8 border-t border-charcoal/10 pt-6">
              <p className="text-xs tracking-[0.2em] text-charcoal/50 mb-3">DISTANCES FROM THE HOTEL</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-charcoal/75">
                {hotel.distances.map((d) => (
                  <li key={d.name} className="flex items-baseline justify-between gap-3">
                    <span>{d.name}</span>
                    <span className="text-charcoal/50 whitespace-nowrap">{d.distance}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-charcoal/45 leading-relaxed">
                Exact coordinates aren&rsquo;t confirmed yet — use &ldquo;Get Directions&rdquo;
                above for the most accurate route from wherever you&rsquo;re starting.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Local SEO content block. No exterior photo here — the only one
            supplied was a low-quality crop from the hotel's printed
            business card and was removed sitewide rather than shown at
            poor quality (see public/images/README.md). */}
        <Reveal className="max-w-2xl mb-20">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-5">
            Why Stay in Chandreshwar Nagar
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            Chandreshwar Nagar is a residential neighbourhood near Durga Mandir
            on Dayanand Ashram Road — a calmer alternative to staying right at
            the busiest ghats, while still being a straightforward auto-rickshaw
            or short walk from central Rishikesh.
          </p>
          <p className="mt-4 text-charcoal/70 leading-relaxed">
            Whether you&rsquo;re visiting for the Ganga, a yoga programme, a family
            trip, or simply passing through on a longer Uttarakhand itinerary,
            Hotel Chandreshwar offers {hotel.rooms.total} double-bed rooms
            ({hotel.rooms.ac} AC, {hotel.rooms.nonAc} Non-AC), each for double
            occupancy with an attached bathroom and hot water, and direct
            booking by phone or WhatsApp — no third-party platform required.
          </p>
        </Reveal>

        {/* Nearby attractions */}
        <div className="mb-20 md:mb-28">
          <Reveal className="max-w-2xl mb-10">
            <p className="eyebrow">NEARBY ATTRACTIONS</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal text-balance">
              Places Worth Visiting Near Chandreshwar Nagar
            </h2>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              Rishikesh&rsquo;s best-known ghats, bridges and ashrams are within
              reach of the hotel — see the confirmed distances above for a few
              key spots, or use &ldquo;Get Directions&rdquo; for an accurate route to
              any of the ones below.
            </p>
          </Reveal>

          <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10">
            {nearbyAttractions.map((place, i) => {
              // A responsive grid whose item count isn't a clean multiple
              // of the column count leaves a trailing row with empty grid
              // cells — those render as a conspicuous blank box (this
              // grid's own gap-background showing through). Handled per
              // breakpoint (2 cols at sm, 3 at lg) and per possible
              // remainder, rather than only the single-item-left case, so
              // this keeps working correctly as the list grows:
              //   - 1 short at lg (3-col): last item spans all 3.
              //   - 2 short at lg: last item spans the remaining 2 (its
              //     neighbor stays normal width) — no gap left uneven.
              //   - 1 short at sm (2-col): last item spans both.
              const total = nearbyAttractions.length;
              const isLast = i === total - 1;
              const remSm = total % 2;
              const remLg = total % 3;
              const spanSmFull = isLast && remSm === 1;
              const spanLgFull = isLast && remLg === 1;
              const spanLgHalf = isLast && remLg === 2;
              return (
                <RevealStaggerItem
                  key={place.name}
                  hover
                  className={clsx(
                    "bg-ivory flex flex-col hover:shadow-lg hover:z-10 transition-shadow duration-300",
                    spanSmFull && "sm:col-span-2",
                    spanLgFull && "lg:col-span-3",
                    spanLgHalf && "lg:col-span-2"
                  )}
                >
                  {place.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
                      <PropertyImage
                        src={place.image}
                        alt={place.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      {place.credit && <PhotoCredit credit={place.credit} />}
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg text-charcoal">{place.name}</h3>
                      {place.distance && (
                        <span className="shrink-0 rounded-full bg-terracotta/10 px-2.5 py-1 text-xs text-terracotta whitespace-nowrap">
                          {place.distance}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal/65 leading-relaxed">{place.description}</p>
                  </div>
                </RevealStaggerItem>
              );
            })}
          </RevealStagger>

          <Reveal delay={0.1} className="mt-6">
            <Link
              href="/guide/places-to-visit-in-rishikesh"
              className="inline-block text-sm text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors"
            >
              Read the full places-to-visit guide
            </Link>
          </Reveal>
        </div>

        <Reveal className="text-center bg-sand py-16 px-6 rounded-2xl">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal">Book a Room Nearby</h2>
          <p className="mt-3 text-charcoal/70">Direct booking — call, WhatsApp, or send an enquiry.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <BookStayButton size="lg" label="Book Nearby" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
