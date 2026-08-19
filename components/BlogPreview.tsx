import Link from "next/link";
import { getLatestArticles } from "@/lib/strapi";
import Container from "./Container";
import BlogGrid from "./BlogGrid";
import Reveal from "./Reveal";

/** Homepage section: latest 3 articles fetched from Strapi. */
export default async function BlogPreview() {
  const articles = await getLatestArticles(3);

  return (
    <section className="py-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
              From the blog
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Latest insights &amp; ideas
            </h2>
          </div>
          <Link
            href="/blog"
            className="rounded-full border border-line-strong px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
          >
            View all articles
          </Link>
        </Reveal>

        <div className="mt-14">
          <BlogGrid articles={articles} />
        </div>
      </Container>
    </section>
  );
}
