import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";

export default function BlogCard({ article }: { article: Article }) {
  const cover = mediaUrl(article.cover);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {cover ? (
          <Image
            src={cover}
            alt={article.cover?.alternativeText ?? article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-faint">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {article.category?.name && (
          <span className="absolute left-3 top-3 rounded-full border border-line-strong bg-base/70 px-2.5 py-0.5 text-[11px] font-medium text-ink backdrop-blur">
            {article.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time className="text-xs font-medium uppercase tracking-widest text-faint">
          {formatDate(article.publishedAt)}
        </time>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-2">
          {article.title}
        </h3>
        {article.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{article.description}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-2">
          Read more <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
