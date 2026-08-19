import Link from "next/link";
import Container from "./Container";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] mt-24 overflow-hidden border-t border-line bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-accent/10 to-transparent" />

      {/* big wordmark */}
      <Container className="pt-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
                W
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Webster
              </span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-muted">
              A technology &amp; design studio building premium digital experiences.
              Powered by Strapi &amp; Next.js.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-inverse transition-transform hover:-translate-y-0.5"
            >
              Start a project →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-faint">
                Navigation
              </h4>
              <ul className="mt-4 space-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-faint">
                Social
              </h4>
              <ul className="mt-4 space-y-3">
                {SOCIAL.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* oversized brand line */}
        <div className="mt-16 select-none overflow-hidden">
          <p
            className="font-display font-bold leading-none text-transparent"
            style={{
              fontSize: "clamp(3rem, 13vw, 12rem)",
              WebkitTextStroke: "1px rgba(255,255,255,0.07)",
            }}
          >
            Webster
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-line py-6 text-sm text-faint sm:flex-row sm:items-center">
          <p>© {year} Webster Studio. All rights reserved.</p>
          <p>Built with Strapi + Next.js</p>
        </div>
      </Container>
    </footer>
  );
}
