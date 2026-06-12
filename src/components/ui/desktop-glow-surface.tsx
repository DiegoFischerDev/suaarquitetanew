"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import { useMediaQuery, useMounted } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange" | "sand";

type DesktopGlowSurfaceProps = {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  glowSize?: number;
  backdrop?: string;
  asPlain?: string;
  /** Habilita glow no mobile; padrão só desktop (≥1024px). */
  mobileGlow?: boolean;
  radius?: number;
  border?: number;
};

export function DesktopGlowSurface({
  children,
  className,
  glowColor = "sand",
  glowSize = 200,
  backdrop,
  asPlain,
  mobileGlow = false,
  radius,
  border,
}: DesktopGlowSurfaceProps) {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useGlow = mounted && (isDesktop || mobileGlow);

  if (useGlow) {
    return (
      <GlowCard
        customSize
        glowColor={glowColor}
        glowSize={glowSize}
        backdrop={backdrop}
        radius={radius}
        border={border}
        className={className}
      >
        {children}
      </GlowCard>
    );
  }

  return <div className={cn(asPlain, className)}>{children}</div>;
}
