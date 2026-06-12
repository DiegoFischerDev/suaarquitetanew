"use client";

import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { Testimonial } from "@/components/ui/testimonial-card";
import type { TestimonialEntry } from "@/components/TestimonialsCarousel";

type TestimonialsDisplayProps = {
  testimonials: readonly TestimonialEntry[];
};

export function TestimonialsDisplay({ testimonials }: TestimonialsDisplayProps) {
  return (
    <>
      <TestimonialsCarousel testimonials={testimonials} />

      <div className="hidden gap-6 md:grid md:grid-cols-2">
        {testimonials.map((item) => (
          <Testimonial
            key={item.name}
            name={item.name}
            role={item.service}
            testimonial={item.text}
            rating={5}
            image={item.image}
          />
        ))}
      </div>
    </>
  );
}
