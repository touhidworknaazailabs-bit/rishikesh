import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqStructuredData } from "@/components/StructuredData";
import { BookStayButton, WhatsAppButton } from "@/components/CtaButtons";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Hotel Chandreshwar",
  description:
    "Answers to common questions about rooms, AC/Non-AC options, hot water, location and direct booking at Hotel Chandreshwar, Rishikesh.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <FaqStructuredData faqs={faqs} />
      <div className="container-editorial max-w-3xl">
        <Breadcrumbs items={[{ name: "FAQ", url: "/faq" }]} />
        <Reveal className="mt-6 mb-14">
          <p className="eyebrow">FAQ</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal text-balance">
            Frequently Asked Questions
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion faqs={faqs} />
        </Reveal>
        <Reveal delay={0.15} className="mt-14 flex flex-wrap gap-4">
          <BookStayButton size="lg" />
          <WhatsAppButton size="lg" />
        </Reveal>
      </div>
    </div>
  );
}
