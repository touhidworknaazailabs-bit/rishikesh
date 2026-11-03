import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import PropertyImage from "@/components/PropertyImage";
import { BookStayButton } from "@/components/CtaButtons";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "About — Hotel Chandreshwar, Rishikesh",
  description:
    "Hotel Chandreshwar is a comfortable, welcoming base for travelers visiting Rishikesh — AC & Non-AC double-bed rooms in Chandreshwar Nagar.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "About", url: "/about" }]} />

        <Reveal className="max-w-3xl mt-6 mb-16">
          <p className="text-xs tracking-[0.25em] text-terracotta mb-4">OUR STORY</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">
            Your Comfortable Stay in Rishikesh
          </h1>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
          <Reveal className="order-2 md:order-1">
            <p className="text-charcoal/75 leading-relaxed text-lg font-display italic">
              Rishikesh is a place where people come for many different reasons —
              to experience the Ganga, explore the city, spend time with family,
              visit spiritual destinations, or simply take a break from everyday
              life.
            </p>
            <p className="mt-6 text-charcoal/70 leading-relaxed">
              Hotel Chandreshwar is designed as a simple and welcoming base for
              those journeys. Located in Chandreshwar Nagar, near Durga Mandir and
              Dayanand Ashram Road, the hotel offers AC and Non-AC double-bed
              rooms with attached bathrooms and hot water.
            </p>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              The experience is kept straightforward and personal: a comfortable
              room, a convenient location, and an easy way to connect with the
              hotel directly — by phone, WhatsApp, or a simple booking enquiry, no
              middlemen involved.
            </p>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              The hotel is run by {hotel.owner}, and every booking enquiry is
              handled personally by the hotel team.
            </p>
            <BookStayButton size="lg" className="mt-8" />
          </Reveal>
          <Reveal delay={0.15} className="order-1 md:order-2 flex flex-col items-center md:items-end">
            <div className="relative aspect-[16/9] w-full max-w-sm overflow-hidden border border-charcoal/10 shadow-sm">
              <PropertyImage
                src="/images/property/exterior-1.jpg"
                alt="Hotel Chandreshwar building exterior and signage, Chandreshwar Nagar, Rishikesh"
                fill
                sizes="(min-width: 768px) 384px, 100vw"
              />
            </div>
            <p className="mt-3 max-w-sm text-xs text-charcoal/45 text-center md:text-right">
              The hotel&rsquo;s street-facing entrance and signage
            </p>
          </Reveal>
        </div>

        <Reveal className="border-t border-charcoal/10 pt-14 max-w-2xl">
          <h2 className="font-display text-3xl text-charcoal mb-4">What We Offer</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-charcoal/75">
            <li>• {hotel.rooms.total} double-bed rooms — {hotel.rooms.ac} AC, {hotel.rooms.nonAc} Non-AC</li>
            <li>• Double occupancy, every room</li>
            <li>• Attached bathroom in every room</li>
            <li>• Hot water in every room</li>
            <li>• Direct booking by phone or WhatsApp</li>
            <li>• Convenient Chandreshwar Nagar location</li>
            <li>• Personal hospitality from the hotel team</li>
            {hotel.servicesConfirmed.map((service) => (
              <li key={service}>• {service}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-charcoal/50 leading-relaxed">
            We keep this page to what&rsquo;s confirmed today. As more details about
            the hotel&rsquo;s history are confirmed by the owner, they&rsquo;ll be added
            here.
          </p>
          <Link href="/faq" className="mt-6 inline-block text-sm text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors">
            Read Frequently Asked Questions
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
