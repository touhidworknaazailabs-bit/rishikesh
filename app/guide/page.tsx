import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import PropertyImage from "@/components/PropertyImage";
import { guideArticles } from "@/data/guide";

export const metadata: Metadata = {
  title: "Rishikesh Travel Guide",
  description:
    "Practical guides for planning a trip to Rishikesh — things to do, best time to visit, places to see, and tips for families.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial">
        <Breadcrumbs items={[{ name: "Rishikesh Guide", url: "/guide" }]} />
        <Reveal className="max-w-2xl mt-6 mb-16">
          <p className="eyebrow">RISHIKESH GUIDE</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">
            Planning a Trip to Rishikesh
          </h1>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Practical, honest guides to help you plan — written for travelers,
            not search engines. Written by the team at Hotel Chandreshwar.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px overflow-hidden rounded-2xl bg-charcoal/10 border border-charcoal/10">
          {guideArticles.map((article) => (
            <Reveal key={article.slug} className="bg-ivory p-8 md:p-10">
              <Link href={`/guide/${article.slug}`} className="group block h-full">
                {article.heroImage && (
                  <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl bg-charcoal/5">
                    <PropertyImage
                      src={article.heroImage}
                      alt={article.heroImageAlt ?? article.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Plain text, not the interactive PhotoCredit badge —
                        this whole card is itself a <Link>, and nesting a
                        <button> inside an <a> is invalid HTML and would
                        also trigger the card's own navigation on tap. The
                        full, clickable credit is on the article page. */}
                    {article.heroCredit && (
                      <span className="absolute bottom-1.5 right-2 rounded bg-charcoal/50 px-1.5 py-0.5 text-[10px] text-ivory/80 backdrop-blur-sm">
                        Photo: {article.heroCredit.photographer}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-2xl md:text-3xl text-charcoal group-hover:text-terracotta transition-colors">
                    {article.title}
                  </h2>
                  <img
                    src="/icons/arrow-up-right-terracotta.svg"
                    className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    alt=""
                    aria-hidden
                  />
                </div>
                <p className="mt-4 text-charcoal/65 leading-relaxed">{article.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
