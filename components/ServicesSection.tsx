import Container from "./Container";
import Reveal from "./Reveal";
import ServiceCard, { type Service } from "./ServiceCard";

const icons = {
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="22" /></svg>
  ),
  spark: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /></svg>
  ),
  chip: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /></svg>
  ),
};

const SERVICES: Service[] = [
  { index: "01", title: "Web Development", description: "Fast, accessible, production-grade websites and apps on a modern JavaScript stack.", icon: icons.code },
  { index: "02", title: "UI/UX Design", description: "Interface and experience design that balances beauty with usability and conversion.", icon: icons.design },
  { index: "03", title: "Digital Solutions", description: "End-to-end product strategy, branding and content systems tailored to your goals.", icon: icons.spark },
  { index: "04", title: "Technology", description: "Headless CMS, APIs and cloud infrastructure that scale cleanly as you grow.", icon: icons.chip },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
            What we do
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Services built for modern brands
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            A full-service studio covering everything from the first sketch to the
            final deploy.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
