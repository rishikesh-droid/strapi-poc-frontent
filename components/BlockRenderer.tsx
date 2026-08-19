import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import type { ArticleBlock } from "@/lib/types";
import RichText from "./RichText";

/** Renders the article `blocks` dynamic zone coming from Strapi. */
export default function BlockRenderer({ blocks }: { blocks?: ArticleBlock[] | null }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case "shared.rich-text":
            return <RichText key={block.id} body={block.body} />;

          case "shared.quote":
            return (
              <blockquote
                key={block.id}
                className="my-8 border-l-4 border-accent pl-6 text-xl font-medium italic text-ink"
              >
                {block.title && <p className="not-italic font-semibold">{block.title}</p>}
                <p>{block.body}</p>
              </blockquote>
            );

          case "shared.media": {
            const url = mediaUrl(block.file);
            if (!url) return null;
            return (
              <div key={block.id} className="my-8 overflow-hidden rounded-2xl">
                <Image
                  src={url}
                  alt={block.file?.alternativeText ?? ""}
                  width={block.file?.width ?? 1200}
                  height={block.file?.height ?? 800}
                  className="h-auto w-full object-cover"
                />
              </div>
            );
          }

          case "shared.slider":
            return (
              <div key={block.id} className="my-8 grid gap-4 sm:grid-cols-2">
                {block.files?.map((file) => {
                  const url = mediaUrl(file);
                  if (!url) return null;
                  return (
                    <div key={file.id} className="overflow-hidden rounded-2xl">
                      <Image
                        src={url}
                        alt={file.alternativeText ?? ""}
                        width={file.width ?? 800}
                        height={file.height ?? 600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
