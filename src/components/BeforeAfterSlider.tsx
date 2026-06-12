"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const reduceMotion = useReducedMotion();
  const [percent, setPercent] = useState(50);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, next)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || reduceMotion) return;

    event.preventDefault();
    updatePosition(event.clientX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    isDragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const clipRight = 100 - percent;

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink select-none sm:aspect-[16/10]"
    >
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        draggable={false}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${clipRight}% 0 0)` }}
        aria-hidden={percent <= 0}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          draggable={false}
          className="object-cover brightness-[1.04] contrast-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {!reduceMotion && (
        <div
          role="slider"
          aria-label="Arraste para comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          className="absolute inset-y-0 z-20 w-12 -translate-x-1/2 cursor-ew-resize touch-none"
          style={{ left: `${percent}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cream/90 shadow-[0_0_24px_rgba(249,248,243,0.65)]" />
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-ink/55 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-cream/80" />
              <span className="h-1 w-1 rounded-full bg-cream/80" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
