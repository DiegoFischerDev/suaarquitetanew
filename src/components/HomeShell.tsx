"use client";

import { HeroCelebrationModal } from "@/components/HeroCelebrationModal";
import { type ReactNode } from "react";
import { HeroRevealProvider } from "./HeroRevealContext";

export function HomeShell({ children }: { children: ReactNode }) {
  return (
    <HeroRevealProvider>
      {children}
      <HeroCelebrationModal />
    </HeroRevealProvider>
  );
}
