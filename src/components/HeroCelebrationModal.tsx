"use client";

import { useHeroReveal } from "@/components/HeroRevealContext";
import { fireCelebrationConfetti } from "@/lib/celebration-confetti";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function HeroCelebrationModal() {
  const { revealComplete } = useHeroReveal();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!revealComplete || hasOpenedRef.current) return;

    hasOpenedRef.current = true;
    setOpen(true);
  }, [revealComplete]);

  useEffect(() => {
    if (!open) return;

    if (!reduceMotion) {
      fireCelebrationConfetti();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, reduceMotion]);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <button
            type="button"
            aria-label="Fechar celebração"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={dismiss}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-celebration-title"
            className={cn(
              "relative z-10 w-full max-w-lg rounded-3xl border border-ink/10 bg-cream px-6 py-8 text-center shadow-[0_32px_80px_-28px_rgba(26,24,20,0.45)]",
              "sm:px-10 sm:py-10",
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Fechar modal"
              className="absolute right-3 top-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:right-4 sm:top-4"
            >
              <X size={18} strokeWidth={2} aria-hidden />
            </button>

            <p className="eyebrow mb-4">Arquitetura democratizada</p>
            <h2
              id="hero-celebration-title"
              className="heading-display text-2xl font-medium leading-snug text-ink sm:text-3xl"
            >
              Você Acaba De Encontrar A Sua Arquiteta!
            </h2>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Continuar navegando"
              className={cn(
                "celebration-emoji-pulse mt-8 inline-flex cursor-pointer items-center justify-center bg-transparent p-2 text-5xl leading-none",
                "transition-opacity hover:opacity-80",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
              )}
            >
              <span aria-hidden>🥳</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
