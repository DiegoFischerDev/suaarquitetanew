const IMAGE_BEFORE_MOBILE = "/assets/images/imagem-inicial-mobile.webp";
const IMAGE_AFTER_MOBILE = "/assets/images/imagem-final-mobile.webp";
const IMAGE_BEFORE_DESKTOP = "/assets/images/imagem-inicial.webp";
const IMAGE_AFTER_DESKTOP = "/assets/images/imagem-final.webp";

const BEFORE_ALT =
  "Salão de beleza antes do projeto de design de interiores — Sua Arquiteta Recife";
const AFTER_ALT =
  "Salão de beleza após projeto de design de interiores — Sua Arquiteta Agni Garcia";

const imageClass = "absolute inset-0 h-full w-full object-cover";

export function HeroStaticBefore() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGE_BEFORE_MOBILE}
        alt={BEFORE_ALT}
        className={`${imageClass} lg:hidden`}
        loading="eager"
        decoding="async"
        fetchPriority="low"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGE_BEFORE_DESKTOP}
        alt={BEFORE_ALT}
        className={`${imageClass} hidden lg:block`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </>
  );
}

export function HeroStaticAfter() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="hero-after-mobile"
        src={IMAGE_AFTER_MOBILE}
        alt={AFTER_ALT}
        className={`${imageClass} lg:hidden`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGE_AFTER_DESKTOP}
        alt={AFTER_ALT}
        className={`${imageClass} hidden lg:block`}
        loading="eager"
        decoding="async"
      />
    </>
  );
}
