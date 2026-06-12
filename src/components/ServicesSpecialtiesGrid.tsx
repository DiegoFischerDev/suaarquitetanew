"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import { SERVICES } from "@/lib/content";

export function ServicesSpecialtiesGrid() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {SERVICES.map((service) => (
        <GlowCard
          key={service.title}
          customSize
          glowColor="orange"
          className="h-full p-7"
        >
          <h3 className="text-sm font-semibold tracking-[0.16em] text-brand">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {service.description}
          </p>
        </GlowCard>
      ))}
    </div>
  );
}
