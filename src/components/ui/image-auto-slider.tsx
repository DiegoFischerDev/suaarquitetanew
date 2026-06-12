"use client";

import { cn } from "@/lib/utils";

export interface ImageAutoSliderImage {
  src: string;
  alt: string;
}

interface ImageAutoSliderProps {
  images: ImageAutoSliderImage[];
  className?: string;
}

export function ImageAutoSlider({ images, className }: ImageAutoSliderProps) {
  const duplicatedImages = [...images, ...images];

  return (
    <div
      className={cn(
        "image-auto-slider relative w-full overflow-hidden bg-cream py-8",
        className,
      )}
    >
      <div className="image-auto-slider__mask w-full px-2">
        <div className="image-auto-slider__track flex w-max gap-4">
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="image-auto-slider__item h-48 w-48 shrink-0 overflow-hidden rounded-2xl shadow-[0_16px_40px_-20px_rgba(26,24,20,0.45)] sm:h-56 sm:w-56"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageAutoSlider;
