"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DesktopGlowSurface } from "@/components/ui/desktop-glow-surface";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import * as React from "react";

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  rating?: number;
  image?: string;
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  (
    {
      name,
      role,
      company,
      testimonial,
      rating = 5,
      image,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <DesktopGlowSurface
        glowColor="sand"
        glowSize={200}
        className="flex h-full flex-col p-0 border-ink/10 bg-white/80"
        asPlain="flex h-full flex-col rounded-2xl border border-ink/10 bg-white/80 p-0 shadow-sm"
      >
        <div
          ref={ref}
          className={cn("relative flex h-full flex-col p-6 md:p-8", className)}
          {...props}
        >
        <div
          className="pointer-events-none absolute right-6 top-6 font-serif text-6xl text-ink/10"
          aria-hidden
        >
          &ldquo;
        </div>

        <div className="flex h-full flex-col justify-between gap-4">
          {rating > 0 && (
            <div className="flex gap-1" aria-label={`${rating} de 5 estrelas`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={cn(
                    index < rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-cream-dark text-cream-dark",
                  )}
                  aria-hidden
                />
              ))}
            </div>
          )}

          <blockquote className="relative min-w-0 text-pretty text-base leading-relaxed text-muted md:text-lg">
            {testimonial}
          </blockquote>

          <div className="flex items-center gap-4">
            {image && (
              <Avatar className="h-12 w-12">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col">
              <h3 className="font-medium text-ink">{name}</h3>
              <p className="text-sm text-muted">
                {role}
                {company && ` @ ${company}`}
              </p>
            </div>
          </div>
        </div>
        </div>
      </DesktopGlowSurface>
    );
  },
);
Testimonial.displayName = "Testimonial";

export { Testimonial };
