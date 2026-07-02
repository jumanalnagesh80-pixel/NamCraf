import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { TemplateCard } from "~/components/TemplateCard";
import { Button } from "~/components/ui/Button";
import {
  ALL_TEMPLATES,
  CATEGORIES,
  RATIOS,
  TOTAL_TEMPLATE_COUNT,
  categoryLabel,
  formatCount,
  type AspectRatio,
} from "~/lib/templates";
import { cn } from "~/lib/utils";

const PAGE_SIZE = 24;

type SortKey = "newest" | "popular" | "az";

interface TemplateSearch {
  q?: string;
  category?: string;
  ratio?: AspectRatio;
  sort?: SortKey;
}

const SORTS: { id: SortKey; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "newest", label: "Newest" },
  { id: "az", label: "A–Z" },
];

export const Route = createFileRoute("/templates/")({
  validateSearch: (search: Record<string, unknown>): TemplateSearch => {
    const rawRatio = String(search.ratio ?? "");
    const rawSort = String(search.sort ?? "");
    const validRatio = RATIOS.some((r) => r.id === rawRatio);
    const validSort = SORTS.some((s) => s.id === rawSort);
    return {
      q: search.q ? String(search.q) : undefined,
      category: search.category ? String(search.category) : undefined,
      ratio: validRatio ? (rawRatio as AspectRatio) : undefined,
      sort: validSort ? (rawSort as SortKey) : undefined,
    };
  },
  head: () => ({
    ...seo({
      path: "/templates",
      title: "Templates",
      description:
        "Browse 3M+ studio-crafted templates across logos, posters, social posts, presentations and more. Filter by category, aspect ratio and sort — then remix any of them in the live editor.",
    }),
  }),
  component: TemplatesLibrary,
});

function TemplatesLibrary() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const setSearch = (patch: Partial<TemplateSearch>) => {
    void navigate({
      search: (prev) => {
        const next = { ...prev, ...patch };
        // drop empty keys so the URL stays clean
        (Object.keys(next) as (keyof TemplateSearch)[]).forEach((k) => {
          if (!next[k]) delete next[k];
        });
        return next;
      },
    });
  };

  const sort: SortKey = search.sort ?? "popular";

  const results = useMemo(() => {
    let list = [...ALL_TEMPLATES];

    if (search.category) list = list.filter((t) => t.category === search.category);
    if (search.ratio) list = list.filter((t) => t.ratio === search.ratio);

    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.headline.toLowerCase().includes(q) ||
          categoryLabel(t.category).toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    switch (sort) {
      case "newest":
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "az":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [search.category, search.ratio, search.q, sort]);

  const hasFilters = Boolean(search.q || search.category || search.ratio);

  // Pagination — the catalog is huge, so reveal results in pages.
  const [visible, setVisible] = useState(PAGE_SIZE);
  const filterKey = `${search.category ?? ""}|${search.ratio ?? ""}|${search.q ?? ""}|${sort}`;
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filterKey]);
  const shown = results.slice(0, visible);
  const remaining = results.length - shown.length;

  // Auto-load more when the sentinel scrolls into view (true infinite scroll,
  // with the Load-more button kept as a no-JS / accessible fallback).
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || remaining <= 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [remaining, filterKey]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
            {formatCount(TOTAL_TEMPLATE_COUNT)} templates
          </span>
          <h1 className="font-display mt-1 text-4xl font-black sm:text-5xl">Template library</h1>
          <p className="text-muted-foreground mt-2">
            {results.length.toLocaleString()} matching
            {search.category ? ` ${categoryLabel(search.category)}` : ""} template
            {results.length === 1 ? "" : "s"}
            {search.q ? ` for “${search.q}”` : ""} — from a catalog of{" "}
            {formatCount(TOTAL_TEMPLATE_COUNT)}.
          </p>
        </header>

        {/* Search bar synced with the URL */}
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            const value = new FormData(e.currentTarget).get("q");
            setSearch({ q: value ? String(value) : undefined });
          }}
        >
          <div className="border-border bg-card shadow-soft focus-within:ring-ring flex items-center gap-2 rounded-full border px-4 py-2.5 focus-within:ring-2">
            <span aria-hidden="true" className="text-muted-foreground text-lg">
              🔍
            </span>
            <input
              type="search"
              name="q"
              defaultValue={search.q ?? ""}
              key={search.q ?? ""}
              placeholder="Search templates by name, category or tag"
              aria-label="Search templates"
              className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
            />
            <Button type="submit" size="sm">
              Search
            </Button>
          </div>
        </form>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!search.category}
              onClick={() => setSearch({ category: undefined })}
            >
              All categories
            </FilterChip>
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.id}
                active={search.category === cat.id}
                onClick={() => setSearch({ category: cat.id })}
              >
                <span aria-hidden="true">{cat.icon}</span> {cat.label}
              </FilterChip>
            ))}
          </div>

          {/* Ratio + sort row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground mr-1 text-sm font-semibold">Ratio:</span>
              <FilterChip active={!search.ratio} onClick={() => setSearch({ ratio: undefined })}>
                Any
              </FilterChip>
              {RATIOS.map((r) => (
                <FilterChip
                  key={r.id}
                  active={search.ratio === r.id}
                  onClick={() => setSearch({ ratio: r.id })}
                >
                  {r.id}
                </FilterChip>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-muted-foreground text-sm font-semibold">
                Sort:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSearch({ sort: e.target.value as SortKey })}
                className="border-border bg-card rounded-full border px-4 py-2 text-sm font-medium outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={() =>
                setSearch({ q: undefined, category: undefined, ratio: undefined })
              }
              className="text-primary text-sm font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>

            {remaining > 0 && (
              <div ref={sentinelRef} className="mt-10 flex flex-col items-center gap-3">
                <p className="text-muted-foreground text-sm">
                  Showing {shown.length.toLocaleString()} of {results.length.toLocaleString()}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-neon glow animate-gradient-move"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  Load more templates
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="glass flex flex-col items-center rounded-3xl py-20 text-center">
            <span className="text-5xl" aria-hidden="true">
              🔍
            </span>
            <h2 className="font-display mt-4 text-2xl font-black">No templates found</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Try a different search or clear your filters to see the whole catalog.
            </p>
            <Button
              className="mt-6"
              onClick={() => setSearch({ q: undefined, category: undefined, ratio: undefined })}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
