import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Diagram } from "@/components/diagram";
import { FadeUp } from "@/components/fade-up";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="flex flex-col gap-12 py-16 sm:py-20">
      {/* Header */}
      <FadeUp>
        <header className="flex flex-col gap-4">
          <Link
            href="/projects"
            className="link-underline w-fit text-faint text-sm transition-colors hover:text-muted"
          >
            ← Projects
          </Link>
          <div>
            <h1 className="text-gradient font-semibold text-2xl tracking-tight sm:text-3xl">
              {project.name}
            </h1>
            <p className="mt-1 font-mono text-faint text-xs">
              {project.context} · {project.period}
            </p>
          </div>
          <p className="max-w-xl text-muted leading-relaxed">
            {project.summary}
          </p>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-edge-strong px-3 py-1.5 text-sm transition-all hover:border-faint hover:bg-surface"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-edge bg-surface p-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-medium font-mono text-base sm:text-lg">
                  {m.value}
                </p>
                <p className="mt-0.5 text-faint text-xs leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </header>
      </FadeUp>

      {/* Problem */}
      <FadeUp delay={0.1}>
        <section className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg tracking-tight">Problem</h2>
          {project.problem.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-muted text-sm leading-relaxed sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </section>
      </FadeUp>

      {/* Architecture */}
      <FadeUp delay={0.18}>
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg tracking-tight">Architecture</h2>
          <Diagram
            title={project.diagram.title}
            layers={project.diagram.layers}
          />
        </section>
      </FadeUp>

      {/* Technical decisions */}
      <FadeUp delay={0.26}>
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg tracking-tight">
            Technical Decisions
          </h2>
          <div className="flex flex-col divide-y divide-edge">
            {project.decisions.map((decision) => (
              <div key={decision.title} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-medium text-sm">{decision.title}</h3>
                <p className="mt-1.5 text-muted text-sm leading-relaxed">
                  {decision.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* Challenges */}
      <FadeUp delay={0.34}>
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg tracking-tight">Challenges</h2>
          <div className="flex flex-col divide-y divide-edge">
            {project.challenges.map((challenge) => (
              <div key={challenge.title} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-medium text-sm">{challenge.title}</h3>
                <p className="mt-1.5 text-muted text-sm leading-relaxed">
                  {challenge.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* Stack */}
      <FadeUp delay={0.42}>
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg tracking-tight">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-edge bg-surface px-2.5 py-1 font-mono text-muted text-xs transition-colors hover:border-edge-strong hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* Next project */}
      <FadeUp delay={0.5}>
        <NextProject currentSlug={project.slug} />
      </FadeUp>
    </article>
  );
}

function NextProject({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const next = projects[(index + 1) % projects.length];
  return (
    <Link
      href={`/projects/${next.slug}`}
      className="group hover:-translate-y-0.5 flex items-center justify-between rounded-lg border border-edge bg-surface p-5 transition-all duration-300 hover:border-edge-strong hover:bg-surface-hover"
    >
      <div>
        <p className="text-faint text-xs">Next project</p>
        <p className="mt-1 font-medium text-sm">{next.name}</p>
      </div>
      <span
        aria-hidden
        className="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
      >
        →
      </span>
    </Link>
  );
}
