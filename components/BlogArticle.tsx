import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";
import Container from "./Container";
import BlockRenderer from "./BlockRenderer";

export default function BlogArticle({ article }: { article: Article }) {
  const cover = mediaUrl(article.cover);
  const avatar = mediaUrl(article.author?.avatar);

  return (
    <article>
      {/* Header */}
      <Container className="pt-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          ← Back to blog
        </Link>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          {article.category?.name && (
            <span className="inline-block rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-2">
              {article.category.name}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            {article.title}
          </h1>
          {article.description && (
            <p className="mt-5 text-lg leading-8 text-muted">{article.description}</p>
          )}

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted">
            {avatar && (
              <Image
                src={avatar}
                alt={article.author?.name ?? ""}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            )}
            {article.author?.name && (
              <span className="font-medium text-ink">{article.author.name}</span>
            )}
            {article.author?.name && <span>·</span>}
            <time>{formatDate(article.publishedAt)}</time>
          </div>
        </div>
      </Container>

      {/* Cover */}
      {cover && (
        <Container className="mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface-2">
            <Image
              src={cover}
              alt={article.cover?.alternativeText ?? article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      {/* Body */}
      <Container className="mt-12">
        <div className="mx-auto max-w-3xl">
          <BlockRenderer blocks={article.blocks} />
        </div>
      </Container>
    </article>
  );
}
