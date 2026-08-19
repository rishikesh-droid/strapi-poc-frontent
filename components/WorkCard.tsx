import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/strapi";
import type { CaseStudy } from "@/lib/types";

export default function WorkCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const cover = mediaUrl(caseStudy.coverImage);
  const chip = caseStudy.stats?.find((s) => s.value)?.value;

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
        {cover ? (
          <Image
            src={cover}
            alt={caseStudy.coverImage?.alternativeText ?? caseStudy.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-faint">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent opacity-70" />
        {chip && (
          <span className="absolute left-3 top-3 rounded-full border border-line-strong bg-base/70 px-2.5 py-0.5 text-[11px] font-medium text-ink backdrop-blur">
            {chip}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-white">
            {caseStudy.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {caseStudy.subtitle && (
          <p className="line-clamp-2 text-sm leading-6 text-muted">{caseStudy.subtitle}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-2">
          View case study <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
