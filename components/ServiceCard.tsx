import type { ReactNode } from "react";

export interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  index?: string;
}

export default function ServiceCard({ title, description, icon, index }: Service) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:border-line-strong hover:bg-surface-2">
      {/* hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/20" />

      <div className="relative flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-base text-ink transition-colors group-hover:border-accent/40 group-hover:text-accent-2">
          {icon}
        </div>
        {index && (
          <span className="font-display text-sm font-medium text-faint">{index}</span>
        )}
      </div>

      <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight text-ink">
        {title}
      </h3>
      <p className="relative mt-3 text-sm leading-7 text-muted">{description}</p>
    </div>
  );
}
