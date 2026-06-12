"use client";

import { ABOUT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const CHAR_DELAY = 28;
const LINE_PAUSE = 320;

type AnimationStep =
  | { type: "text"; key: string; full: string }
  | { type: "pause"; key: string; ms: number };

function buildSteps(): AnimationStep[] {
  const steps: AnimationStep[] = [
    { type: "text", key: "name", full: ABOUT.name },
    { type: "pause", key: "after-name", ms: LINE_PAUSE },
    { type: "text", key: "role", full: ABOUT.role },
    { type: "pause", key: "after-role", ms: LINE_PAUSE },
    { type: "text", key: "label", full: "Pós Graduada em:" },
    { type: "pause", key: "after-label", ms: LINE_PAUSE },
  ];

  ABOUT.postGraduations.forEach((item, index) => {
    steps.push({ type: "text", key: `item-${index}`, full: item });
    steps.push({ type: "pause", key: `after-item-${index}`, ms: LINE_PAUSE });
  });

  return steps;
}

function getTypography(compact: boolean) {
  return {
    nameSize: compact ? "text-[0.8125rem]" : "text-lg",
    roleSize: compact ? "text-[0.6875rem]" : "text-sm",
    labelSize: compact ? "text-[0.5625rem] tracking-[0.16em]" : "text-xs tracking-[0.22em]",
    itemSize: compact ? "text-[0.625rem] leading-snug" : "text-sm leading-relaxed",
    spacing: compact ? "space-y-1.5" : "space-y-4",
  };
}

function TypewriterCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <span
      className="presentation-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[1.5px] translate-y-[1px] bg-brand"
      aria-hidden
    />
  );
}

function PulsingMarker({
  active,
  index,
}: {
  active: boolean;
  index: number;
}) {
  return (
    <span
      className={`presentation-marker mt-[0.35rem] shrink-0 ${active ? "presentation-marker--glow" : "opacity-40"}`}
      style={{ animationDelay: `${index * 0.45}s` }}
      aria-hidden
    />
  );
}

function CredentialsStaticLayout({ compact }: { compact: boolean }) {
  const { nameSize, roleSize, labelSize, itemSize, spacing } = getTypography(compact);

  return (
    <div className={spacing}>
      <div>
        <p className={`${nameSize} font-medium text-ink`}>{ABOUT.name}</p>
        <p className={`${roleSize} mt-0.5 font-medium tracking-wide text-brand`}>
          {ABOUT.role}
        </p>
      </div>
      <div>
        <p className={`${labelSize} font-medium uppercase text-muted`}>
          Pós Graduada em:
        </p>
        <ul className={`mt-1.5 space-y-1 ${itemSize} text-ink/85`}>
          {ABOUT.postGraduations.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="presentation-marker presentation-marker--glow mt-[0.35rem] shrink-0 opacity-0" aria-hidden />
              <span className="min-w-0 flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PresentationCredentials({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const steps = useMemo(() => buildSteps(), []);
  const { nameSize, roleSize, labelSize, itemSize, spacing } = getTypography(compact);
  const [inView, setInView] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [revealed, setRevealed] = useState<Record<string, string>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const started = inView || !!reduceMotion;
  const done = reduceMotion || stepIndex >= steps.length;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setRevealed({
        name: ABOUT.name,
        role: ABOUT.role,
        label: "Pós Graduada em:",
        ...Object.fromEntries(
          ABOUT.postGraduations.map((item, index) => [`item-${index}`, item]),
        ),
      });
      setStepIndex(steps.length);
      return;
    }

    if (!started || stepIndex >= steps.length) return;

    const step = steps[stepIndex];

    if (step.type === "pause") {
      const timer = setTimeout(() => setStepIndex((i) => i + 1), step.ms);
      return () => clearTimeout(timer);
    }

    setActiveKey(step.key);

    if (charIndex >= step.full.length) {
      setRevealed((prev) => ({ ...prev, [step.key]: step.full }));
      const timer = setTimeout(() => {
        setCharIndex(0);
        setStepIndex((i) => i + 1);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      const next = step.full.slice(0, charIndex + 1);
      setRevealed((prev) => ({ ...prev, [step.key]: next }));
      setCharIndex((c) => c + 1);
    }, CHAR_DELAY);

    return () => clearTimeout(timer);
  }, [reduceMotion, started, steps, stepIndex, charIndex]);

  const showRole = done || revealed.role !== undefined || activeKey === "role";
  const showLabel = done || revealed.label !== undefined || activeKey === "label";

  return (
    <div ref={containerRef} className="relative">
      <div aria-hidden className="invisible pointer-events-none select-none">
        <CredentialsStaticLayout compact={compact} />
      </div>

      <div className={cn("absolute inset-0", spacing)}>
        <div>
          <p className={`${nameSize} font-medium text-ink`}>
            {revealed.name ?? ""}
            {!done && activeKey === "name" && (
              <TypewriterCursor visible={(revealed.name?.length ?? 0) < ABOUT.name.length} />
            )}
          </p>
          {showRole && (
            <p className={`${roleSize} mt-0.5 font-medium tracking-wide text-brand`}>
              {revealed.role ?? ""}
              {!done && activeKey === "role" && (
                <TypewriterCursor visible={(revealed.role?.length ?? 0) < ABOUT.role.length} />
              )}
            </p>
          )}
        </div>

        {showLabel && (
          <div>
            <p className={`${labelSize} font-medium uppercase text-muted`}>
              {revealed.label ?? ""}
              {!done && activeKey === "label" && (
                <TypewriterCursor visible={(revealed.label?.length ?? 0) < "Pós Graduada em:".length} />
              )}
            </p>
            <ul className={`mt-1.5 space-y-1 ${itemSize} text-ink/85`}>
              {ABOUT.postGraduations.map((item, index) => {
                const key = `item-${index}`;
                const text = revealed[key];
                const itemStarted = text !== undefined || activeKey === key || done;

                if (!itemStarted) {
                  return (
                    <li key={item} className="flex gap-2 invisible" aria-hidden>
                      <PulsingMarker active={false} index={index} />
                      <span className="min-w-0 flex-1">{item}</span>
                    </li>
                  );
                }

                const isActive = !done && activeKey === key;
                const isComplete = done || (text !== undefined && text.length >= item.length);

                return (
                  <li key={item} className="flex gap-2">
                    <PulsingMarker active={isActive || isComplete} index={index} />
                    <span className="min-w-0 flex-1">
                      {text ?? ""}
                      {isActive && (
                        <TypewriterCursor visible={(text?.length ?? 0) < item.length} />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <span className="sr-only">
        {ABOUT.name}. {ABOUT.role}. Pós Graduada em:{" "}
        {ABOUT.postGraduations.join(", ")}
      </span>
    </div>
  );
}
