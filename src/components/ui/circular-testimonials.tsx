"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  hideControlsOnMobile?: boolean;
}

export type CircularTestimonialsHandle = {
  goNext: () => void;
  goPrev: () => void;
};

type TestimonialNavButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  colors: Colors;
  className?: string;
};

function TestimonialNavButtons({
  onPrev,
  onNext,
  colors,
  className = "",
}: TestimonialNavButtonsProps) {
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const colorArrowBg = colors.arrowBackground ?? "#3d3834";
  const colorArrowFg = colors.arrowForeground ?? "#f9f8f3";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#5c554f";

  return (
    <div className={className}>
      <button
        type="button"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        onClick={onPrev}
        style={{
          backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
          color: colorArrowFg,
        }}
        onMouseEnter={() => setHoverPrev(true)}
        onMouseLeave={() => setHoverPrev(false)}
        aria-label="Depoimento anterior"
      >
        <ArrowLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        onClick={onNext}
        style={{
          backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
        }}
        onMouseEnter={() => setHoverNext(true)}
        onMouseLeave={() => setHoverNext(false)}
        aria-label="Próximo depoimento"
      >
        <ArrowRight size={22} color={colorArrowFg} aria-hidden="true" />
      </button>
    </div>
  );
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth) {
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  }

  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export const CircularTestimonials = forwardRef<
  CircularTestimonialsHandle,
  CircularTestimonialsProps
>(function CircularTestimonials(
  {
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
    hideControlsOnMobile = false,
  },
  ref,
) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const colorName = colors.name ?? "#1a1814";
  const colorDesignation = colors.designation ?? "#6b6560";
  const colorTestimony = colors.testimony ?? "#3d3834";
  const colorArrowBg = colors.arrowBackground ?? "#3d3834";
  const colorArrowFg = colors.arrowForeground ?? "#f9f8f3";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#5c554f";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const testimonialsLength = useMemo(
    () => testimonials.length,
    [testimonials],
  );
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonialsLength) % testimonialsLength,
    );
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  }, [testimonialsLength]);

  useImperativeHandle(
    ref,
    () => ({
      goNext: handleNext,
      goPrev: handlePrev,
    }),
    [handleNext, handlePrev],
  );

  useEffect(() => {
    if (!autoplay || reduceMotion || !isDesktop) return;

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [autoplay, isDesktop, reduceMotion, testimonialsLength]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  function getImageStyle(index: number): CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div className="w-full max-w-4xl px-4 py-6 sm:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div
          ref={imageContainerRef}
          className="relative h-72 w-full [perspective:1000px] sm:h-80 md:h-96"
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.name}
              src={testimonial.src}
              alt={testimonial.name}
              className="absolute h-full w-full rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              data-index={index}
              style={getImageStyle(index)}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>

        <div className="flex flex-col justify-between">
          <div className="transition-opacity duration-300" aria-live="polite">
            <h3
              className="mb-1 font-semibold"
              style={{ color: colorName, fontSize: fontSizeName }}
            >
              {activeTestimonial.name}
            </h3>
            <p
              className="mb-8 uppercase tracking-[0.18em]"
              style={{
                color: colorDesignation,
                fontSize: fontSizeDesignation,
              }}
            >
              {activeTestimonial.designation}
            </p>
            <p
              className="leading-relaxed"
              style={{ color: colorTestimony, fontSize: fontSizeQuote }}
            >
              &ldquo;{activeTestimonial.quote}&rdquo;
            </p>
          </div>

          <TestimonialNavButtons
            onPrev={handlePrev}
            onNext={handleNext}
            colors={{
              arrowBackground: colorArrowBg,
              arrowForeground: colorArrowFg,
              arrowHoverBackground: colorArrowHoverBg,
            }}
            className={`flex gap-6 pt-10 md:pt-0 ${
              hideControlsOnMobile ? "hidden md:flex" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
});

export { TestimonialNavButtons };
export default CircularTestimonials;
