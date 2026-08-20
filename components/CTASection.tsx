import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";

export default function CTASection({
  title = "Have a project in mind?",
  subtitle = "Let's build something exceptional together. Tell us about your idea and we'll help bring it to life.",
  button = "Let's talk",
}: {
  title?: string | null;
  subtitle?: string | null;
  button?: string | null;
}) {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-20 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-64 w-[700px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-accent-3/15 blur-[90px]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-muted">
                {subtitle}
              </p>
              <Link
                href="/contact"
                className="mt-9 inline-block rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-ink-inverse transition-transform hover:-translate-y-0.5"
              >
                {button} →
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
