"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type HeroRevealContextValue = {
  revealComplete: boolean;
  setRevealComplete: (value: boolean) => void;
  registerScrollToFullReveal: (handler: (() => void) | null) => void;
  scrollToHeroFullReveal: () => void;
};

const HeroRevealContext = createContext<HeroRevealContextValue | null>(null);

export function HeroRevealProvider({ children }: { children: ReactNode }) {
  const [revealComplete, setRevealComplete] = useState(false);
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  const registerScrollToFullReveal = useCallback(
    (handler: (() => void) | null) => {
      scrollHandlerRef.current = handler;
    },
    [],
  );

  const scrollToHeroFullReveal = useCallback(() => {
    scrollHandlerRef.current?.();
  }, []);

  return (
    <HeroRevealContext.Provider
      value={{
        revealComplete,
        setRevealComplete,
        registerScrollToFullReveal,
        scrollToHeroFullReveal,
      }}
    >
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
