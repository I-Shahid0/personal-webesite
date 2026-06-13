import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/fade-up";
import { ProjectCard } from "@/components/project-card";
import { experience } from "@/lib/experience";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="relative flex flex-col gap-20 py-16 sm:py-24">
      {/* Hero backdrop */}
      <div
        aria-hidden
        className="-z-10 pointer-events-none absolute -inset-x-96 -top-32 h-136"
      >
        <div className="bg-dots absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]" />
      </div>

      {/* Hero */}
      <section className="flex flex-col gap-7">
        <FadeUp className="flex items-center gap-5">
          <Image
            src="/headshot.png"
            alt={site.name}
            width={104}
            height={104}
            priority
            className="rounded-full border border-edge-strong shadow-[0_0_24px_rgba(255,255,255,0.06)]"
          />
          <div>
            <h1 className="text-gradient font-semibold text-3xl tracking-tight sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-1 text-base text-muted sm:text-lg">{site.role}</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <p className="max-w-xl text-base text-muted leading-relaxed">
            I build production AI systems — from model deployment and RAG
            pipelines to low-latency backends and cloud infrastructure. Computer
            Science student at VCU.
          </p>
        </FadeUp>

        <FadeUp delay={0.16}>
          <p className="flex items-center gap-2 font-mono text-faint text-sm">
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full bg-emerald-400"
            />
            {site.location}
          </p>
        </FadeUp>

        <FadeUp delay={0.24} className="flex flex-wrap gap-3">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
          >
            Resume
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-edge-strong px-4 py-2 text-sm transition-all hover:border-faint hover:bg-surface hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-edge-strong px-4 py-2 text-sm transition-all hover:border-faint hover:bg-surface hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-md border border-edge-strong px-4 py-2 text-sm transition-all hover:border-faint hover:bg-surface hover:text-foreground"
          >
            Email
          </a>
        </FadeUp>
      </section>

      {/* Featured projects */}
      <section className="flex flex-col gap-5">
        <FadeUp delay={0.32} className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-faint text-xs">01</span>
            <h2 className="font-semibold text-xl tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="link-underline text-muted text-sm transition-colors hover:text-foreground"
          >
            All projects →
          </Link>
        </FadeUp>
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project, i) => (
            <FadeUp key={project.slug} delay={0.4 + i * 0.08}>
              <ProjectCard project={project} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Experience snapshot */}
      <section className="flex flex-col gap-5">
        <FadeUp delay={0.64} className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-faint text-xs">02</span>
            <h2 className="font-semibold text-xl tracking-tight">Experience</h2>
          </div>
          <Link
            href="/experience"
            className="link-underline text-muted text-sm transition-colors hover:text-foreground"
          >
            Full history →
          </Link>
        </FadeUp>
        <FadeUp delay={0.72}>
          <ul className="flex flex-col divide-y divide-edge">
            {experience.map((role) => (
              <li
                key={`${role.company}-${role.period}`}
                className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-medium text-sm transition-colors group-hover:text-foreground">
                    {role.company}
                  </p>
                  <p className="text-muted text-sm">{role.title}</p>
                </div>
                <p className="font-mono text-faint text-xs">{role.period}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </section>
    </div>
  );
}
