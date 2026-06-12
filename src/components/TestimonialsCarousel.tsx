"use client";

import { Testimonial } from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export type TestimonialEntry = {
  name: string;
  service: string;
  text: string;
  image: string;
};

const AUTOPLAY_MS = 6000;
const PAUSE_AFTER_INTERACTION_MS = 9000;

type TestimonialsCarouselProps = {
  testimonials: readonly TestimonialEntry[];
  className?: string;
};

export function TestimonialsCarousel({
  testimonials,
  className,
}: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const pointerStartX = useRef(0);
  const scrollStart = useRef(0);
  const pauseUntil = useRef(0);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const pauseAutoplay = useCallback(() => {
    pauseUntil.current = Date.now() + PAUSE_AFTER_INTERACTION_MS;
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const slides = track.querySelectorAll<HTMLElement>("[data-testimonial-slide]");
      const slide = slides[index];
      if (!slide) return;

      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: reduceMotion ? "auto" : behavior,
      });
      setActiveIndex(index);
    },
    [reduceMotion],
  );

  const syncActiveIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = [...track.querySelectorAll<HTMLElement>("[data-testimonial-slide]")];
    if (slides.length === 0) return;

    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - scrollCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (!isDragging.current) syncActiveIndexFromScroll();
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [syncActiveIndexFromScroll]);

  useEffect(() => {
    if (reduceMotion || testimonials.length <= 1) return;

    const timer = window.setInterval(() => {
      if (Date.now() < pauseUntil.current || isDragging.current) return;

      setActiveIndex((current) => {
        const next = (current + 1) % testimonials.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, scrollToIndex, testimonials.length]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    pauseAutoplay();
    isDragging.current = true;
    pointerStartX.current = event.clientX;
    scrollStart.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !isDragging.current) return;

    event.preventDefault();
    const delta = event.clientX - pointerStartX.current;
    track.scrollLeft = scrollStart.current - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !isDragging.current) return;

    isDragging.current = false;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    syncActiveIndexFromScroll();
  };

  if (testimonials.length === 0) return null;

  return (
    <div className={cn("w-full overflow-hidden md:hidden", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos de clientes"
        className="flex w-full cursor-grab touch-pan-x snap-x snap-mandatory overflow-x-auto pb-2 select-none active:cursor-grabbing [-ms-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {testimonials.map((item, index) => (
          <div
            key={item.name}
            data-testimonial-slide
            aria-hidden={activeIndex !== index}
            className="box-border w-full max-w-full shrink-0 grow-0 basis-full snap-center snap-always"
          >
            <Testimonial
              name={item.name}
              role={item.service}
              testimonial={item.text}
              rating={5}
              image={item.image}
              className="w-full min-w-0"
              aria-label={`Depoimento de ${item.name}`}
            />
          </div>
        ))}
      </div>

      {testimonials.length > 1 && (
        <div
          className="mt-5 flex items-center justify-center gap-1"
          role="tablist"
          aria-label="Selecionar depoimento"
        >
          {testimonials.map((item, index) => {
            const selected = activeIndex === index;
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Depoimento ${index + 1}: ${item.name}`}
                onClick={() => {
                  pauseAutoplay();
                  scrollToIndex(index);
                }}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    selected ? "w-6 bg-brand" : "w-2 bg-ink/20",
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
