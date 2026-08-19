import Link from "next/link";
import Container from "./Container";

const MARQUEE = [
  "Web Development",
  "UI/UX Design",
  "Brand Identity",
  "Headless CMS",
  "Product Strategy",
  "Motion Design",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[10%] h-[400px] w-[400px] rounded-full bg-accent-3/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 75%)",
          }}
        />
      </div>

      <Container className="pt-16 pb-10 sm:pt-24">
        {/* eyebrow */}
        <div className="flex justify-center">
          <span className="anim-fade-up d1 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-ink-soft backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Technology &amp; Design Studio — since 2016
          </span>
        </div>

        {/* Depth stage: WEBSTER wordmark up top, sphere lowered to just overlap it */}
        <div className="relative mt-8 flex flex-col items-center">
          {/* wordmark (behind, fully visible) */}
          <span
            aria-hidden
            className="anim-fade-in d1 pointer-events-none relative z-0 select-none leading-none"
          >
            <span
              className="font-display font-bold leading-none text-transparent"
              style={{
                fontSize: "clamp(4.5rem, 21vw, 19rem)",
                WebkitTextStroke: "2px rgba(255,255,255,0.45)",
                textShadow: "0 0 60px rgba(124,92,255,0.25)",
              }}
            >
              Webster
            </span>
          </span>

          {/* the object (in front) — pulled up so only its top overlaps the text */}
          <div className="relative z-10 -mt-8 anim-scale-in d2 sm:-mt-14">
            <div className="anim-float relative">
              {/* glow */}
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-gradient-to-br from-accent-2/50 via-accent/40 to-accent-3/30 blur-3xl" />
              {/* sphere */}
              <div
                className="h-56 w-56 rounded-full sm:h-72 sm:w-72"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #ffffff 0%, #c7b8ff 12%, #7c5cff 38%, #3b2a8c 70%, #0c0a1f 100%)",
                  boxShadow:
                    "inset -30px -30px 60px rgba(0,0,0,0.55), inset 20px 20px 40px rgba(255,255,255,0.15), 0 40px 80px rgba(124,92,255,0.35)",
                }}
              />
              {/* orbit ring */}
              <div className="absolute inset-[-14%] -z-[5] rounded-full border border-line-strong/60" />
            </div>
          </div>
        </div>

        {/* headline + copy */}
        <div className="relative z-10 mx-auto -mt-2 max-w-2xl text-center">
          <h1 className="anim-fade-up d3 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            We design &amp; engineer{" "}
            <span className="text-gradient">premium digital</span> products.
          </h1>
          <p className="anim-fade-up d4 mx-auto mt-5 max-w-md text-base leading-7 text-muted sm:text-lg">
            A studio for ambitious brands — strategy, design and technology, brought
            together into experiences that feel effortless.
          </p>
          <div className="anim-fade-up d5 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-ink px-7 py-3 text-sm font-medium text-ink-inverse transition-transform hover:-translate-y-0.5"
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              View our work
            </Link>
          </div>
        </div>
      </Container>

      {/* marquee strip */}
      <div className="anim-fade-in d5 relative mt-16 border-y border-line py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-faint"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
