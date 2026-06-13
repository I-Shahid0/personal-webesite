import type { DiagramLayer } from "@/lib/projects";

export function Diagram({
  title,
  layers,
}: {
  title: string;
  layers: DiagramLayer[];
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-edge bg-surface">
      <figcaption className="border-b border-edge px-4 py-2.5 font-mono text-faint text-xs uppercase tracking-wider">
        {title}
      </figcaption>
      <div className="flex flex-col items-stretch px-4 py-6 sm:px-8">
        {layers.map((layer, i) => (
          <div key={layer.nodes.map((n) => n.title).join("-")}>
            {i > 0 && (
              <div className="flex flex-col items-center py-1">
                <span className="font-mono text-edge-strong text-xs leading-none">
                  │
                </span>
                {layer.edge && (
                  <span className="my-1 rounded-sm bg-background px-2 py-0.5 font-mono text-[11px] text-faint">
                    {layer.edge}
                  </span>
                )}
                <span className="font-mono text-edge-strong text-xs leading-none">
                  ▼
                </span>
              </div>
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
                {layer.nodes.map((node) => (
                  <div
                    key={node.title}
                    className="rounded-md border border-edge-strong bg-background px-4 py-3 text-center"
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
