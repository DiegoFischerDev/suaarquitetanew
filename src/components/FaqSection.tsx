"use client";

import { DesktopGlowSurface } from "@/components/ui/desktop-glow-surface";
import { FAQ } from "@/lib/content";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="section_eight"
      className="section-pad bg-cream-dark/40"
      aria-labelledby="heading-faq"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="eyebrow mb-3">FAQ</p>
          <h2
            id="heading-faq"
            className="heading-display text-3xl font-medium text-ink md:text-5xl"
          >
            Dúvidas Frequentes
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQ.map((item, index) => {
            const open = openIndex === index;
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <DesktopGlowSurface
                key={item.question}
                glowColor="sand"
                glowSize={200}
                className="p-0"
                asPlain="card-surface"
              >
                <button
                  type="button"
                  id={questionId}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={answerId}
                >
                  <h3 className="text-base font-medium text-ink md:text-lg">
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!open}
                  className={`grid transition-all duration-300 ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden px-6 pb-6 text-sm leading-relaxed text-muted md:text-base">
                    {item.answer}
                  </p>
                </div>
              </DesktopGlowSurface>
            );
          })}
        </div>
      </div>
    </section>
  );
}
