import type { ReactNode } from "react";

/**
 * Minimal, dependency-free Markdown renderer for the subset produced by
 * Strapi's rich-text field (headings, bold, links, lists, blockquotes,
 * paragraphs). Output is real JSX — no dangerouslySetInnerHTML — so CMS
 * content can't inject markup.
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Split on **bold** and [label](href) while keeping the delimiters.
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={`${keyPrefix}-b-${i}`}>{part.slice(2, -2)}</strong>);
    } else {
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        nodes.push(
          <a key={`${keyPrefix}-a-${i}`} href={link[2]} target="_blank" rel="noreferrer">
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(part);
      }
    }
  });

  return nodes;
}

export default function RichText({ body }: { body?: string }) {
  if (!body) return null;

  const blocks = body.split(/\n{2,}/);

  return (
    <div className="prose-article">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        const key = `block-${i}`;

        if (trimmed.startsWith("### ")) {
          return <h3 key={key}>{renderInline(trimmed.slice(4), key)}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={key}>{renderInline(trimmed.slice(3), key)}</h2>;
        }
        if (trimmed.startsWith("# ")) {
          return <h2 key={key}>{renderInline(trimmed.slice(2), key)}</h2>;
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={key}>
              {renderInline(trimmed.replace(/^>\s?/gm, ""), key)}
            </blockquote>
          );
        }

        const lines = trimmed.split("\n");
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
          return (
            <ul key={key}>
              {lines.map((l, j) => (
                <li key={`${key}-${j}`}>{renderInline(l.replace(/^[-*]\s+/, ""), `${key}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={key}>
              {lines.map((l, j) => (
                <li key={`${key}-${j}`}>{renderInline(l.replace(/^\d+\.\s+/, ""), `${key}-${j}`)}</li>
              ))}
            </ol>
          );
        }

        return <p key={key}>{renderInline(trimmed, key)}</p>;
      })}
    </div>
  );
}
