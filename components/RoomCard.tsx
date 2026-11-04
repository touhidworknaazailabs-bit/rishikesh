import Link from "next/link";
import RoomCardImage from "./RoomCardImage";
import { Room } from "@/data/rooms";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/booking";

const featureIcons: Record<string, string> = {
  "Double bed": "/icons/bed-double-sage.svg",
  "Double occupancy": "/icons/users-sage.svg",
  "Attached bathroom": "/icons/bath-sage.svg",
  "Hot water": "/icons/droplets-sage.svg",
  "Air conditioning": "/icons/snowflake-sage.svg",
};

export default function RoomCard({ room, reverse = false }: { room: Room; reverse?: boolean }) {
  return (
    <article
      className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <RoomCardImage
        href={`/rooms/${room.slug}`}
        images={room.images}
        countLabel={`${room.count} ROOMS AVAILABLE`}
      />

      <div>
        <p className="eyebrow mb-3">{room.type === "AC" ? "AIR CONDITIONED" : "NON AIR CONDITIONED"}</p>
        <h3 className="font-display text-3xl md:text-4xl text-charcoal">{room.name}</h3>
        <p className="mt-4 text-charcoal/70 leading-relaxed max-w-md">{room.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {room.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-charcoal/80">
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

        <p className="mt-6 font-display text-2xl text-charcoal">
          {formatPrice(room.price)}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Straight to WhatsApp with the room pre-filled, not the /book
              inquiry form — the form is one extra step most visitors don't
              need when they've already picked a specific room. */}
          <a
            href={buildWhatsAppLink({ roomType: room.type === "AC" ? "ac" : "non-ac" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-charcoal px-7 py-3 text-sm tracking-wide text-ivory hover:bg-brown transition-colors"
          >
            Book This Room
          </a>
          <Link
            href={`/rooms/${room.slug}`}
            className="text-sm tracking-wide text-charcoal border-b border-charcoal/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors"
          >
            View Room
          </Link>
        </div>
      </div>
    </article>
  );
}
