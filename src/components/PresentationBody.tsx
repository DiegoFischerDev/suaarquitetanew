"use client";

import expertAgni from "@images/expert-Agni.png";
import { useMediaQuery, useMounted } from "@/hooks/use-media-query";
import Image from "next/image";
import { PresentationBio } from "./PresentationBio";
import { PresentationCredentials } from "./PresentationCredentials";

export function PresentationBody() {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const showDesktop = mounted && isDesktop;

  return (
    <div className="relative z-10 lg:mb-0 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-x-8 lg:gap-y-12">
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

      <div className="mt-3 flex items-end gap-2.5 sm:mt-4 sm:gap-3 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:block lg:self-center">
        <div className="relative h-[min(30vh,190px)] w-[38%] max-w-[148px] shrink-0 sm:h-[min(32vh,210px)] sm:max-w-[160px] lg:hidden">
          <Image
            src={expertAgni}
            alt="Agni Garcia, arquiteta em Recife"
            fill
            className="object-contain object-bottom"
            sizes="148px"
            priority
          />
        </div>

        {!showDesktop && mounted && (
          <div className="min-w-0 flex-1 pb-0.5">
            <PresentationCredentials compact />
          </div>
        )}

        <div className="relative mx-auto hidden w-full max-w-xs sm:max-w-sm lg:mx-0 lg:block lg:max-w-none">
          <div className="relative z-10 mx-auto h-[min(90vh,760px)] w-full lg:mx-0">
            <Image
              src={expertAgni}
              alt="Agni Garcia, arquiteta em Recife"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 384px, 480px"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-3 max-w-xl sm:mt-4 lg:col-start-2 lg:row-start-2 lg:mt-6">
        {showDesktop && <PresentationCredentials />}
        <PresentationBio />
      </div>
    </div>
  );
}
