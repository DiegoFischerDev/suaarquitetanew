import { HERO } from "@/lib/content";
import { Reveal } from "./Reveal";

export function SeoHeroText() {
  return (
    <section id="section_seo_hero" className="section-pad border-b border-ink/8 bg-cream-dark/40">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="eyebrow mb-5">Arquitetura democratizada</p>
          <h1 className="heading-display text-2xl font-medium leading-snug text-ink md:text-3xl lg:text-4xl">
            {HERO.h1}
          </h1>
          <h2 className="mt-6 text-xl font-medium text-brand md:text-2xl">{HERO.h2}</h2>
          <h3 className="mt-3 text-base text-muted md:text-lg">{HERO.h3}</h3>
        </Reveal>
      </div>
    </section>
  );
}
