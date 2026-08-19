import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, UI/UX design, digital solutions and technology.",
};

const PROCESS = [
  { step: "01", title: "Discover", text: "We learn your goals, users and constraints." },
  { step: "02", title: "Design", text: "We craft the experience and visual language." },
  { step: "03", title: "Build", text: "We engineer it on a fast, scalable stack." },
  { step: "04", title: "Launch", text: "We ship, measure and keep improving." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we can do for you"
        description="A full-service technology and design studio, from first idea to long-term partnership."
      />

      <ServicesSection />

      <section className="pb-8">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              How we work
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, i) => (
              <Reveal key={item.step} delay={i * 90}>
                <div className="rounded-2xl border border-line bg-surface p-8">
                  <span className="font-display text-sm font-semibold text-accent-2">{item.step}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
