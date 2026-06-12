"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import { useMounted } from "@/hooks/use-media-query";
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
};

export function DesktopGlowSurface({
  children,
  className,
  glowColor = "sand",
  glowSize = 200,
  backdrop,
  asPlain,
}: DesktopGlowSurfaceProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <div className={cn(asPlain, className)}>{children}</div>;
  }

  return (
    <GlowCard
      customSize
      glowColor={glowColor}
      glowSize={glowSize}
      backdrop={backdrop}
      className={className}
    >
      {children}
    </GlowCard>
  );
}
