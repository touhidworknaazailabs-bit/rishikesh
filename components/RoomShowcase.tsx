"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import PropertyImage from "./PropertyImage";
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

/**
 * Horizontal, swipe/scroll-snap room browser — full-bleed panels a visitor
 * drags or scrolls through, rather than a left-image/right-details split
 * card. Native CSS scroll-snap rather than a JS carousel library: no
 * layout thrash, works with trackpad/touch/arrow-button alike, and degrades
 * to a plain scrollable row if JS is slow to hydrate.
 */
export default function RoomShowcase({ rooms }: { rooms: Room[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // scrollIntoView proved unreliable here — with scroll-snap active on the
  // track, a JS-driven scrollIntoView sometimes settles short of the
  // target panel (it and the browser's own snap logic fight over the final
  // position). Scrolling the track to an explicitly computed offset is
  // deterministic regardless of snap behavior.
  function scrollToIndex(i: number) {
    const track = trackRef.current;
    const panel = track?.children[i] as HTMLElement | undefined;
    if (!track || !panel) return;
    const target = panel.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left: target, behavior: "smooth" });
  }

  // Which panel is active: not a simple scrollLeft / clientWidth division
  // (panels are narrower than the track, by design, so you can see a peek
  // of the next one) — instead, whichever panel's own left edge is
  // closest to the track's left edge.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDistance = Infinity;
    // Only the real room panels, not the trailing spacer.
    Array.from(track.children).slice(0, rooms.length).forEach((child, i) => {
      const distance = Math.abs(child.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setActive(closest);
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6 px-1">
        <div className="flex gap-2">
          {rooms.map((r, i) => (
            <button
              key={r.slug}
              onClick={() => scrollToIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-10 bg-terracotta" : "w-4 bg-charcoal/15"
              }`}
              aria-label={`Show ${r.name}`}
            />
          ))}
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous room"
            className="flex size-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal disabled:opacity-30"
          >
            <img src="/icons/arrow-left-charcoal.svg" className="size-4" alt="" aria-hidden />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(rooms.length - 1, active + 1))}
            disabled={active === rooms.length - 1}
            aria-label="Next room"
            className="flex size-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal disabled:opacity-30"
          >
            <img src="/icons/arrow-right-charcoal.svg" className="size-4" alt="" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-1 px-1 scrollbar-none"
      >
        {rooms.map((room) => (
          <article
            key={room.slug}
            className="relative shrink-0 snap-start w-[88vw] sm:w-[70vw] lg:w-[56vw] aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-charcoal"
          >
            <PropertyImage
              src={room.images[0].src}
              alt={room.images[0].alt}
              fill
              sizes="(min-width: 1024px) 56vw, (min-width: 640px) 70vw, 88vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
              {/* ivory, not terracotta: terracotta is a mid-tone accent
                  tuned for contrast against solid cream backgrounds
                  (see the .eyebrow utility) — directly on a photo with
                  warm brick/curtain tones of a similar hue, it nearly
                  disappeared. Every other on-photo label here (room name,
                  summary, features) is already ivory for exactly this
                  reason. */}
              <p className="text-xs tracking-[0.25em] text-ivory/80 mb-2">
                {room.type === "AC" ? "AIR CONDITIONED" : "NON AIR CONDITIONED"} · {room.count} ROOMS
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-ivory">{room.name}</h3>
              <p className="mt-3 max-w-md text-sm text-ivory/75 leading-relaxed">{room.summary}</p>

              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-1.5 text-xs text-ivory/70">
                    <img
                      src={featureIcons[feature] ?? "/icons/bed-double-sage.svg"}
                      className="size-[15px]"
                      alt=""
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-display text-xl text-ivory">{formatPrice(room.price)}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                {/* Straight to WhatsApp with the room pre-filled, not the
                    /book inquiry form. */}
                <a
                  href={buildWhatsAppLink({ roomType: room.type === "AC" ? "ac" : "non-ac" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-ivory px-6 py-2.5 text-sm tracking-wide text-charcoal hover:bg-sand transition-colors"
                >
                  Book This Room
                </a>
                <Link
                  href={`/rooms/${room.slug}`}
                  className="text-sm tracking-wide text-ivory border-b border-ivory/40 pb-1 hover:border-ivory transition-colors"
                >
                  View Room
                </Link>
              </div>
            </div>
          </article>
        ))}
        {/* Trailing spacer, not a real panel. Each panel is deliberately
            narrower than the track (so the next one peeks in from the
            edge) — but that means the browser's native scrollable width
            runs out before the LAST panel can ever reach flush-left: with
            only 2 rooms, "Next Room" would clamp partway and leave the
            second room permanently peeking rather than fully shown. This
            spacer, sized to the same "peek" amount as every panel, adds
            just enough trailing scroll room for the last real panel to
            fully arrive. */}
        <div aria-hidden className="shrink-0 w-[12vw] sm:w-[30vw] lg:w-[44vw]" />
      </div>
    </div>
  );
}
