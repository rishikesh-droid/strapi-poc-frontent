import WorkCard from "./WorkCard";
import Reveal from "./Reveal";
import type { CaseStudy } from "@/lib/types";

export default function WorkGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (!caseStudies.length) {
    return (
      <div className="rounded-2xl border border-dashed border-line py-20 text-center text-muted">
        No case studies published yet. Add one in the Strapi admin (Case Study) and it will appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((cs, i) => (
        <Reveal key={cs.id} delay={i * 80}>
          <WorkCard caseStudy={cs} />
        </Reveal>
      ))}
    </div>
  );
}
