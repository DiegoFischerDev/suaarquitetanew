"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  className?: string;
  autoplay?: boolean;
}

function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-hidden>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted/40",
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialSlider({
  testimonials,
  className,
  autoplay = true,
}: TestimonialSliderProps) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  }, [testimonials.length]);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (!autoplay || reduceMotion || testimonials.length <= 1) return;

    const timer = window.setInterval(handleNext, 8000);
    return () => window.clearInterval(timer);
  }, [autoplay, handleNext, reduceMotion, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    hidden: (slideDirection: number) => ({
      x: slideDirection > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: "0%",
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 260, damping: 30 },
    },
    exit: (slideDirection: number) => ({
      x: slideDirection < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 30 },
    }),
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
  };

  if (!currentTestimonial) return null;

  const motionVariants =
    reduceMotion || !isDesktop ? fadeVariants : slideVariants;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-3xl overflow-x-hidden md:overflow-hidden",
        className,
      )}
    >
      <div className="relative md:min-h-[300px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={motionVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit={reduceMotion ? undefined : "exit"}
            className="relative w-full md:absolute md:inset-0 md:h-full"
          >
            <div className="flex w-full flex-col items-center p-2 md:h-full md:flex-row md:justify-center">
              <div className="relative z-10 mb-4 h-40 w-40 shrink-0 sm:h-44 sm:w-44 md:mb-0 md:mr-[-3.5rem] md:h-56 md:w-56">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  fill
                  className="rounded-2xl object-cover shadow-[0_16px_40px_-20px_rgba(26,24,20,0.45)]"
                  sizes="(max-width: 768px) 176px, 224px"
                  loading="lazy"
                />
              </div>

              <div className="relative w-full rounded-2xl border border-ink/10 bg-white/85 p-5 pt-8 shadow-[0_20px_50px_-28px_rgba(26,24,20,0.25)] backdrop-blur-sm md:pb-5 md:pl-24 md:pr-5 md:pt-5">
                <Quote
                  className="absolute left-4 top-4 h-8 w-8 text-brand/15"
                  aria-hidden
                />
                <blockquote className="mb-4 text-sm leading-relaxed text-ink/90 md:text-base">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>
                <StarRating rating={currentTestimonial.rating} className="mb-4" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-lg font-medium text-ink">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-muted">{currentTestimonial.role}</p>
                  </div>
                  <div className="flex shrink-0 items-center justify-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-cream/90 text-ink transition-colors hover:bg-cream-dark/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      aria-label="Depoimento anterior"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-cream/90 text-ink transition-colors hover:bg-cream-dark/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      aria-label="Próximo depoimento"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToIndex(index)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={`Ir para depoimento ${index + 1}`}
            aria-current={currentIndex === index ? "true" : undefined}
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "w-4 bg-brand"
                  : "w-2 bg-muted/40",
              )}
              aria-hidden
            />
          </button>
        ))}
      </div>
    </div>
  );
}
