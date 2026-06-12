"use client";

import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange" | "sand";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
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

const glowCards = new Set<HTMLDivElement>();
let glowListenerAttached = false;

function syncAllGlowCards(e: PointerEvent) {
  const { clientX: x, clientY: y } = e;
  const xVal = x.toFixed(2);
  const yVal = y.toFixed(2);
  const xp = (x / window.innerWidth).toFixed(2);
  const yp = (y / window.innerHeight).toFixed(2);

  glowCards.forEach((card) => {
    card.style.setProperty("--x", xVal);
    card.style.setProperty("--xp", xp);
    card.style.setProperty("--y", yVal);
    card.style.setProperty("--yp", yp);
  });
}

function attachGlowListener() {
  if (glowListenerAttached) return;
  document.addEventListener("pointermove", syncAllGlowCards);
  glowListenerAttached = true;
}

function detachGlowListener() {
  if (glowCards.size > 0 || !glowListenerAttached) return;
  document.removeEventListener("pointermove", syncAllGlowCards);
  glowListenerAttached = false;
}

function subscribeGlowCard(card: HTMLDivElement) {
  glowCards.add(card);
  attachGlowListener();

  return () => {
    glowCards.delete(card);
    detachGlowListener();
  };
}

function GlowCard({
  children,
  className = "",
  glowColor = "orange",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    return subscribeGlowCard(card);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getInlineStyles = (): CSSProperties & Record<string, string | number> => {
    const styles: CSSProperties & Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--radius": "14",
      "--border": "3",
      "--backdrop": "hsl(40 25% 96% / 0.72)",
      "--backup-border": "var(--backdrop)",
      "--size": "200",
      "--outer": "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize:
        "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
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
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      className={cn(
        !customSize && sizeMap[size],
        !customSize && "aspect-[3/4]",
        "relative gap-4 rounded-2xl p-4 shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]",
        customSize
          ? "flex h-full w-full flex-col"
          : "grid grid-rows-[1fr_auto]",
        className,
      )}
    >
      <div ref={innerRef} data-glow aria-hidden />
      {children}
    </div>
  );
}

export { GlowCard };
