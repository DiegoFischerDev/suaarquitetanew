"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type EditorialImage = {
  src: string;
  alt: string;
};

type EditorialStatementImageRotatorProps = {
  images: readonly EditorialImage[];
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
};

const INTERVAL_MS = 10000;
const FADE_DURATION_S = 1.1;

export function EditorialStatementImageRotator({
  images,
  sizes,
  priority = false,
  decorative = false,
}: EditorialStatementImageRotatorProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [images.length, reduceMotion]);

  const current = images[index];
  if (!current) return null;

  if (reduceMotion || images.length <= 1) {
    return (
      <Image
        src={current.src}
        alt={decorative ? "" : current.alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={current.src}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: FADE_DURATION_S,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={current.src}
          alt={decorative ? "" : current.alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </AnimatePresence>
  );
}
