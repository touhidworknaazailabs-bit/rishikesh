import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import RoomPhotoGrid from "@/components/RoomPhotoGrid";
import { WhatsAppButton } from "@/components/CtaButtons";
import { rooms, getRoomBySlug } from "@/data/rooms";
import { formatPrice } from "@/lib/format";
import { hotel } from "@/data/hotel";

const featureIcons: Record<string, string> = {
  "Double bed": "/icons/bed-double-sage.svg",
  "Double occupancy": "/icons/users-sage.svg",
  "Attached bathroom": "/icons/bath-sage.svg",
  "Hot water": "/icons/droplets-sage.svg",
  "Air conditioning": "/icons/snowflake-sage.svg",
};

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.name} — Hotel Chandreshwar, Rishikesh`,
    description: room.summary,
    alternates: { canonical: `/rooms/${room.slug}` },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <div className="pt-28 md:pt-36">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "Rooms", url: "/rooms" }, { name: room.name, url: `/rooms/${room.slug}` }]} />
      </div>

      {/* Large photography — every tile opens the full-screen viewer */}
      <RoomPhotoGrid images={room.images} roomName={room.name} />

      <section className="container-editorial py-16 md:py-24 grid md:grid-cols-[1.4fr_1fr] gap-14">
        <Reveal>
          <p className="eyebrow">
            {room.type === "AC" ? "AIR CONDITIONED" : "NON AIR CONDITIONED"} · {room.count} ROOMS AVAILABLE
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal">{room.heading}</h1>
          {room.description.map((para) => (
            <p key={para} className="mt-5 text-charcoal/70 leading-relaxed max-w-xl">
              {para}
            </p>
          ))}

          <h2 className="font-display text-2xl text-charcoal mt-10 mb-5">Facilities</h2>
          <ul className="grid grid-cols-2 gap-4 max-w-md">
            {room.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-charcoal/80">
                <img
                  src={featureIcons[feature] ?? "/icons/bed-double-sage.svg"}
                  className="size-[18px]"
                  alt=""
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>

          <h2 className="font-display text-2xl text-charcoal mt-10 mb-5">Distances from the Hotel</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-w-md text-sm text-charcoal/75">
            {hotel.distances.map((d) => (
              <li key={d.name} className="flex items-baseline justify-between gap-3">
                <span>{d.name}</span>
                <span className="text-charcoal/50 whitespace-nowrap">{d.distance}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-charcoal/10 p-8 sticky top-28">
            <p className="text-xs tracking-[0.2em] text-charcoal/50 mb-2">TARIFF</p>
            <p className="text-charcoal font-display text-3xl">{formatPrice(room.price)}</p>
            {/* Straight to WhatsApp with the room pre-filled, not the /book
                inquiry form — one primary action instead of two buttons
                that both ended up going to WhatsApp anyway. */}
            <div className="mt-6 flex flex-col gap-3">
              <WhatsAppButton
                variant="solid"
                size="lg"
                label="Book This Room"
                className="w-full"
                message={{ roomType: room.type === "AC" ? "ac" : "non-ac" }}
              />
            </div>
            <p className="mt-5 text-xs text-charcoal/50 leading-relaxed">
              No online payment yet — every booking is confirmed personally by the
              hotel team over call or WhatsApp.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
