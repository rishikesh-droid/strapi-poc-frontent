"use client";

import { useCallback, useEffect, useState } from "react";
import Container from "./Container";

interface Slide {
  title: string;
  tag: string;
  gradient: string;
}

const SLIDES: Slide[] = [
  { title: "Fintech Platform", tag: "Product · Engineering", gradient: "from-indigo-500 via-violet-500 to-purple-700" },
  { title: "Brand Identity", tag: "Design · Strategy", gradient: "from-rose-500 via-orange-500 to-amber-500" },
  { title: "E-commerce Suite", tag: "Web · Commerce", gradient: "from-emerald-500 via-teal-500 to-cyan-600" },
  { title: "Mobile Experience", tag: "iOS · Android", gradient: "from-sky-500 via-blue-600 to-indigo-700" },
  { title: "SaaS Dashboard", tag: "UI/UX · Data", gradient: "from-fuchsia-500 via-violet-600 to-indigo-700" },
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="border-y border-line bg-surface py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Projects we&apos;re proud of
            </h2>
          </div>
          <div className="flex gap-3">
            <button type="button" aria-label="Previous slide" onClick={prev} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-surface-2">←</button>
            <button type="button" aria-label="Next slide" onClick={next} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-surface-2">→</button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-line">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.title} className="w-full flex-shrink-0">
                <div className={`relative flex aspect-[16/9] flex-col justify-end bg-gradient-to-br ${slide.gradient} p-8 sm:aspect-[21/9] sm:p-12`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <p className="relative text-sm font-medium uppercase tracking-widest text-white/80">{slide.tag}</p>
                  <h3 className="relative mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{slide.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-1.5 bg-line-strong hover:bg-muted"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
