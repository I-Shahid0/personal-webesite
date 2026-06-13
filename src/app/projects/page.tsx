import type { Metadata } from "next";
import { FadeUp } from "@/components/fade-up";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production AI systems, real-time backends, and cloud infrastructure — explained in depth.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 py-16 sm:py-24">
      <FadeUp>
        <h1 className="text-gradient font-semibold text-2xl tracking-tight sm:text-3xl">
          Projects
        </h1>
        <p className="mt-2 max-w-xl text-muted text-sm leading-relaxed">
          Each project page covers the problem, the architecture, the technical
          decisions behind it, and the engineering challenges that came up along
          the way.
        </p>
      </FadeUp>
      <div className="flex flex-col gap-4">
        {projects.map((project, i) => (
          <FadeUp key={project.slug} delay={0.08 + i * 0.07}>
            <ProjectCard project={project} />
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
