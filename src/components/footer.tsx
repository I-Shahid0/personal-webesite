import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-faint text-sm">
          {site.name} · {site.location}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-muted transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
