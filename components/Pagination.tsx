import Link from "next/link";

export default function Pagination({
  page,
  pageCount,
  basePath = "/blog",
}: {
  page: number;
  pageCount: number;
  basePath?: string;
}) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  const base =
    "grid h-10 min-w-10 place-items-center rounded-lg border px-3 text-sm font-medium transition-colors";

  return (
    <nav className="mt-16 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={`${base} border-line text-ink hover:border-line-strong`}>
          ← Prev
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? "border-transparent bg-ink text-ink-inverse" : "border-line text-muted hover:border-line-strong hover:text-ink"}`}
        >
          {p}
        </Link>
      ))}
      {page < pageCount && (
        <Link href={href(page + 1)} className={`${base} border-line text-ink hover:border-line-strong`}>
          Next →
        </Link>
      )}
    </nav>
  );
}
