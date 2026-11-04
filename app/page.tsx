import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import PropertyImage from "@/components/PropertyImage";
import Reveal from "@/components/Reveal";
import RoomShowcase from "@/components/RoomShowcase";
import GuestJourney from "@/components/GuestJourney";
import FaqAccordion from "@/components/FaqAccordion";
import ImageMarquee from "@/components/ImageMarquee";
import { BookStayButton, WhatsAppButton } from "@/components/CtaButtons";
import { hotel } from "@/data/hotel";
import { rooms } from "@/data/rooms";
import { faqs } from "@/data/faq";
import { galleryImages } from "@/data/gallery";
import { nearbyAttractions } from "@/data/attractions";
import { FaqStructuredData } from "@/components/StructuredData";

// Hand-picked subset of galleryImages for the homepage's scrolling photo
// strip only — /gallery itself still shows and filters all of them. Several
// source photos are near-duplicates of each other (five separate shots
// share the same green/gold-curtain-and-brick-wall room), so this keeps one
// representative of each visually distinct room instead of a strip that
// loops through what reads as the same handful of photos.
const marqueeImageSrcs = [
  "/images/rooms/ac-room-1.jpg",
  "/images/rooms/ac-room-2.jpg",
  "/images/rooms/non-ac-room-1.jpg",
  "/images/rooms/non-ac-room-3.jpg",
  "/images/gallery/gallery-room-2.jpg",
  "/images/gallery/gallery-room-4.jpg",
  "/images/gallery/gallery-room-5.jpg",
  "/images/gallery/gallery-room-7.jpg",
];
const marqueeImages = marqueeImageSrcs
  .map((src) => galleryImages.find((img) => img.src === src))
  .filter((img): img is NonNullable<typeof img> => img !== undefined);

// Verified amenities only (data/hotel.ts) — nothing invented.
const amenities = [...hotel.amenitiesConfirmed, ...hotel.servicesConfirmed];

// A hand-picked preview for the homepage — the full list (11 places) lives
// on /location. Prioritizes the ones with a confirmed distance and a real
// photo, so a first-time visitor sees exactly how close things are and
// wants to book, without scrolling through every single entry here.
const homeAttractionNames = ["Triveni Ghat", "Laxman Jhula", "Beatles Ashram (Chaurasi Kutia)", "Bajrang Setu"];
const homeAttractions = homeAttractionNames
  .map((name) => nearbyAttractions.find((a) => a.name === name))
  .filter((a): a is NonNullable<typeof a> => a !== undefined);

export const metadata: Metadata = {
  title: "Hotel Chandreshwar — Your Comfortable Stay in Rishikesh",
  description:
    "Hotel Chandreshwar offers AC & Non-AC double-bed rooms with attached bathrooms and hot water in Chandreshwar Nagar, Rishikesh. Book directly by phone or WhatsApp.",
  alternates: { canonical: "/" },
};

