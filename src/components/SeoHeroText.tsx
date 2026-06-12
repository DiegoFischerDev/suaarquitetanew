import { HERO } from "@/lib/content";

export function SeoHeroText() {
  return (
    <section
      id="section_seo_hero"
      className="section-pad border-b border-ink/8 bg-cream-dark/40"
      aria-labelledby="heading-seo-hero"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow mb-5">Arquitetura democratizada</p>
        <h1
          id="heading-seo-hero"
          className="heading-display text-2xl font-medium leading-snug text-ink md:text-3xl lg:text-4xl"
        >
          {HERO.h1}
        </h1>
        <p className="mt-6 text-xl font-medium text-brand md:text-2xl">{HERO.h2}</p>
        <p className="mt-3 text-base text-muted md:text-lg">{HERO.h3}</p>
      </div>
    </section>
  );
}
