"use client";

import { GlowCard, type GlowColor } from "@/components/ui/spotlight-card";
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
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={cn(
          "relative z-10 inline-flex h-full w-full items-center justify-center rounded-full text-brand",
          "transition-colors hover:opacity-80",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          iconClassName,
        )}
      >
        {children}
      </a>
    </GlowCard>
  );
}
