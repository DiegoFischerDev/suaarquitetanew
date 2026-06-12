"use client";

import { ABOUT } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

type PresentationBioProps = {
  className?: string;
};

const fadeUp = (index: number, reduceMotion: boolean) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-40px" } as const,
        transition: {
          duration: 0.65,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

export function PresentationBio({ className = "" }: PresentationBioProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = reduceMotion ? "div" : motion.div;
  const MotionP = reduceMotion ? "p" : motion.p;

  return (
    <div className={className}>
      <MotionTag
        {...fadeUp(0, !!reduceMotion)}
        className="mb-6 space-y-4 border-b border-ink/10 pb-6"
      >
        <div>
          <p className="text-lg font-medium text-ink">{ABOUT.name}</p>
          <p className="mt-0.5 text-sm font-medium tracking-wide text-brand">
            {ABOUT.role}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Pós Graduada em:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
            {ABOUT.postGraduations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {ABOUT.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink"
            >
              {item}
            </span>
          ))}
        </div>
      </MotionTag>

      <div className="space-y-4 text-base leading-relaxed text-muted">
        {ABOUT.bio.map((paragraph, index) => (
          <MotionP key={paragraph.slice(0, 24)} {...fadeUp(index + 1, !!reduceMotion)}>
            {paragraph}
          </MotionP>
        ))}
      </div>
    </div>
  );
}
