import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { StampLogo } from "~/components/StampLogo";
import { DesignCanvas } from "~/components/DesignCanvas";
import { defaultDesign } from "~/lib/designStore";
import {
  CURATED_TEMPLATES,
  TOTAL_TEMPLATE_COUNT,
  categoryLabel,
  formatCount,
  formatLakh,
} from "~/lib/templates";

const SUGGESTIONS = ["Logo", "Instagram post", "Poster", "Résumé", "AI art", "Pitch deck"];

// A few curated designs to float in the hero collage.
const FLOATERS = ["logo-stamp-mark", "social-quote", "poster-jazz-night", "ig-carousel", "pres-title"];

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function goSearch(q: string) {
    const trimmed = q.trim();
    void navigate({ to: "/templates", search: trimmed ? { q: trimmed } : {} });
  }

  const floaters = FLOATERS.map((id) => CURATED_TEMPLATES.find((t) => t.id === id)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );

  return (
    <section className="relative overflow-hidden">
      {/* Futuristic backdrop */}
      <div aria-hidden="true" className="bg-aurora pointer-events-none absolute inset-0 -z-20" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy + search */}
        <div className="text-center lg:text-left">
          <span className="glass shadow-soft mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <StampLogo size={22} />
            <span className="text-gradient-neon">100% free</span>
            <span className="text-muted-foreground">· {formatLakh(TOTAL_TEMPLATE_COUNT)} templates · no signup</span>
          </span>

          <h1 className="font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl">
            The free online
            <br />
            tool to design{" "}
            <span className="hand-underline text-gradient-neon animate-gradient-move">anything</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg lg:mx-0">
            NAMCRAFT is a{" "}
            <span className="text-foreground font-semibold">free-to-use online graphic design tool</span>.
            Search{" "}
            <span className="text-foreground font-semibold">{formatCount(TOTAL_TEMPLATE_COUNT)}</span>{" "}
            templates, remix them live, and export in seconds — no download, no signup required.
          </p>

          {/* Glass search */}
          <form
            className="mx-auto mt-9 flex max-w-xl items-center gap-2 lg:mx-0"
            onSubmit={(e) => {
              e.preventDefault();
              goSearch(query);
            }}
          >
            <div className="glass-strong shadow-soft focus-within:ring-ring flex flex-1 items-center gap-2 rounded-full px-4 py-2.5 focus-within:ring-2">
              <span aria-hidden="true" className="text-muted-foreground text-lg">
                🔍
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search millions of templates…"
                aria-label="Search templates"
                className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="bg-gradient-neon glow animate-gradient-move">
              Search
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="text-muted-foreground text-sm">Trending:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => goSearch(s)}
                className="glass rounded-full px-3 py-1 text-sm transition hover:-translate-y-0.5"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-9 flex items-center justify-center gap-3 lg:justify-start">
            <Link to="/templates">
              <Button size="lg" className="bg-gradient-neon glow animate-gradient-move">
                Explore templates
              </Button>
            </Link>
            <Link to="/templates/$id" params={{ id: "social-quote" }}>
              <Button variant="outline" size="lg" className="glass">
                Try the editor
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: floating template collage */}
        <div className="relative hidden h-[30rem] lg:block" aria-hidden="true">
          <div
            className="glow-accent absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--gradient-stamp)" }}
          />
          {floaters.map((t, i) => {
            const positions = [
              "left-[4%] top-[6%] w-44 rotate-[-8deg]",
              "right-[2%] top-[0%] w-52 rotate-[6deg]",
              "left-[26%] top-[38%] w-56 rotate-[-2deg] z-10",
              "left-[0%] bottom-[4%] w-40 rotate-[5deg]",
              "right-[4%] bottom-[2%] w-48 rotate-[-6deg]",
            ];
            const design = defaultDesign({
              headline: t.headline,
              tagline: t.tagline,
              paletteId: t.paletteId,
              fontId: t.fontId,
              darkText: t.darkText,
              headlineSize: 92,
            });
            return (
              <div
                key={t.id}
                className={`glass-strong animate-float absolute overflow-hidden rounded-2xl p-1.5 shadow-stamp ${positions[i]}`}
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                <DesignCanvas
                  ratio={t.ratio}
                  design={design}
                  eyebrow={categoryLabel(t.category)}
                  rounded
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
