"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { carouselImages } from "@/lib/content";

export default function Projects() {
  const total = carouselImages.length;
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setIsFullscreen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  useEffect(() => {
    if (isFullscreen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isFullscreen]);

  return (
    <section id="proyectos" className="bg-bone-50 py-8 lg:py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="bg-pastel-50 rounded-3xl px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
          <p className="text-sm font-semibold text-sky-500 uppercase tracking-wide mb-4">
            Gallery
          </p>
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900 max-w-xl">
            A look at our work.
          </h2>
          <p className="mt-5 text-navy-700 max-w-lg leading-relaxed">
            Steel framing, ceiling, and interior builds from job sites
            across the Edmonton area.
          </p>

          <div
            className="relative mt-16 rounded-3xl overflow-hidden bg-white"
            role="region"
            aria-label="Project photo gallery"
          >
            <div className="relative aspect-[16/9]">
              {carouselImages.map((src, i) => (
                <div
                  key={src}
                  className="absolute inset-0 transition-opacity duration-500 cursor-zoom-in"
                  style={{ opacity: i === index ? 1 : 0 }}
                  aria-hidden={i !== index}
                  onDoubleClick={() => setIsFullscreen(true)}
                >
                  <Image
                    src={src}
                    alt={`Project photo ${i + 1} of ${total}`}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    priority={i === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 hover:bg-white text-navy-900 shadow-md transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 hover:bg-white text-navy-900 shadow-md transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {carouselImages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-gold-500"
                      : "w-2 bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-navy-900/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen photo viewer"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen photo"
            className="absolute top-5 right-5 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 5L19 19M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="relative w-[92vw] h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={carouselImages[index]}
              alt={`Project photo ${index + 1} of ${total}, fullscreen`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono">
            {index + 1} / {total}
          </p>
        </div>
      )}
    </section>
  );
}