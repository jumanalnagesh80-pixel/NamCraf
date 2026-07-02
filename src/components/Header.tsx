import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BrandMark } from "./StampLogo";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { openCommandPalette } from "./CommandPalette";

const NAV = [
  { to: "/templates", label: "Templates" },
  { to: "/", hash: "pricing", label: "Pricing" },
  { to: "/", hash: "features", label: "Features" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-40 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="NAMCRAFT Graphic Studio — home">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className="hover:bg-muted rounded-full px-4 py-2 text-sm font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="glass text-muted-foreground hover:text-foreground hidden items-center gap-2 rounded-full px-3 py-2 text-sm transition lg:flex"
            aria-label="Open command palette"
          >
            <span aria-hidden="true">🔍</span>
            <span>Search</span>
            <kbd className="border-border rounded border px-1.5 py-0.5 text-[0.65rem]">⌘K</kbd>
          </button>
          <ThemeToggle className="hidden sm:flex" />
          <div className="hidden sm:block">
            <UserMenu />
          </div>
          <button
            type="button"
            className="border-border hover:bg-muted flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="text-lg" aria-hidden="true">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-border bg-background border-t md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={"hash" in item ? item.hash : undefined}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-xl px-4 py-3 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between px-4 py-2">
              <UserMenu />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
