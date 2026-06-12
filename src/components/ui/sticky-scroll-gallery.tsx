"use client";

import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { useMediaQuery, useMounted } from "@/hooks/use-media-query";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function shuffleGallery<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

interface StickyScrollGalleryProps {
  images: GalleryImage[];
  introTitle: string;
  introSubtitle: string;
}

function splitIntoColumns(images: GalleryImage[]) {
  const centerCount = 2;
  const sideTotal = images.length - centerCount;
  const leftCount = Math.ceil(sideTotal / 2);

  return {
    left: images.slice(0, leftCount),
    center: images.slice(leftCount, leftCount + centerCount),
    right: images.slice(leftCount + centerCount),
    centerCount,
  };
}

function GalleryFigure({
  image,
  className = "",
  sizes = "(max-width: 1024px) 80vw, 25vw",
}: {
  image: GalleryImage;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="rounded-2xl object-cover"
        sizes={sizes}
        loading="lazy"
        draggable={false}
      />
    </figure>
  );
}

function GalleryIntro({
  introTitle,
  introSubtitle,
  sticky = false,
}: {
  introTitle: string;
  introSubtitle: string;
  sticky?: boolean;
}) {
  const wrapperClass = sticky
    ? "relative h-screen"
    : "px-6 py-14 text-center md:py-16";
  const innerClass = sticky
    ? "sticky top-0 z-10 grid h-screen w-full place-content-center bg-cream-dark/40"
    : "mx-auto max-w-2xl";

  return (
    <div className={wrapperClass}>
      <div className={innerClass}>
        {sticky && (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-ink)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_6%,transparent)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        )}
        <div className={`relative ${sticky ? "px-6 text-center" : ""}`}>
          <h2
            id="heading-gallery"
            className="heading-display text-3xl font-medium leading-tight text-ink md:text-5xl"
          >
            {introTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {introSubtitle}
          </p>
          {sticky && (
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-muted">
              Role para explorar ↓
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopGallery({ images }: { images: GalleryImage[] }) {
  const columns = useMemo(() => splitIntoColumns(images), [images]);

  return (
    <div className="px-4 pb-20 lg:px-8">
      <div className="mx-auto grid max-w-[90rem] grid-cols-12 gap-3">
        <div className="col-span-4 grid gap-3">
          {columns.left.map((image) => (
            <GalleryFigure
              key={image.src}
              image={image}
              className="h-[28rem]"
              sizes="(max-width: 1280px) 33vw, 22rem"
            />
          ))}
        </div>

        <div
          className="sticky top-0 col-span-4 grid h-screen gap-3 self-start"
          style={{
            gridTemplateRows: `repeat(${columns.center.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.center.map((image) => (
            <GalleryFigure
              key={image.src}
              image={image}
              className="h-full min-h-0"
              sizes="(max-width: 1280px) 33vw, 22rem"
            />
          ))}
        </div>

        <div className="col-span-4 grid gap-3">
          {columns.right.map((image) => (
            <GalleryFigure
              key={image.src}
              image={image}
              className="h-[28rem]"
              sizes="(max-width: 1280px) 33vw, 22rem"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StickyScrollGallery({
  images,
  introTitle,
  introSubtitle,
}: StickyScrollGalleryProps) {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const showDesktop = mounted && isDesktop;
  const [galleryImages, setGalleryImages] = useState(images);

  useEffect(() => {
    setGalleryImages(shuffleGallery(images));
  }, [images]);

  return (
    <div className="w-full">
      {showDesktop ? (
        <>
          <GalleryIntro
            introTitle={introTitle}
            introSubtitle={introSubtitle}
            sticky
          />
          <DesktopGallery images={galleryImages} />
        </>
      ) : (
        <>
          <GalleryIntro introTitle={introTitle} introSubtitle={introSubtitle} />
          <ImageAutoSlider images={galleryImages} className="pb-12" />
        </>
      )}
    </div>
  );
}

export default StickyScrollGallery;
