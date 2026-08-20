import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getContactPage } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Webster studio.",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-base px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";

export default async function ContactPage() {
  const page = await getContactPage();
  const eyebrow = page?.eyebrow || "Contact";
  const title = page?.title || "Let's build something great";
  const subtitle =
    page?.subtitle ||
    "Tell us about your project and we'll get back to you within one business day.";
  const email = page?.email || "studio@webster.co.in";
  const phone = page?.phone || "+91 00000 00000";

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[15%] top-0 h-72 w-[600px] rounded-full bg-accent/12 blur-[120px]" />
      </div>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-md text-lg leading-8 text-muted">
              {subtitle}
            </p>

            <div className="mt-10 space-y-4 text-sm">
              <p className="text-muted">
                Email:{" "}
                <a href={`mailto:${email}`} className="font-medium text-ink">
                  {email}
                </a>
              </p>
              <p className="text-muted">
                Phone: <span className="font-medium text-ink">{phone}</span>
              </p>
            </div>
          </Reveal>

          {/* Demo form — not wired to a backend in this POC. */}
          <Reveal delay={120}>
            <form className="rounded-3xl border border-line bg-surface p-8">
              <div className="grid gap-5">
                <div>
                  <label className="text-sm font-medium text-ink" htmlFor="name">Name</label>
                  <input id="name" type="text" className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink" htmlFor="email">Email</label>
                  <input id="email" type="email" className={inputClass} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink" htmlFor="message">Message</label>
                  <textarea id="message" rows={5} className={inputClass} placeholder="Tell us about your project…" />
                </div>
                <button
                  type="button"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-inverse transition-transform hover:-translate-y-0.5"
                >
                  Send message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
