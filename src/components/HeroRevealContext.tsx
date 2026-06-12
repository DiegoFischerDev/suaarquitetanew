"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HeroRevealContextValue = {
  revealComplete: boolean;
  setRevealComplete: (value: boolean) => void;
};

const HeroRevealContext = createContext<HeroRevealContextValue | null>(null);

export function HeroRevealProvider({ children }: { children: ReactNode }) {
  const [revealComplete, setRevealComplete] = useState(false);

  return (
    <HeroRevealContext.Provider value={{ revealComplete, setRevealComplete }}>
      {children}
    </HeroRevealContext.Provider>
  );
}

export function useHeroReveal() {
  const context = useContext(HeroRevealContext);
  if (!context) {
    throw new Error("useHeroReveal must be used within HeroRevealProvider");
  }
  return context;
}
