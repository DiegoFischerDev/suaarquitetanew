"use client";

import {
  CircularTestimonials,
  TestimonialNavButtons,
  type CircularTestimonialsHandle,
} from "@/components/ui/circular-testimonials";
import { TESTIMONIALS } from "@/lib/content";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const testimonials = TESTIMONIALS.map((item) => ({
  quote: item.text,
  name: item.name,
  designation: item.service,
  src: item.image,
}));

const testimonialColors = {
  name: "#1a1814",
  designation: "#6b6560",
  testimony: "#3d3834",
  arrowBackground: "#3d3834",
  arrowForeground: "#f9f8f3",
  arrowHoverBackground: "#5c554f",
};

export function TestimonialsSection() {
  const carouselRef = useRef<CircularTestimonialsHandle>(null);

  return (
    <section id="section_seven" className="section-pad bg-cream-dark/40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-3 text-center">Depoimentos</p>
          <h2 className="heading-display text-center text-3xl font-medium text-ink md:text-5xl">
            O Que Dizem os Clientes
          </h2>
          <TestimonialNavButtons
            className="mt-6 flex justify-center gap-6 md:hidden"
            colors={testimonialColors}
            onPrev={() => carouselRef.current?.goPrev()}
            onNext={() => carouselRef.current?.goNext()}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex justify-center md:mt-14">
            <CircularTestimonials
              ref={carouselRef}
              testimonials={testimonials}
              autoplay
              hideControlsOnMobile
              colors={testimonialColors}
              fontSizes={{
                name: "1.5rem",
                designation: "0.8rem",
                quote: "1.05rem",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
