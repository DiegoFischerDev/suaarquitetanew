"use client";

import { HERO } from "@/lib/content";
import { useMediaQuery, useMounted } from "@/hooks/use-media-query";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHeroReveal } from "./HeroRevealContext";

const IMAGE_BEFORE = "/assets/images/imagem inicial.png";
const IMAGE_AFTER = "/assets/images/imagem final.png";
const SCROLL_HEIGHT = "290vh";
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const INITIAL_MOBILE_REVEAL = 0.5;
const MOBILE_INTRO_EASE = [0.22, 1, 0.36, 1] as const;

function clipPathFromProgress(progress: number) {
  return `inset(0 ${(1 - progress) * 100}% 0 0)`;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const reduceMotion = useReducedMotion();
  const { setRevealComplete } = useHeroReveal();
  const [mobileReveal, setMobileReveal] = useState(INITIAL_MOBILE_REVEAL);
  const [heroImagesReady, setHeroImagesReady] = useState({
    before: false,
    after: false,
  });
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const draggingRef = useRef(false);
  const introPlayedRef = useRef(false);

  const useDesktopScrollReveal = mounted && isDesktop && !reduceMotion;
  const useMobileDragReveal = mounted && !isDesktop && !reduceMotion;
  const allHeroImagesReady = heroImagesReady.before && heroImagesReady.after;

  const markHeroImageReady = useCallback((key: "before" | "after") => {
    setHeroImagesReady((current) =>
      current[key] ? current : { ...current, [key]: true },
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollClipPath = useTransform(scrollYProgress, [0, 1], [
    "inset(0 100% 0 0)",
    "inset(0 0% 0 0)",
  ]);
  const scrollDividerLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const beforeOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0.85]);
  const overlayStrength = useTransform(scrollYProgress, [0, 0.45, 1], [0.75, 0.3, 0]);

  const mobileClipPath = useMotionValue(clipPathFromProgress(INITIAL_MOBILE_REVEAL));
  const mobileDividerLeft = useMotionValue("50%");

  useEffect(() => {
    const clip = clipPathFromProgress(mobileReveal);
    mobileClipPath.set(clip);
    mobileDividerLeft.set(`${mobileReveal * 100}%`);
  }, [mobileReveal, mobileClipPath, mobileDividerLeft]);

  const updateMobileReveal = useCallback((clientX: number) => {
    const hero = containerRef.current;
    if (!hero) return;

    const { left, width } = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (clientX - left) / width));
    setMobileReveal(progress);
  }, []);

  const handleMobilePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (useDesktopScrollReveal || isIntroPlaying) return;

    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateMobileReveal(event.clientX);
  };

  const handleMobilePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || useDesktopScrollReveal) return;
    updateMobileReveal(event.clientX);
  };

  const handleMobilePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  useEffect(() => {
    if (!useMobileDragReveal) return;

    const cleaners: Array<() => void> = [];

    ([
      ["before", IMAGE_BEFORE],
      ["after", IMAGE_AFTER],
    ] as const).forEach(([key, src]) => {
      const img = new window.Image();
      const markReady = () => markHeroImageReady(key);

      img.addEventListener("load", markReady);
      img.src = src;

      if (img.complete) {
        markReady();
      }

      cleaners.push(() => img.removeEventListener("load", markReady));
    });

    return () => cleaners.forEach((clean) => clean());
  }, [useMobileDragReveal, markHeroImageReady]);

  useEffect(() => {
    if (!useMobileDragReveal || !allHeroImagesReady || introPlayedRef.current) {
      return;
    }

    introPlayedRef.current = true;
    let cancelled = false;

    const runMobileIntro = async () => {
      setIsIntroPlaying(true);
      draggingRef.current = true;

      const animateReveal = (from: number, to: number, duration: number) =>
        animate(from, to, {
          duration,
          ease: MOBILE_INTRO_EASE,
          onUpdate: (value) => {
            if (!cancelled) {
              setMobileReveal(value);
            }
          },
        });

      await animateReveal(INITIAL_MOBILE_REVEAL, 1, 1.35);
      if (cancelled) return;

      await wait(450);
      if (cancelled) return;

      await animateReveal(1, INITIAL_MOBILE_REVEAL, 1.15);
      if (cancelled) return;

      draggingRef.current = false;
      setIsIntroPlaying(false);
    };

    void runMobileIntro();

    return () => {
      cancelled = true;
      draggingRef.current = false;
      setIsIntroPlaying(false);
    };
  }, [useMobileDragReveal, allHeroImagesReady]);

  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const updateNavVisibility = () => {
      const { bottom } = hero.getBoundingClientRect();
      setRevealComplete(bottom <= 1);
    };

    updateNavVisibility();
    window.addEventListener("scroll", updateNavVisibility, { passive: true });
    window.addEventListener("resize", updateNavVisibility);

    return () => {
      window.removeEventListener("scroll", updateNavVisibility);
      window.removeEventListener("resize", updateNavVisibility);
    };
  }, [setRevealComplete]);

  const sectionHeight = reduceMotion
    ? "100vh"
    : useDesktopScrollReveal
      ? SCROLL_HEIGHT
      : "100vh";

  const showStaticAfter = reduceMotion && !useDesktopScrollReveal;

  return (
    <section
      id="section_one"
      ref={containerRef}
      className="relative"
      style={{ height: sectionHeight }}
      aria-label="Apresentação Sua Arquiteta — antes e depois do projeto"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{ opacity: useDesktopScrollReveal ? beforeOpacity : 1 }}
          >
            <Image
              src={IMAGE_BEFORE}
              alt="Salão de beleza antes do projeto de design de interiores — Sua Arquiteta Recife"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              onLoad={() => markHeroImageReady("before")}
            />
          </motion.div>

          {showStaticAfter ? (
            <Image
              src={IMAGE_AFTER}
              alt="Salão de beleza após projeto de design de interiores — Sua Arquiteta Agni Garcia"
              fill
              priority
              className="object-cover brightness-[1.2] contrast-[1.04] saturate-[1.06]"
              sizes="100vw"
              onLoad={() => markHeroImageReady("after")}
            />
          ) : useDesktopScrollReveal ? (
            <motion.div
              className="absolute inset-0 brightness-[1.2] contrast-[1.04] saturate-[1.06]"
              style={{ clipPath: scrollClipPath }}
            >
              <Image
                src={IMAGE_AFTER}
                alt="Salão de beleza após projeto de design de interiores — Sua Arquiteta Agni Garcia"
                fill
                priority
                className="object-cover"
                sizes="100vw"
                onLoad={() => markHeroImageReady("after")}
              />
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0 brightness-[1.2] contrast-[1.04] saturate-[1.06]"
              style={{ clipPath: mobileClipPath }}
            >
              <Image
                src={IMAGE_AFTER}
                alt="Salão de beleza após projeto de design de interiores — Sua Arquiteta Agni Garcia"
                fill
                priority
                className="object-cover"
                sizes="100vw"
                onLoad={() => markHeroImageReady("after")}
              />
            </motion.div>
          )}

          {!showStaticAfter && (
            <motion.div
              className={`absolute inset-y-0 z-20 flex w-12 -translate-x-1/2 items-center justify-center touch-none ${
                useDesktopScrollReveal || isIntroPlaying
                  ? "pointer-events-none"
                  : "cursor-ew-resize active:cursor-grabbing"
              }`}
              style={{
                left: useDesktopScrollReveal ? scrollDividerLeft : mobileDividerLeft,
              }}
              onPointerDown={useDesktopScrollReveal ? undefined : handleMobilePointerDown}
              onPointerMove={useDesktopScrollReveal ? undefined : handleMobilePointerMove}
              onPointerUp={useDesktopScrollReveal ? undefined : handleMobilePointerUp}
              onPointerCancel={useDesktopScrollReveal ? undefined : handleMobilePointerUp}
              aria-hidden={useDesktopScrollReveal}
              role={useDesktopScrollReveal ? undefined : "slider"}
              aria-label={
                useDesktopScrollReveal
                  ? undefined
                  : "Comparar antes e depois do projeto"
              }
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(mobileReveal * 100)}
            >
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cream/90 shadow-[0_0_24px_rgba(249,248,243,0.65)]" />
              <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-ink/55 backdrop-blur-sm">
                <div className="flex gap-0.5">
                  <span className="h-1 w-1 rounded-full bg-cream/80" />
                  <span className="h-1 w-1 rounded-full bg-cream/80" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {useDesktopScrollReveal ? (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/25"
              style={{ opacity: overlayStrength }}
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/20 to-transparent"
              style={{ opacity: overlayStrength }}
            />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-ink/20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-ink/92 via-ink/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/45 to-transparent" />
          </>
        )}

        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-10 md:pb-16 lg:px-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-4xl ${
              useDesktopScrollReveal
                ? ""
                : "[text-shadow:0_2px_20px_rgba(26,24,20,0.65)]"
            }`}
          >
            <p
              className={`mb-2 text-sm font-light tracking-[0.18em] lg:mb-4 md:text-base ${
                useDesktopScrollReveal ? "text-cream" : "text-cream/95"
              }`}
            >
              Recife · Brasil · Presencial e remoto
            </p>
            <h2 className="heading-display text-[clamp(2.4rem,7.5vw,6.5rem)] font-medium leading-[0.9] text-cream lg:leading-[0.95]">
              {HERO.visualTitle}
            </h2>
            <p
              className={`heading-display mt-1 text-[clamp(1.5rem,4vw,3.25rem)] font-normal tracking-[0.06em] lg:mt-3 ${
                useDesktopScrollReveal ? "text-cream/95" : "text-cream"
              }`}
            >
              {HERO.architectName}
            </p>
            <p
              className={`mt-2.5 max-w-xl text-base font-light lg:mt-5 lg:text-lg md:text-xl ${
                useDesktopScrollReveal ? "text-cream/90" : "text-cream/95"
              }`}
            >
              {HERO.visualSubtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 lg:mt-8 lg:gap-3">
              {HERO.projectTypes.map((type) => (
                <span
                  key={type}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-light uppercase tracking-[0.18em] lg:px-4 lg:py-2 lg:text-xs lg:tracking-[0.2em] ${
                    useDesktopScrollReveal
                      ? "border-cream/25 text-cream"
                      : "border-cream/35 bg-ink/25 text-cream backdrop-blur-[2px]"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </motion.div>

          {useDesktopScrollReveal && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} aria-hidden="true" />
              <span className="sr-only">Role para revelar o projeto</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
