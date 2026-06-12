"use client";

import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

export interface ImageAutoSliderImage {
  src: string;
  alt: string;
}

type CarouselDirection = "left" | "right";

interface GalleryCarouselRowProps {
  images: readonly ImageAutoSliderImage[];
  direction: CarouselDirection;
  duration?: number;
  itemClassName?: string;
}

function splitRows(images: readonly ImageAutoSliderImage[]) {
  const midpoint = Math.ceil(images.length / 2);
  return {
    top: images.slice(0, midpoint),
    bottom: images.slice(midpoint),
  };
}

const GalleryCarouselRow = memo(function GalleryCarouselRow({
  images,
  direction,
  duration = 32,
  itemClassName,
}: GalleryCarouselRowProps) {
  const duplicatedImages = useMemo(
    () => [...images, ...images],
    [images],
  );

  if (images.length === 0) return null;

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

interface DualImageCarouselProps {
  images: readonly ImageAutoSliderImage[];
  className?: string;
}

export const DualImageCarousel = memo(function DualImageCarousel({
  images,
  className,
}: DualImageCarouselProps) {
  const { top, bottom } = useMemo(() => splitRows(images), [images]);

  return (
    <div
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
});

/** @deprecated Use DualImageCarousel */
export function ImageAutoSlider({
  images,
  className,
}: {
  images: readonly ImageAutoSliderImage[];
  className?: string;
}) {
  return <DualImageCarousel images={images} className={className} />;
}

export default DualImageCarousel;
