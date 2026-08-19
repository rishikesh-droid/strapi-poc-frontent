import Container from "./Container";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-40%] h-72 w-[800px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <Container>
        <p className="anim-fade-up d1 text-sm font-semibold uppercase tracking-widest text-accent-2">
          {eyebrow}
        </p>
        <h1 className="anim-fade-up d2 mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="anim-fade-up d3 mt-4 max-w-xl text-lg leading-8 text-muted">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
