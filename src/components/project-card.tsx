import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group hover:-translate-y-0.5 flex flex-col rounded-lg border border-edge bg-surface p-5 transition-all duration-300 hover:border-edge-strong hover:bg-surface-hover hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_32px_-12px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium text-base tracking-tight">{project.name}</h3>
        <span
          aria-hidden
          className="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
        >
          →
        </span>
      </div>
      <p className="mt-2 text-muted text-sm leading-relaxed">
        {project.tagline}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-edge pt-4">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <p className="font-medium font-mono text-sm">{m.value}</p>
            <p className="text-faint text-xs">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded-sm border border-edge px-1.5 py-0.5 font-mono text-[11px] text-faint transition-colors group-hover:border-edge-strong group-hover:text-muted"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 6 && (
          <span className="px-1 py-0.5 font-mono text-[11px] text-faint">
            +{project.stack.length - 6}
          </span>
        )}
      </div>
    </Link>
  );
}
