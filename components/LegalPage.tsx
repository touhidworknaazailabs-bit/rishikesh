import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";

export type LegalSection = { heading: string; body: ReactNode };

export default function LegalPage({
  eyebrow,
  title,
  path,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial max-w-3xl">
        <Breadcrumbs items={[{ name: title, url: path }]} />
        <Reveal className="mt-6 mb-12">
          <p className="text-xs tracking-[0.25em] text-terracotta mb-4">{eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">{title}</h1>
          <p className="mt-4 text-sm text-charcoal/50">Last updated: {updated}</p>
          <p className="mt-6 text-charcoal/75 leading-relaxed">{intro}</p>
        </Reveal>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-3">
                {i + 1}. {s.heading}
              </h2>
              <div className="space-y-3 text-charcoal/70 leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
