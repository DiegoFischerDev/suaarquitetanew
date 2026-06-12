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
          glowColor="sand"
          className="h-full p-4 md:p-7"
        >
          <h3 className="text-xs font-semibold tracking-[0.16em] text-brand md:text-sm">
            {service.title}
          </h3>
          <p className="mt-4 hidden text-sm leading-relaxed text-muted md:block">
            {service.description}
          </p>
        </GlowCard>
      ))}
    </div>
  );
}
