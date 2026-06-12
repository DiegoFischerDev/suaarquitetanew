"use client";

import { PROJECT_IMAGES } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

function CarouselNavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Projeto anterior" : "Próximo projeto";

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cream/95 text-ink shadow-[0_8px_30px_-12px_rgba(26,24,20,0.35)] backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:shadow-[0_12px_36px_-12px_rgba(26,24,20,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-0 lg:flex ${
        direction === "prev" ? "left-3 xl:left-5" : "right-3 xl:right-5"
      }`}
    >
      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}

export function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const pointerStartX = useRef(0);
  const scrollStart = useRef(0);
  const reduceMotion = useReducedMotion();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("figure");
    const gap = 20;
    const amount = (firstCard?.offsetWidth ?? track.clientWidth * 0.28) + gap;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

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
  };

  return (
    <section className="section-pad overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Portfólio</p>
              <h2 className="heading-display text-3xl font-medium text-ink md:text-5xl">
                Projetos que contam histórias
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Uma seleção de trabalhos residenciais e comerciais desenvolvidos em Recife e em atendimento remoto para todo o Brasil.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <CarouselNavButton
            direction="prev"
            disabled={!canScrollPrev}
            onClick={() => scrollByCard("prev")}
          />
          <CarouselNavButton
            direction="next"
            disabled={!canScrollNext}
            onClick={() => scrollByCard("next")}
          />

          <div
            ref={trackRef}
            role="region"
            aria-label="Carrossel de projetos"
            className="flex cursor-grab touch-pan-x gap-5 overflow-x-auto pb-4 select-none [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing lg:px-1 [&::-webkit-scrollbar]:hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {PROJECT_IMAGES.map((project, index) => (
              <motion.figure
                key={project.src}
                className="group relative min-w-[78vw] shrink-0 overflow-hidden rounded-2xl sm:min-w-[52vw] md:min-w-[38vw] lg:min-w-[28vw]"
                initial={reduceMotion ? false : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
                draggable={false}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    draggable={false}
                    className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 78vw, 28vw"
                    loading="lazy"
                  />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
