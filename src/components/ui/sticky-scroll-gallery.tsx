"use client";

import { DualImageCarousel } from "@/components/ui/image-auto-slider";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface StickyScrollGalleryProps {
  images: readonly GalleryImage[];
  introTitle: string;
  introSubtitle: string;
}

function GalleryIntro({
  introTitle,
  introSubtitle,
}: {
  introTitle: string;
  introSubtitle: string;
}) {
  return (
    <div className="px-6 py-14 text-center md:py-16">
      <div className="mx-auto max-w-2xl">
        <h2
          id="heading-gallery"
          className="heading-display text-3xl font-medium leading-tight text-ink md:text-5xl"
        >
          {introTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {introSubtitle}
        </p>
      </div>
    </div>
  );
}

export function StickyScrollGallery({
  images,
  introTitle,
  introSubtitle,
}: StickyScrollGalleryProps) {
  return (
    <div className="w-full">
      <GalleryIntro introTitle={introTitle} introSubtitle={introSubtitle} />
      <DualImageCarousel images={images} className="pb-12" />
    </div>
  );
}

export default StickyScrollGallery;
