"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/services.mp4";

export function ServicesSpecialtiesVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!shouldLoad || reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.load();
    void video.play().catch(() => {});
  }, [shouldLoad, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-ink/8 bg-ink/5 shadow-[0_20px_60px_-40px_rgba(26,24,20,0.35)] md:mt-12"
      aria-hidden="true"
    >
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          preload={shouldLoad ? "auto" : "none"}
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
        >
          {shouldLoad ? <source src={VIDEO_SRC} type="video/mp4" /> : null}
        </video>
      </div>
    </div>
  );
}
