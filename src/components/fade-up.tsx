import type { CSSProperties, ReactNode } from "react";

/** Server-safe entrance animation wrapper; stagger with the delay prop (seconds). */
export function FadeUp({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className ? `fade-up ${className}` : "fade-up"}
      style={{ "--delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
