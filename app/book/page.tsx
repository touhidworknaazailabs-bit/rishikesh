import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { CallButton, WhatsAppButton } from "@/components/CtaButtons";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Book Your Stay — Hotel Chandreshwar, Rishikesh",
  description:
    "Send a direct booking enquiry to Hotel Chandreshwar in Rishikesh, or reach the hotel instantly by phone or WhatsApp.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial max-w-3xl">
        <Breadcrumbs items={[{ name: "Book Your Stay", url: "/book" }]} />

        <Reveal className="mt-6 mb-4">
          <p className="eyebrow">DIRECT BOOKING</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">Book Your Stay</h1>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            There&rsquo;s no online payment or instant confirmation yet — every stay at
            Hotel Chandreshwar is confirmed personally by {hotel.owner} and the
            team. The fastest way to hear back is WhatsApp or a direct call; the
            form below sends the same enquiry and opens WhatsApp for you.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <CallButton size="lg" />
            <WhatsAppButton size="lg" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 border-t border-charcoal/10 pt-12">
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </Reveal>
      </div>
    </div>
  );
}
