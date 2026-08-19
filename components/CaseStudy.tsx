import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/strapi";
import type { CaseStudy as CaseStudyType } from "@/lib/types";
import Container from "./Container";
import BlockRenderer from "./BlockRenderer";

function Stats({ caseStudy }: { caseStudy: CaseStudyType }) {
  const stats = (caseStudy.stats ?? []).filter((s) => s.value);
  if (!stats.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="min-w-[150px] flex-1 rounded-xl border border-line bg-surface px-5 py-4"
        >
          {stat.label && (
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {stat.label}
            </p>
          )}
          <p className="mt-1 text-base font-medium text-ink">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function CaseStudy({ caseStudy }: { caseStudy: CaseStudyType }) {
  const cover = mediaUrl(caseStudy.coverImage);
  const chip = caseStudy.stats?.find((s) => s.value)?.value;

  return (
    <article>
      {/* Hero */}
      <Container className="pt-14">
        <Link
          href="/work"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          ← Back to work
        </Link>

        <div className="mt-8 max-w-3xl">
          {chip && (
            <span className="inline-block rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-2">
              {chip}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {caseStudy.title}
          </h1>
          {caseStudy.subtitle && (
            <p className="mt-6 text-xl leading-9 text-muted">{caseStudy.subtitle}</p>
          )}
        </div>
      </Container>

      {/* Cover */}
      {cover && (
        <Container className="mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface-2">
            <Image
              src={cover}
              alt={caseStudy.coverImage?.alternativeText ?? caseStudy.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      {/* Stats — variable count */}
      <Container className="mt-12">
        <Stats caseStudy={caseStudy} />
      </Container>

      {/* Body — flexible dynamic zone (short or long) */}
      <Container className="mt-16">
        <div className="mx-auto max-w-3xl">
          <BlockRenderer blocks={caseStudy.content} />
        </div>
      </Container>
    </article>
  );
}
