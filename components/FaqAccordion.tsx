"use client";

import { useState } from "react";
import clsx from "clsx";
import { FaqItem } from "@/data/faq";

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal/10 border-t border-b border-charcoal/10">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-charcoal/[0.02] -mx-2 px-2"
            >
              <span className="font-display text-lg md:text-xl text-charcoal">{faq.question}</span>
              <img
                src="/icons/plus-terracotta.svg"
                className={clsx("size-5 shrink-0 transition-transform duration-300", isOpen && "rotate-45")}
                alt=""
                aria-hidden
              />
            </button>
            <div
              className={clsx(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-charcoal/70 leading-relaxed max-w-2xl">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
