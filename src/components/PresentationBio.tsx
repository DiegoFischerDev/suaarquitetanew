"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
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
        className="mt-4 lg:mt-6"
      >
        <div className="flex flex-wrap gap-2">
          {ABOUT.highlights.map((item) => (
            <GlowCard
              key={item}
              customSize
              glowColor="sand"
              glowSize={150}
              className="inline-flex w-auto rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink"
            >
              {item}
            </GlowCard>
          ))}
        </div>
      </MotionTag>

      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
        {ABOUT.bio.map((paragraph, index) => (
          <MotionP key={paragraph.slice(0, 24)} {...fadeUp(index + 1, !!reduceMotion)}>
            {paragraph}
          </MotionP>
        ))}
      </div>
    </div>
  );
}
