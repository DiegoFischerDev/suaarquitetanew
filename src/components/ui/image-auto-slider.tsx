"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

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
        "image-auto-slider relative w-full overflow-hidden py-8",
        className,
      )}
    >
      <div className="image-auto-slider__mask w-full px-2">
        <div className="image-auto-slider__track flex w-max gap-4">
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="image-auto-slider__item relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl shadow-[0_16px_40px_-20px_rgba(26,24,20,0.45)] sm:h-56 sm:w-56"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 192px, 224px"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        Projetos em movimento
      </p>
    </div>
  );
}

export default ImageAutoSlider;
