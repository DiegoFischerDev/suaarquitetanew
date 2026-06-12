"use client";

import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange" | "sand";

interface GlowSurfaceProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  glowSize?: number;
  backdrop?: string;
  radius?: number;
  border?: number;
  soft?: boolean;
  width?: string | number;
  height?: string | number;
}

interface GlowCardProps extends GlowSurfaceProps {
  size?: "sm" | "md" | "lg";
  customSize?: boolean;
}

export const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  sand: { base: 38, spread: 110 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const pointerGlowCards = new Set<HTMLDivElement>();
let pointerListenerAttached = false;

function prefersPointerGlow() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function setGlowPositionFixed(card: HTMLDivElement, x: number, y: number) {
  card.dataset.glowMode = "fixed";
  card.style.setProperty("--x", x.toFixed(2));
  card.style.setProperty("--y", y.toFixed(2));
  card.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
  card.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
}

function setGlowPositionLocal(card: HTMLDivElement, xPercent: number, yPercent: number) {
  card.dataset.glowMode = "local";
  card.style.setProperty("--x", xPercent.toFixed(2));
  card.style.setProperty("--y", yPercent.toFixed(2));
  card.style.setProperty("--xp", (xPercent / 100).toFixed(2));
  card.style.setProperty("--yp", (yPercent / 100).toFixed(2));
}

function syncPointerGlowCards(event: PointerEvent) {
  const { clientX: x, clientY: y } = event;
  pointerGlowCards.forEach((card) => setGlowPositionFixed(card, x, y));
}

function attachPointerListener() {
  if (pointerListenerAttached) return;
  document.addEventListener("pointermove", syncPointerGlowCards);
  pointerListenerAttached = true;
}

function detachPointerListener() {
  if (pointerGlowCards.size > 0 || !pointerListenerAttached) return;
  document.removeEventListener("pointermove", syncPointerGlowCards);
  pointerListenerAttached = false;
}

function subscribePointerGlow(card: HTMLDivElement) {
  pointerGlowCards.add(card);
  setGlowPositionFixed(card, window.innerWidth / 2, window.innerHeight / 2);
  attachPointerListener();

  return () => {
    pointerGlowCards.delete(card);
    delete card.dataset.glowMode;
    detachPointerListener();
  };
}

function subscribeScrollGlow(card: HTMLDivElement) {
  let rafId = 0;
  let lastScrollY = window.scrollY;
  let scrollInfluence = 0;

  card.dataset.glowMode = "local";

  const onScroll = () => {
    const delta = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollInfluence = Math.min(1, scrollInfluence + delta * 0.01);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  const tick = (time: number) => {
    scrollInfluence *= 0.9;

    const rect = card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const inView = rect.bottom > 0 && rect.top < viewportHeight;

    if (inView) {
      const centerY = rect.top + rect.height * 0.5;
      const viewportProgress = 1 - Math.min(1, Math.max(0, centerY / viewportHeight));
      const animationTime = time * 0.00038;
      const scrollWave = viewportProgress * Math.PI * 2.5;

      const localX =
        0.18 +
        0.64 *
          (0.5 +
            0.5 * Math.sin(animationTime + scrollWave + scrollInfluence * 2.5));
      const localY =
        0.14 +
        0.72 *
          (0.5 +
            0.5 *
              Math.cos(
                animationTime * 0.88 + scrollWave * 1.15 + scrollInfluence * 1.8,
              ));

      setGlowPositionLocal(card, localX * 100, localY * 100);

      const spotOpacity = 0.08 + viewportProgress * 0.05 + scrollInfluence * 0.08;
      const borderSpotOpacity = 0.55 + scrollInfluence * 0.4;

      card.style.setProperty("--bg-spot-opacity", spotOpacity.toFixed(3));
      card.style.setProperty("--border-spot-opacity", borderSpotOpacity.toFixed(3));
    }

    rafId = window.requestAnimationFrame(tick);
  };

  rafId = window.requestAnimationFrame(tick);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.cancelAnimationFrame(rafId);
    delete card.dataset.glowMode;
    card.style.removeProperty("--bg-spot-opacity");
    card.style.removeProperty("--border-spot-opacity");
  };
}

function subscribeGlowCard(card: HTMLDivElement) {
  if (prefersPointerGlow()) {
    return subscribePointerGlow(card);
  }
  return subscribeScrollGlow(card);
}

function buildGlowStyles({
  glowColor,
  glowSize,
  backdrop,
  radius,
  border,
  soft = false,
  width,
  height,
}: {
  glowColor: GlowColor;
  glowSize: number;
  backdrop: string;
  radius: number;
  border: number;
  soft?: boolean;
  width?: string | number;
  height?: string | number;
}): CSSProperties & Record<string, string | number> {
  const { base, spread } = glowColorMap[glowColor];
  const styles: CSSProperties & Record<string, string | number> = {
    "--base": base,
    "--spread": soft ? spread * 0.55 : spread,
    "--radius": radius,
    "--border": border,
    "--backdrop": backdrop,
    "--backup-border": "var(--backdrop)",
    "--size": glowSize,
    "--outer": soft ? 0.4 : 1,
    "--saturation": soft ? 72 : 100,
    "--lightness": soft ? 74 : 70,
    "--bg-spot-opacity": soft ? 0.045 : 0.1,
    "--border-spot-opacity": soft ? 0.32 : 1,
    "--border-light-opacity": soft ? 0.18 : 1,
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    isolation: "isolate",
  };

  if (width !== undefined) {
    styles.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height !== undefined) {
    styles.height = typeof height === "number" ? `${height}px` : height;
  }

  return styles;
}

function GlowSurface({
  children,
  className = "",
  glowColor = "sand",
  glowSize = 200,
  backdrop = "hsl(40 25% 96% / 0.72)",
  radius = 14,
  border = 3,
  soft = false,
  width,
  height,
}: GlowSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = subscribeGlowCard(surface);

    const handleChange = () => {
      cleanup();
      cleanup = subscribeGlowCard(surface);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={surfaceRef}
      data-glow
      data-glow-mode="fixed"
      data-glow-soft={soft ? "" : undefined}
      style={buildGlowStyles({
        glowColor,
        glowSize,
        backdrop,
        radius,
        border,
        soft,
        width,
        height,
      })}
      className={className}
    >
      <div data-glow aria-hidden />
      {children}
    </div>
  );
}

function GlowCard({
  children,
  className = "",
  glowColor = "orange",
  glowSize = 200,
  backdrop,
  radius = 14,
  border = 3,
  soft = false,
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  return (
    <GlowSurface
      glowColor={glowColor}
      glowSize={glowSize}
      backdrop={backdrop ?? "hsl(40 25% 96% / 0.72)"}
      radius={radius}
      border={border}
      soft={soft}
      width={width}
      height={height}
      className={cn(
        !customSize && sizeMap[size],
        !customSize && "aspect-[3/4]",
        "relative gap-4 rounded-2xl p-4 shadow-[0_8px_30px_-12px_rgba(26,24,20,0.16)] backdrop-blur-[5px]",
        customSize
          ? "flex h-full w-full flex-col"
          : "grid grid-rows-[1fr_auto]",
        className,
      )}
    >
      {children}
    </GlowSurface>
  );
}

export { GlowCard, GlowSurface };
export type { GlowColor };
