"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import type { DiagramLayer } from "@/lib/projects";

export function Diagram({
  title,
  layers,
}: {
  title: string;
  layers: DiagramLayer[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  // Start the flow animation only once the diagram scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A longer pipeline needs a longer cycle so the pulse can travel the whole
  // way down before the next batch starts at the top.
  const period = Math.max(2.6, (2 * layers.length - 1) * 0.42 + 1).toFixed(2);

  return (
    <figure
      ref={ref}
      className={`diagram overflow-hidden rounded-lg border border-edge bg-surface ${
        live ? "is-live" : ""
      }`}
      style={{ "--flow-period": `${period}s` } as CSSProperties}
    >
      <figcaption className="flex items-center justify-between border-b border-edge px-4 py-2.5 font-mono text-faint text-xs uppercase tracking-wider">
        <span>{title}</span>
        <span className="flex items-center gap-1.5 normal-case tracking-normal">
          <span
            aria-hidden
            className="flow-status-dot inline-block size-1.5 rounded-full bg-emerald-400"
          />
          <span className="text-[10px] text-faint">live</span>
        </span>
      </figcaption>
      <div className="flex flex-col items-stretch px-4 py-6 sm:px-8">
        {layers.map((layer, i) => (
          <div key={layer.nodes.map((n) => n.title).join("-")}>
            {i > 0 && (
              <Connector edge={layer.edge} phase={2 * i - 1} />
            )}
            <div className="relative">
              {layer.label && (
                <span className="-top-2 absolute left-3 z-10 bg-surface px-1.5 font-mono text-[10px] text-faint uppercase tracking-wider">
                  {layer.label}
                </span>
              )}
              <div
                className={`grid gap-3 ${
                  layer.nodes.length > 1 ? "sm:grid-cols-2" : ""
                } ${layer.nodes.length > 2 ? "lg:grid-cols-3" : ""} ${
                  layer.label
                    ? "rounded-lg border border-edge-strong border-dashed p-3 pt-4"
                    : ""
                }`}
              >
                {layer.nodes.map((node, j) => (
                  <div
                    key={node.title}
                    className="flow-node rounded-md border border-edge-strong bg-background px-4 py-3 text-center"
                    style={{ "--phase": 2 * i + j * 0.18 } as CSSProperties}
                  >
                    <p className="font-medium font-mono text-sm">
                      {node.title}
                    </p>
                    {node.detail && (
                      <p className="mt-1 font-mono text-[11px] text-faint leading-relaxed">
                        {node.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function Connector({ edge, phase }: { edge?: string; phase: number }) {
  return (
    <div
      className="flow-connector"
      style={{ "--phase": phase } as CSSProperties}
    >
      <span aria-hidden className="flow-rail">
        <span className="flow-pulse" />
      </span>
      {edge && <span className="flow-edge-label">{edge}</span>}
      <span aria-hidden className="flow-arrow">
        ▼
      </span>
    </div>
  );
}
