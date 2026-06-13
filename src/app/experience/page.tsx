import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/fade-up";
import { education, experience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience across AI engineering, full-stack development, and research.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-12 py-16 sm:py-24">
      <FadeUp>
        <h1 className="text-gradient font-semibold text-2xl tracking-tight sm:text-3xl">
          Experience
        </h1>
        <p className="mt-2 max-w-xl text-muted text-sm leading-relaxed">
          AI engineering, full-stack development, and research — most roles link
          to an in-depth write-up of what was built.
        </p>
      </FadeUp>

      <div className="flex flex-col gap-10">
        {experience.map((role, i) => (
          <FadeUp
            key={`${role.company}-${role.period}`}
            delay={0.08 + i * 0.07}
          >
            <section className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h2 className="font-medium text-base tracking-tight">
                    {role.company}
                  </h2>
                  <p className="text-muted text-sm">
                    {role.title} · {role.location}
                  </p>
                </div>
                <p className="font-mono text-faint text-xs">{role.period}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet.slice(0, 40)}
                    className="flex gap-2.5 text-muted text-sm leading-relaxed"
                  >
                    <span aria-hidden className="mt-0.5 text-faint">
                      –
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              {role.projectSlug && (
                <Link
                  href={`/projects/${role.projectSlug}`}
                  className="link-underline w-fit text-sm transition-colors hover:text-muted"
                >
                  Read the project write-up →
                </Link>
              )}
            </section>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.5}>
        <section className="flex flex-col gap-3 border-t border-edge pt-8">
          <h2 className="font-semibold text-lg tracking-tight">Education</h2>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="font-medium text-sm">{education.school}</p>
              <p className="text-muted text-sm">
                {education.degree} · {education.location}
              </p>
            </div>
            <p className="font-mono text-faint text-xs">
              Graduating {education.graduation}
            </p>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
