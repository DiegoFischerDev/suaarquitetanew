"use client";

import { GlowCard, type GlowColor } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SocialGlowColor = Extract<GlowColor, "green" | "purple" | "blue">;

type FooterSocialGlowLinkProps = {
  href: string;
  ariaLabel: string;
  external?: boolean;
  glowColor: SocialGlowColor;
  children: ReactNode;
};

const SOCIAL_GLOW: Record<
  SocialGlowColor,
  {
    hueBase: number;
    hueSpread: number;
    backdrop: string;
    glowSize: number;
    iconClassName: string;
  }
> = {
  green: {
    hueBase: 142,
    hueSpread: 110,
    backdrop: "color-mix(in srgb, hsl(142 38% 93%) 82%, transparent)",
    glowSize: 120,
    iconClassName: "text-emerald-700",
  },
  purple: {
    hueBase: 300,
    hueSpread: 130,
    backdrop: "color-mix(in srgb, hsl(300 36% 96%) 82%, transparent)",
    glowSize: 120,
    iconClassName: "text-fuchsia-700",
  },
  blue: {
    hueBase: 215,
    hueSpread: 110,
    backdrop: "color-mix(in srgb, hsl(215 40% 95%) 82%, transparent)",
    glowSize: 120,
    iconClassName: "text-sky-700",
  },
};

export function FooterSocialGlowLink({
  href,
  ariaLabel,
  external = false,
  glowColor,
  children,
}: FooterSocialGlowLinkProps) {
  const config = SOCIAL_GLOW[glowColor];

  return (
    <GlowCard
      customSize
      glowColor={glowColor}
      hueBase={config.hueBase}
      hueSpread={config.hueSpread}
      glowSize={config.glowSize}
      border={2}
      radius={22}
      backdrop={config.backdrop}
      className={cn(
        "footer-social-glow inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full p-0 shadow-none backdrop-blur-[3px]",
        `footer-social-glow--${glowColor}`,
      )}
    >
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={cn(
          "relative z-10 inline-flex h-full w-full items-center justify-center rounded-full",
          "transition-colors hover:opacity-80",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          config.iconClassName,
        )}
      >
        {children}
      </a>
    </GlowCard>
  );
}
