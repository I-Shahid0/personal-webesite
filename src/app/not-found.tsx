import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-32">
      <p className="font-mono text-faint text-sm">404</p>
      <h1 className="font-semibold text-2xl tracking-tight">Page not found</h1>
      <Link
        href="/"
        className="rounded-md border border-edge-strong px-4 py-2 text-sm transition-colors hover:border-faint hover:bg-surface"
      >
        Back home
      </Link>
    </div>
  );
}
