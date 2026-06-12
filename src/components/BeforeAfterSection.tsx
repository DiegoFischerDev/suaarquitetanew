import { BEFORE_AFTER_PROJECTS } from "@/lib/content";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal } from "./Reveal";

export function BeforeAfterSection() {
  return (
    <section id="section_before_after" className="section-pad bg-cream-dark/40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 text-center md:mb-14">
            <h2 className="heading-display text-3xl font-medium text-ink md:text-5xl">
              Projetos que contam histórias
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              Uma seleção de trabalhos residenciais e comerciais desenvolvidos em
              Recife e em atendimento remoto para todo o Brasil.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BEFORE_AFTER_PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col">
                <BeforeAfterSlider
                  beforeSrc={project.before}
                  afterSrc={project.after}
                  beforeAlt={project.beforeAlt}
                  afterAlt={project.afterAlt}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
