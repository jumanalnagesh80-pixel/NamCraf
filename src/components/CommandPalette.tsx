import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ALL_TEMPLATES, CATEGORIES, categoryLabel } from "~/lib/templates";

interface CommandItem {
  id: string;
  icon: string;
  label: string;
  sub?: string;
  run: () => void;
}

/** Open the palette from anywhere: window.dispatchEvent(new Event("namcraft:command")). */
export function openCommandPalette() {
  window.dispatchEvent(new Event("namcraft:command"));
}

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("namcraft:command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("namcraft:command", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const items = useMemo<CommandItem[]>(() => {
    const q = query.trim().toLowerCase();
    const go = (fn: () => void) => () => {
      setOpen(false);
      fn();
    };

    const nav: CommandItem[] = [
      { id: "n-home", icon: "🏠", label: "Home", run: go(() => navigate({ to: "/" })) },
      { id: "n-templates", icon: "🖼️", label: "Browse all templates", run: go(() => navigate({ to: "/templates" })) },
      { id: "n-blank", icon: "➕", label: "Create a blank design", run: go(() => navigate({ to: "/templates/$id", params: { id: "blank-ig-post" } })) },
      { id: "n-fav", icon: "⭐", label: "Favorites & saved designs", run: go(() => navigate({ to: "/favorites" })) },
      { id: "n-contact", icon: "✉️", label: "Contact", run: go(() => navigate({ to: "/contact" })) },
      { id: "n-auth", icon: "🔐", label: "Sign in / sign up", run: go(() => navigate({ to: "/auth" })) },
    ];

    const cats: CommandItem[] = CATEGORIES.map((c) => ({
      id: `c-${c.id}`,
      icon: c.icon,
      label: `${c.label} templates`,
      sub: "Category",
      run: go(() => navigate({ to: "/category/$slug", params: { slug: c.id } })),
    }));

    const tmpl: CommandItem[] = q
      ? ALL_TEMPLATES.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.headline.toLowerCase().includes(q) ||
            categoryLabel(t.category).toLowerCase().includes(q),
        )
          .slice(0, 6)
          .map((t) => ({
            id: `t-${t.id}`,
            icon: "✏️",
            label: t.title,
            sub: `${categoryLabel(t.category)} · ${t.ratio}`,
            run: go(() => navigate({ to: "/templates/$id", params: { id: t.id } })),
          }))
      : [];

    const searchAction: CommandItem[] = q
      ? [
          {
            id: "search",
            icon: "🔍",
            label: `Search templates for “${query.trim()}”`,
            run: go(() => navigate({ to: "/templates", search: { q: query.trim() } })),
          },
        ]
      : [];

    const all = [...searchAction, ...tmpl, ...nav, ...cats];
    if (!q) return all;
    return all.filter((i) => i.label.toLowerCase().includes(q) || i.id === "search" || i.id.startsWith("t-"));
  }, [query, navigate]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, items.length - 1)));
  }, [items.length]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="glass-strong glow relative w-full max-w-xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border flex items-center gap-3 border-b px-4 py-3">
          <span className="text-muted-foreground text-lg" aria-hidden="true">
            🔍
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, items.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                items[active]?.run();
              }
            }}
            placeholder="Search templates, jump to a page…"
            className="placeholder:text-muted-foreground w-full bg-transparent text-base outline-none"
            aria-label="Command palette search"
          />
          <kbd className="border-border text-muted-foreground hidden rounded border px-1.5 py-0.5 text-xs sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <p className="text-muted-foreground px-3 py-6 text-center text-sm">No results.</p>
          ) : (
            items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={item.run}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  i === active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{item.label}</span>
                  {item.sub && (
                    <span
                      className={`block truncate text-xs ${
                        i === active ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {item.sub}
                    </span>
                  )}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
