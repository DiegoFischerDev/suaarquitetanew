"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PREFIX = "Desenvolvido por ";
const NAME = "Diego Fischer Dev";
const FULL = `${PREFIX}${NAME}`;
const CHAR_DELAY = 42;
const END_PAUSE = 2400;
const DELETE_DELAY = 20;
const DEVELOPER_URL = "https://www.linkedin.com/in/diegofischerdev";

function TypewriterCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <span
      className="presentation-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[1.5px] translate-y-[1px] bg-muted"
      aria-hidden
    />
  );
}

export function FooterDeveloperCredit({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setLength(FULL.length);
      setDeleting(false);
      return;
    }

    let delay: number;
    if (deleting) {
      delay = length > 0 ? DELETE_DELAY : CHAR_DELAY;
    } else if (length >= FULL.length) {
      delay = END_PAUSE;
    } else {
      delay = CHAR_DELAY;
    }

    const timer = window.setTimeout(() => {
      if (deleting) {
        if (length > 0) {
          setLength((current) => current - 1);
        } else {
          setDeleting(false);
        }
        return;
      }

      if (length < FULL.length) {
        setLength((current) => current + 1);
      } else {
        setDeleting(true);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [length, deleting, reduceMotion]);

  const visible = FULL.slice(0, length);
  const nameComplete = length >= FULL.length;
  const nameVisible = length > PREFIX.length;
  const nameTyped = visible.slice(PREFIX.length);
  const showCursor = !reduceMotion && !nameComplete;

  return (
    <p className={cn("relative text-sm text-muted", className)}>
      <span className="invisible whitespace-nowrap" aria-hidden>
        {FULL}
      </span>

      <span className="absolute left-0 top-0 whitespace-nowrap">
        {nameVisible ? (
          <>
            {PREFIX}
            {nameComplete ? (
              <a
                href={DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {NAME}
              </a>
            ) : (
              nameTyped
            )}
          </>
        ) : (
          visible
        )}
        <TypewriterCursor visible={showCursor} />
      </span>

      <span className="sr-only">{FULL}</span>
    </p>
  );
}
