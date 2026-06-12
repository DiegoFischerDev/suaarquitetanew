"use client";

import { type ReactNode } from "react";
import { HeroRevealProvider } from "./HeroRevealContext";

export function HomeShell({ children }: { children: ReactNode }) {
  return <HeroRevealProvider>{children}</HeroRevealProvider>;
}
