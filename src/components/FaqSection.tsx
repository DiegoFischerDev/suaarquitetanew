"use client";

import { FAQ } from "@/lib/content";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="section_eight" className="section-pad bg-cream">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow mb-3 text-center">FAQ</p>
          <h2 className="heading-display text-center text-3xl font-medium text-ink md:text-5xl">
            Dúvidas Frequentes
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQ.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 0.03}>
                <div className="card-surface overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                  >
                    <h3 className="text-base font-medium text-ink md:text-lg">
                      {item.question}
                    </h3>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden px-6 pb-6 text-sm leading-relaxed text-muted md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
