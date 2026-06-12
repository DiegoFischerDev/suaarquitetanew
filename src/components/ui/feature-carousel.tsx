"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

interface FeatureCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle: string;
  images: { src: string; alt: string }[];
  autoplay?: boolean;
}

export const FeatureCarousel = React.forwardRef<HTMLDivElement, FeatureCarouselProps>(
  ({ title, subtitle, images, autoplay = true, className, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const [currentIndex, setCurrentIndex] = React.useState(
      Math.floor(images.length / 2),
    );

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = React.useCallback(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      );
    }, [images.length]);

    React.useEffect(() => {
      if (!autoplay || reduceMotion || images.length <= 1) return;

      const timer = setInterval(handleNext, 4000);
      return () => clearInterval(timer);
    }, [autoplay, handleNext, images.length, reduceMotion]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-x-hidden bg-cream p-4 pb-14",
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-30" aria-hidden>
          <div className="absolute top-[-10%] bottom-0 left-[-20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(217,210,197,0.8),rgba(255,255,255,0))]" />
          <div className="absolute top-[-10%] right-[-20%] bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(221,213,240,0.7),rgba(255,255,255,0))]" />
        </div>

        <div className="z-10 flex w-full flex-col items-center space-y-8 text-center">
          <div className="space-y-4 px-2">
            <h2 className="heading-display max-w-4xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="relative flex h-[340px] w-full items-center justify-center sm:h-[380px]">
            <div className="relative flex h-full w-full items-center justify-center [perspective:1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={`${image.src}-${index}`}
                    className="absolute flex h-80 w-44 items-center justify-center transition-all duration-500 ease-in-out sm:h-[360px] sm:w-52"
                    style={{
                      transform: `
                        translateX(${pos * 45}%)
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${pos * -10}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                      visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full rounded-3xl border-2 border-ink/10 object-cover shadow-2xl"
                      draggable={false}
                      loading={isCenter ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 z-20 h-10 w-10 -translate-y-1/2 rounded-full sm:left-4"
              onClick={handlePrev}
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 z-20 h-10 w-10 -translate-y-1/2 rounded-full sm:right-4"
              onClick={handleNext}
              aria-label="Próximo projeto"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

FeatureCarousel.displayName = "FeatureCarousel";

export const HeroSection = FeatureCarousel;
export default FeatureCarousel;
