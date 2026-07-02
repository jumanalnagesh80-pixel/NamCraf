import { Link } from "@tanstack/react-router";
import { BLANK_PRESETS, ratioToNumber } from "~/lib/templates";

export function StartFromScratch() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
            Start from scratch
          </span>
          <h2 className="font-display mt-1 text-3xl font-black sm:text-4xl">
            Create a blank design
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Pick a size and open a fresh canvas — or search millions of templates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {BLANK_PRESETS.map((p) => (
          <Link
            key={p.id}
            to="/templates/$id"
            params={{ id: p.id }}
            className="group glass flex flex-col items-center gap-3 rounded-2xl p-4 text-center transition hover:-translate-y-1 hover:glow"
          >
            <div className="flex h-20 w-full items-center justify-center">
              <div
                className="bg-gradient-neon animate-gradient-move flex items-center justify-center rounded-lg text-xl shadow-stamp"
                style={{
                  width: ratioToNumber(p.ratio) >= 1 ? "72px" : "54px",
                  aspectRatio: String(ratioToNumber(p.ratio)),
                }}
              >
                {p.icon}
              </div>
            </div>
            <div>
              <span className="block text-sm font-semibold">{p.label}</span>
              <span className="text-muted-foreground block text-xs">{p.dims}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
