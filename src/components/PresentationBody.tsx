"use client";

import expertAgni from "@images/expert-Agni.png";
import { useMediaQuery, useMounted } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PresentationBio } from "./PresentationBio";
import { PresentationCredentials } from "./PresentationCredentials";

const FADE_HEIGHT_RATIO = 0.1;
const DESKTOP_QUERY = "(min-width: 1024px)";

function PresentationAgniPortrait({
  containerClassName,
  sizes,
  onContainerMount,
}: {
  containerClassName: string;
  sizes: string;
  onContainerMount?: (node: HTMLDivElement | null) => void;
}) {
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      onContainerMount?.(node);
    },
    [onContainerMount],
  );

  return (
    <div ref={setRef} className={cn("presentation-agni-portrait relative", containerClassName)}>
      <Image
        src={expertAgni}
        alt="Agni Garcia, arquiteta em Recife"
        fill
        className="object-contain object-bottom"
        sizes={sizes}
        priority
      />
    </div>
  );
}

export function PresentationBody() {
  const mounted = useMounted();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const showDesktop = mounted && isDesktop;
  const mobileImageRef = useRef<HTMLDivElement | null>(null);
  const desktopImageRef = useRef<HTMLDivElement | null>(null);
  const [fadeTop, setFadeTop] = useState<number | null>(null);

  const measureFade = useCallback(() => {
    const padEl = document.querySelector<HTMLElement>(
      "#section_two .presentation-section-pad",
    );
    if (!padEl) return;

    const useDesktop = window.matchMedia(DESKTOP_QUERY).matches;
    const imageEl = useDesktop ? desktopImageRef.current : mobileImageRef.current;
    if (!imageEl || imageEl.offsetHeight < 1) return;

    const imageRect = imageEl.getBoundingClientRect();
    const padRect = padEl.getBoundingClientRect();
    const fadeBlend = imageRect.height * FADE_HEIGHT_RATIO;
    const top = imageRect.bottom - padRect.top - fadeBlend;

    setFadeTop(Math.max(0, top));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    measureFade();

    const padEl = document.querySelector("#section_two .presentation-section-pad");
    if (!padEl) return;

    const resizeObserver = new ResizeObserver(measureFade);
    resizeObserver.observe(padEl);

    const mobile = mobileImageRef.current;
    const desktop = desktopImageRef.current;
    if (mobile) resizeObserver.observe(mobile);
    if (desktop) resizeObserver.observe(desktop);

    window.addEventListener("resize", measureFade);
    window.addEventListener("scroll", measureFade, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureFade);
      window.removeEventListener("scroll", measureFade);
    };
  }, [isDesktop, measureFade, mounted, showDesktop]);

  const handleMobileMount = useCallback(
    (node: HTMLDivElement | null) => {
      mobileImageRef.current = node;
      if (node) measureFade();
    },
    [measureFade],
  );

  const handleDesktopMount = useCallback(
    (node: HTMLDivElement | null) => {
      desktopImageRef.current = node;
      if (node) measureFade();
    },
    [measureFade],
  );

  return (
    <>
      {fadeTop !== null && (
        <div
          className="presentation-agni-bottom-fade"
          style={{ top: fadeTop }}
          aria-hidden
        />
      )}

      <div className="relative lg:mb-0 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-x-8 lg:gap-y-12">
        <div className="presentation-section-foreground relative lg:col-start-2 lg:row-start-1">
          <p className="eyebrow mb-3 sm:mb-4">Apresentação</p>
          <h2
            id="heading-presentation"
            className="heading-display text-3xl font-medium leading-tight text-ink md:text-5xl"
          >
            Olá, Meu Nome é Agni Garcia,
            <br />
            <span className="text-brand">Sua Arquiteta</span>
          </h2>
        </div>

        <div className="relative mt-3 flex items-end gap-2.5 sm:mt-4 sm:gap-3 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:block lg:self-center">
          <PresentationAgniPortrait
            onContainerMount={handleMobileMount}
            containerClassName="relative z-[8] h-[min(30vh,190px)] w-[38%] max-w-[148px] shrink-0 sm:h-[min(32vh,210px)] sm:max-w-[160px] lg:hidden"
            sizes="148px"
          />

          {!showDesktop && mounted && (
            <div className="presentation-section-foreground relative min-w-0 flex-1 pb-0.5">
              <PresentationCredentials compact />
            </div>
          )}

          <div className="relative mx-auto hidden w-full max-w-xs sm:max-w-sm lg:mx-0 lg:block lg:max-w-none">
            <PresentationAgniPortrait
              onContainerMount={handleDesktopMount}
              containerClassName="relative z-[8] mx-auto h-[min(90vh,760px)] w-full lg:mx-0"
              sizes="(max-width: 1024px) 384px, 480px"
            />
          </div>
        </div>

        <div className="presentation-section-foreground relative mt-3 max-w-xl sm:mt-4 lg:col-start-2 lg:row-start-2 lg:mt-6">
          {showDesktop && <PresentationCredentials />}
          <PresentationBio />
        </div>
      </div>
    </>
  );
}
