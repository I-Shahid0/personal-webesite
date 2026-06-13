import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-medium text-sm tracking-tight transition-colors hover:text-muted"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-muted text-sm transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-edge-strong px-3 py-1 text-sm transition-colors hover:border-faint hover:bg-surface"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
