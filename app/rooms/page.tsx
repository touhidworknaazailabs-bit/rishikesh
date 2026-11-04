import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
import { BookStayButton, WhatsAppButton } from "@/components/CtaButtons";
import { rooms } from "@/data/rooms";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Rooms — AC & Non-AC Double Bed Rooms in Rishikesh",
  description: `Hotel Chandreshwar has ${hotel.rooms.total} double-bed rooms in Rishikesh — ${hotel.rooms.ac} AC rooms and ${hotel.rooms.nonAc} Non-AC rooms, all double occupancy with attached bathrooms and hot water. Book directly.`,
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "Rooms", url: "/rooms" }]} />
        <Reveal className="max-w-2xl mt-6 mb-16 md:mb-24">
          <p className="eyebrow">ACCOMMODATION</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">Rooms</h1>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            {hotel.rooms.total} double-bed rooms in total — {hotel.rooms.ac} AC and{" "}
            {hotel.rooms.nonAc} Non-AC — each for double occupancy, with an attached
            bathroom and hot water. Choose the option that suits you and book
            directly with the hotel.
          </p>
        </Reveal>
      </div>

      <div className="container-editorial space-y-24 md:space-y-32 pb-24 md:pb-32">
        {rooms.map((room, i) => (
          <Reveal key={room.slug}>
            <RoomCard room={room} reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      {/* border-b so this band stays visually distinct from the Footer
          immediately below it — both are bg-charcoal, and without a seam
          between them they read as one merged block with no boundary,
          making the padding on each look like one huge unexplained gap. */}
      <section className="relative bg-charcoal text-ivory py-20 text-center overflow-hidden border-b border-ivory/10">
        <div className="relative z-10 container-editorial">
          <h2 className="font-display text-3xl md:text-4xl text-balance">Not sure which room suits you?</h2>
          <p className="mt-4 text-ivory/70">Send your dates and guest count — the hotel team will recommend the right room.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {/* Inverted fill — the default solid (charcoal-on-ivory) would
                disappear against this section's own charcoal background. */}
            <BookStayButton size="lg" className="!bg-ivory !text-charcoal hover:!bg-sand" />
            <WhatsAppButton size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