const homeFaqs = faqs.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <FaqStructuredData faqs={homeFaqs} />
      <Hero />

      {/* Rooms — horizontal showcase, not a card grid */}
      <section className="pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="container-editorial mb-10 md:mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">ROOMS</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal text-balance">Find Your Room</h2>
          </div>
          <Link
            href="/rooms"
            className="text-sm tracking-wide text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors"
          >
            View All Rooms
          </Link>
        </div>
        <div className="container-editorial">
          <RoomShowcase rooms={rooms} />
        </div>
      </section>

      {/* Living photo strip — brought up here, right after Rooms, so real
          photos appear early on the page. */}
      <section className="pb-16 md:pb-20">
        <ImageMarquee images={marqueeImages.map((img) => ({ src: img.src, alt: img.alt }))} />
      </section>

      {/* Amenities — a quiet horizontal feature row, not an icon grid */}
      <section className="container-editorial py-20 md:py-28">
        <Reveal className="max-w-xl mb-10 md:mb-12">
          <p className="eyebrow">WHAT&rsquo;S INCLUDED</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal text-balance">
            The essentials, done properly
          </h2>
        </Reveal>
        {/* A plain wrapping <p> with inline separators, not a <ul> of flex
            items — text reflows at word boundaries like a sentence, so a
            short trailing item never ends up stranded alone with a large
            empty gap beside it the way flex-wrap items can. font-sans, not
            font-display: these are short feature tags, not headings, and
            every other feature/amenity list on the site (room facilities,
            etc.) already uses the body font for exactly that reason. The
            terracotta middots give each item a visible "lining" instead of
            relying on whitespace alone to separate them. */}
        <Reveal delay={0.1}>
          <p className="border-y border-charcoal/10 py-8 font-sans text-lg md:text-xl text-charcoal/80 leading-loose">
            {amenities.map((item, i) => (
              // whitespace-nowrap keeps each multi-word item ("Double
              // occupancy") together as one unit — otherwise a line break
              // could fall between its own words instead of only between
              // items. The {" "} after each span (outside the nowrap span)
              // is the actual break opportunity the browser wraps at —
              // without it, adjacent inline spans with no whitespace
              // between them in the markup have no break point at all and
              // just overflow instead of wrapping.
              <span key={item}>
                <span className="whitespace-nowrap">
                  {item}
                  {i < amenities.length - 1 && <span className="mx-3 text-terracotta/60">·</span>}
                </span>{" "}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      {/* Full-bleed editorial break — one immersive photo carrying the
          hotel's own words, rather than a heading/paragraph/image card.
          This is a destination shot (a Ganga ghat at sunset), not a claimed
          photo of the property itself. Deliberately CC0 (public domain) —
          unlike the Location page's attraction photos, which are CC BY-SA
          and require the visible ⓘ credit badge, CC0 needs no attribution
          at all, so there's no badge here. Do not swap this for a
          CC-BY/CC-BY-SA image without adding PhotoCredit back — that
          license does require it. Shifted down (below Amenities) so the
          photo strip above appears earlier on the page. */}
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <PropertyImage
          src="/images/property/rishikesh-ganga-sunset.jpg"
          alt="Sunset over a Ganga ghat near Rishikesh, Uttarakhand"
          fill
          sizes="100vw"
          className="saturate-[0.95]"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 flex h-full items-center">
          <Reveal className="container-editorial max-w-2xl">
            <p className="text-xs tracking-[0.25em] text-terracotta mb-5">WELCOME</p>
            <h2 className="font-display text-3xl md:text-5xl text-ivory leading-[1.15] text-balance">
              A quiet, comfortable base for your time in Rishikesh — run personally
              by {hotel.owner} and the hotel team.
            </h2>
            <Link
              href="/about"
              className="mt-7 inline-block text-sm tracking-wide text-ivory border-b border-ivory/40 pb-1 hover:border-ivory transition-colors"
            >
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Guest journey */}
      <GuestJourney />

      {/* Nearby attractions preview — gives a first-time visitor a reason
          to book by showing exactly what's close by, rather than making
          them dig for it on the Location page. Full list of 11 is there.
          Placed above the map/location teaser below, so the specific
          nearby places lead into the general "where we are" context
          rather than the other way around. */}
      <section className="py-20 md:py-28">
        <div className="container-editorial mb-10 md:mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">NEARBY</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal text-balance">
              Rishikesh Is Right Outside
            </h2>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              Ghats, bridges and ashrams are all within easy reach of Hotel
              Chandreshwar — see the confirmed distances below.
            </p>
          </div>
          <Link
            href="/location"
            className="text-sm tracking-wide text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors"
          >
            See All Nearby Places
          </Link>
        </div>

        <div className="container-editorial grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {homeAttractions.map((place, i) => (
            <Reveal key={place.name} delay={i * 0.05}>
              <Link href="/location" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-charcoal/5">
                  {place.image && (
                    <PropertyImage
                      src={place.image}
                      alt={place.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                  {place.distance && (
                    <span className="absolute top-3 right-3 rounded-full bg-ivory/90 px-2.5 py-1 text-xs text-charcoal">
                      {place.distance}
                    </span>
                  )}
                  <p className="absolute inset-x-0 bottom-0 p-4 font-display text-base md:text-lg text-ivory leading-tight">
                    {place.name}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="container-editorial mt-10 md:mt-12 text-center">
          <p className="text-charcoal/70 mb-5">
            Plan your visit to any of these — book a room at Hotel Chandreshwar first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <BookStayButton size="lg" label="Book Your Stay" />
            <WhatsAppButton size="lg" />
          </div>
        </Reveal>
      </section>

      {/* Immersive location teaser */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-editorial grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal>
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
          <Reveal delay={0.1}>
            <p className="eyebrow">LOCATION</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal text-balance">
              Chandreshwar Nagar, near Durga Mandir
            </h2>
            <p className="mt-5 text-charcoal/70 leading-relaxed max-w-md">{hotel.address.full}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-charcoal px-7 py-3 text-sm tracking-wide text-ivory hover:bg-brown transition-colors"
              >
                Get Directions
              </a>
              <Link
                href="/location"
                className="text-sm tracking-wide text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors"
              >
                More on Location
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — only the most-asked few here; the full list lives on /faq */}
      <section className="py-20 md:py-28">
        <div className="container-editorial max-w-3xl">
          <Reveal className="mb-12">
            <p className="eyebrow">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal text-balance">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion faqs={homeFaqs} />
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Link
              href="/faq"
              className="inline-block text-sm tracking-wide text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors"
            >
              See all {faqs.length} questions
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Final direct-booking CTA — full-bleed, not a centered text block */}
      <section className="relative py-28 md:py-36 text-center bg-charcoal overflow-hidden">
        <Reveal className="relative z-10 container-editorial max-w-xl mx-auto">
          <p className="eyebrow">DIRECT BOOKING</p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory text-balance">
            Ready for Rishikesh?
          </h2>
          <p className="mt-5 text-ivory/70 leading-relaxed">
            Call, WhatsApp, or send a booking enquiry — {hotel.owner} and the Hotel
            Chandreshwar team will confirm availability directly.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <BookStayButton size="lg" label="Book Direct" className="!bg-ivory !text-charcoal hover:!bg-sand" />
            <WhatsAppButton size="lg" className="text-ivory" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
