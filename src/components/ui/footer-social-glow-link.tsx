"use client";

import { GlowCard, type GlowColor } from "@/components/ui/spotlight-card";
import { useMediaQuery, useMounted } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FooterSocialGlowLinkProps = {
  href: string;
  ariaLabel: string;
  external?: boolean;
  glowColor: GlowColor;
  iconClassName?: string;
  children: ReactNode;
};

export function FooterSocialGlowLink({
  href,
  ariaLabel,
  external = false,
  glowColor,
  iconClassName,
  children,
}: FooterSocialGlowLinkProps) {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useGlow = mounted && isDesktop;

  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  if (!useGlow) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...linkProps}
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          "border border-ink/15 bg-white/70 text-brand backdrop-blur-sm",
          "transition-colors hover:border-ink/25 hover:bg-ink/5",
          focusRing,
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <GlowCard
      customSize
      soft
      glowColor={glowColor}
      glowSize={105}
      border={2}
      radius={22}
      backdrop="hsl(40 25% 96% / 0.5)"
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full p-0 shadow-none backdrop-blur-[3px]"
    >
      <a
        href={href}
        aria-label={ariaLabel}
        {...linkProps}
        className={cn(
          "relative z-10 inline-flex h-full w-full items-center justify-center rounded-full text-brand",
          "transition-colors hover:opacity-80",
          focusRing,
          iconClassName,
        )}
      >
        {children}
      </a>
    </GlowCard>
  );
}
