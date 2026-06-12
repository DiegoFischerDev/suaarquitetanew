"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { PLANS } from "@/lib/content";
import { formatBRL } from "@/lib/utils";
import { Check } from "lucide-react";
import { useRef } from "react";

const FEATURED_PLAN_ID = "interiores";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
  hidden: {
    y: 20,
    opacity: 0,
  },
};

export default function PricingSection2() {
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="section_five"
      className="relative w-full section-pad bg-cream"
      ref={pricingRef}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-ink)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_8%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_40%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-7xl">
        <article className="mb-12 text-center">
          <p className="eyebrow mb-3">Planos e valores</p>
          <h2 className="heading-display text-3xl font-medium text-ink md:text-5xl">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              reverse
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0,
              }}
            >
              Adquira seu projeto com 50% de desconto!
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="mt-4 text-sm text-muted"
          >
            Ofertas por tempo limitado — consulte valores pelo WhatsApp
          </TimelineContent>
        </article>

        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, index) => {
            const featured = plan.id === FEATURED_PLAN_ID;

            return (
              <TimelineContent
                key={plan.id}
                as="div"
                animationNum={index + 1}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="h-full"
              >
                <Card
                  className={`flex h-full flex-col p-0 ${
                    featured
                      ? "border-brand bg-brand text-cream shadow-[0_24px_60px_-28px_rgba(26,24,20,0.55)]"
                      : "border-ink/10 bg-white/80"
                  }`}
                >
                  <CardHeader
                    className={`rounded-t-2xl border-b py-5 ${
                      featured
                        ? "border-cream/15 bg-brand-light"
                        : "border-ink/8 bg-cream-dark/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`heading-display text-xl font-medium ${
                          featured ? "text-cream" : "text-ink"
                        }`}
                      >
                        {plan.title}
                      </h3>
                      {featured && (
                        <span className="shrink-0 rounded-full border border-cream/25 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-cream/80">
                          Popular
                        </span>
                      )}
                    </div>
                    {plan.subtitle && (
                      <p
                        className={`mt-2 text-xs uppercase tracking-[0.18em] ${
                          featured ? "text-cream/75" : "text-muted"
                        }`}
                      >
                        {plan.subtitle}
                      </p>
                    )}
                    <div className="mt-4">
                      {"priceFrom" in plan ? (
                        <>
                          <p
                            className={`text-xs uppercase tracking-[0.18em] ${
                              featured ? "text-cream/70" : "text-muted"
                            }`}
                          >
                            A partir de
                          </p>
                          <p
                            className={`heading-display mt-1 text-2xl font-medium md:text-3xl ${
                              featured ? "text-cream" : "text-ink"
                            }`}
                          >
                            {formatBRL(plan.priceFrom)}
                          </p>
                        </>
                      ) : (
                        <p
                          className={`heading-display text-xl font-medium md:text-2xl ${
                            featured ? "text-cream" : "text-ink"
                          }`}
                        >
                          Sob consulta
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col px-6 pb-6 pt-6">
                    <ul className="mb-6 space-y-2.5 pt-5">
                      {plan.items.map((item, itemIndex) => (
                        <li
                          key={`${plan.id}-${itemIndex}`}
                          className={`flex items-start gap-2 text-xs leading-relaxed sm:text-sm ${
                            featured ? "text-cream" : "text-ink/85"
                          }`}
                        >
                          <Check
                            size={14}
                            className={`mt-0.5 shrink-0 ${
                              featured ? "text-cream" : "text-brand"
                            }`}
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {featured ? (
                      <a
                        href={plan.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {plan.cta}
                      </a>
                    ) : (
                      <a
                        href={plan.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-auto w-full"
                      >
                        {plan.cta}
                      </a>
                    )}
                  </CardContent>
                </Card>
              </TimelineContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { PricingSection2 };
