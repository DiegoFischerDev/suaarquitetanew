"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useMemo, useRef, type RefObject } from "react";

export interface ImageAutoSliderImage {
  src: string;
  alt: string;
}

type CarouselDirection = "left" | "right";

interface GalleryCarouselRowProps {
  images: ImageAutoSliderImage[];
  direction: CarouselDirection;
  duration?: number;
  itemClassName?: string;
}

function splitRows(images: ImageAutoSliderImage[]) {
  const midpoint = Math.ceil(images.length / 2);
  return {
    top: images.slice(0, midpoint),
    bottom: images.slice(midpoint),
  };
}

function useGalleryScrollOptimization(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let isVisible = true;
    let isScrolling = false;
    let scrollTimer = 0;

    const tracks = () =>
      root.querySelectorAll<HTMLElement>(".image-auto-slider__track");

    const updatePlayState = () => {
      const shouldRun = isVisible && !isScrolling;
      tracks().forEach((track) => {
        track.style.animationPlayState = shouldRun ? "running" : "paused";
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio > 0.08;
        updatePlayState();
      },
      { threshold: [0, 0.08, 0.2, 0.5] },
    );

    observer.observe(root);

    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        updatePlayState();
      }

      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        isScrolling = false;
        updatePlayState();
      }, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updatePlayState();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, [rootRef]);
}

function GalleryCarouselRow({
  images,
  direction,
  duration = 32,
  itemClassName,
}: GalleryCarouselRowProps) {
  if (images.length === 0) return null;

  const duplicatedImages = [...images, ...images];

  return (
    <div className="image-auto-slider__mask w-full overflow-hidden px-2 py-2">
      <div
        className={cn(
          "image-auto-slider__track flex w-max gap-4",
          direction === "right" && "image-auto-slider__track--reverse",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "image-auto-slider__item relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-60 lg:w-60",
              itemClassName,
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface DualImageCarouselProps {
  images: ImageAutoSliderImage[];
  className?: string;
}

export function DualImageCarousel({ images, className }: DualImageCarouselProps) {
  const { top, bottom } = useMemo(() => splitRows(images), [images]);
  const rootRef = useRef<HTMLDivElement>(null);

  useGalleryScrollOptimization(rootRef);

  return (
    <div
      ref={rootRef}
      className={cn(
        "image-auto-slider relative w-full space-y-3 px-4 py-8 sm:px-6 md:space-y-4",
        className,
      )}
    >
      <GalleryCarouselRow images={top} direction="left" duration={34} />
      <GalleryCarouselRow images={bottom} direction="right" duration={38} />
      <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        Projetos em movimento
      </p>
    </div>
  );
}

/** @deprecated Use DualImageCarousel */
export function ImageAutoSlider({
  images,
  className,
}: {
  images: ImageAutoSliderImage[];
  className?: string;
}) {
  return <DualImageCarousel images={images} className={className} />;
}

export default DualImageCarousel;
