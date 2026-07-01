import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { StampLogo } from "~/components/StampLogo";

const SUGGESTIONS = ["Logo", "Instagram post", "Poster", "Résumé", "Business card"];

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function goSearch(q: string) {
    const trimmed = q.trim();
    void navigate({
      to: "/templates",
      search: trimmed ? { q: trimmed } : {},
    });
  }

  return (
    <section className="relative overflow-hidden">
      {/* soft background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(40rem 20rem at 15% 0%, color-mix(in oklab, var(--secondary) 22%, transparent), transparent), radial-gradient(36rem 18rem at 90% 10%, color-mix(in oklab, var(--accent) 30%, transparent), transparent)",
        }}
      />
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        <div className="mb-6 flex justify-center">
          <span className="border-border bg-card shadow-soft inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold">
            <StampLogo size={22} /> New · 40+ studio templates
          </span>
        </div>

        <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">
          Design <span className="hand-underline text-gradient-stamp">anything</span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          A playful, hand-crafted design studio in your browser. Start from a template, remix it
          live, and export in seconds — no design degree required.
        </p>

        <form
          className="mx-auto mt-10 flex max-w-xl items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            goSearch(query);
          }}
        >
          <div className="border-border bg-card shadow-soft focus-within:ring-ring flex flex-1 items-center gap-2 rounded-full border px-4 py-2 focus-within:ring-2">
            <span aria-hidden="true" className="text-muted-foreground text-lg">
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates — try “poster” or “logo”"
              aria-label="Search templates"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-muted-foreground text-sm">Popular:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => goSearch(s)}
              className="border-border hover:bg-muted rounded-full border px-3 py-1 text-sm transition"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link to="/templates">
            <Button size="lg">Browse all templates</Button>
          </Link>
          <Link to="/templates/$id" params={{ id: "social-quote" }}>
            <Button variant="outline" size="lg">
              Try the editor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
