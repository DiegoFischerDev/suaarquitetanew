import expertAgni from "@images/expert-Agni.png";
import Image from "next/image";
import { PresentationBio } from "./PresentationBio";
import { ServicesSpecialtiesGrid } from "./ServicesSpecialtiesGrid";
import { ServicesSpecialtiesVideo } from "./ServicesSpecialtiesVideo";

export function PresentationSection() {
  return (
    <>
      <section
        id="section_two"
        className="relative overflow-hidden section-pad bg-cream"
        aria-labelledby="heading-presentation"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-ink)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_8%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_40%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden items-center justify-center lg:flex"
          aria-hidden
        >
          <div className="relative h-[min(52vh,520px)] w-[min(72vw,900px)]">
            <Image
              src="/assets/images/logo_agni_white.png"
              alt=""
              fill
              className="object-contain opacity-[0.09] brightness-0"
              sizes="72vw"
            />
          </div>
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-x-8 gap-y-3 sm:gap-y-4 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-y-12">
          <div
            className="pointer-events-none absolute -right-2 top-0 z-[1] h-32 w-32 max-[360px]:h-24 max-[360px]:w-24 sm:-right-4 sm:h-44 sm:w-44 lg:hidden"
            aria-hidden
          >
            <Image
              src="/assets/images/logo_agni_white.png"
              alt=""
              fill
              className="object-contain object-right-top opacity-[0.08] brightness-0 max-[360px]:opacity-[0.06] sm:opacity-[0.1]"
              sizes="176px"
            />
          </div>

          <div className="relative z-10 lg:col-start-2 lg:row-start-1">
            <p className="eyebrow mb-3 sm:mb-4">Apresentação</p>
            <h2
              id="heading-presentation"
              className="heading-display text-3xl font-medium leading-tight text-ink md:text-5xl"
            >
              Olá, Meu Nome é Agni Garcia,
              <br />
              <span className="text-brand">Sua Arquiteta</span>
            </h2>
          </div>

          <div className="-mt-1 flex w-full justify-center sm:-mt-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:block lg:self-center">
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
              <div className="relative z-10 mx-auto h-[min(48vh,360px)] w-full lg:mx-0 lg:h-[min(90vh,760px)]">
                <Image
                  src={expertAgni}
                  alt="Agni Garcia, arquiteta em Recife"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 480px"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-xl lg:col-start-2 lg:row-start-2 lg:mt-6">
            <PresentationBio />
          </div>
        </div>
      </section>

      <section
        id="section_services"
        className="section-pad bg-cream-dark/40"
        aria-labelledby="heading-services"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="eyebrow mb-3">Especialidades</p>
            <h2
              id="heading-services"
              className="heading-display text-3xl font-medium text-ink md:text-5xl"
            >
              Serviços Que Oferecemos
            </h2>
          </div>

          <ServicesSpecialtiesVideo />

          <ServicesSpecialtiesGrid />
        </div>
      </section>
    </>
  );
}
