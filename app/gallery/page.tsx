import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { BookStayButton } from "@/components/CtaButtons";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery — Hotel Chandreshwar, Rishikesh",
  description:
    "Browse photos of Hotel Chandreshwar's AC & Non-AC double-bed rooms, interiors and property in Chandreshwar Nagar, Rishikesh.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "Gallery", url: "/gallery" }]} />
        <Reveal className="max-w-2xl mt-6 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="eyebrow">GALLERY</p>
            <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">Gallery</h1>
            <p className="mt-5 text-charcoal/70 leading-relaxed max-w-xl">
              An honest look at the rooms, interiors and property at Hotel
              Chandreshwar. Tap any photo to view it full-screen.
            </p>
          </div>
          <BookStayButton size="lg" label="Plan Your Stay" />
        </Reveal>

        <Reveal delay={0.1}>
          <Gallery images={galleryImages} />
        </Reveal>
      </div>
    </div>
  );
}
