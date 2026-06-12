"use client";

import { ABOUT } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

type PresentationBioProps = {
  className?: string;
};

export function PresentationBio({ className = "" }: PresentationBioProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`space-y-4 text-base leading-relaxed text-muted ${className}`}>
      {ABOUT.bio.map((paragraph, index) =>
        reduceMotion ? (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ) : (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {paragraph}
          </motion.p>
        ),
      )}
    </div>
  );
}
