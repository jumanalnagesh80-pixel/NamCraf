import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "~/hooks/useAuth";
import { Button } from "./ui/Button";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user || !profile) {
    return (
      <Link to="/auth">
        <Button size="sm">Sign in</Button>
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="border-border hover:bg-muted flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 transition"
      >
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="bg-gradient-stamp text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
            {initials(profile.name)}
          </span>
        )}
        <span className="max-w-[8rem] truncate text-sm font-semibold">{profile.name}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="border-border bg-popover text-popover-foreground shadow-stamp absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border py-1"
        >
          <div className="border-border border-b px-4 py-3">
            <p className="truncate text-sm font-semibold">{profile.name}</p>
            <p className="text-muted-foreground truncate text-xs">{user.email}</p>
          </div>
          <Link
            to="/favorites"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="hover:bg-muted block px-4 py-2.5 text-sm"
          >
            ⭐ My favorites & designs
          </Link>
          <Link
            to="/templates"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="hover:bg-muted block px-4 py-2.5 text-sm"
          >
            🖼️ Browse templates
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await signOut();
              void navigate({ to: "/" });
            }}
            className="hover:bg-muted text-destructive block w-full px-4 py-2.5 text-left text-sm"
          >
            ↩ Sign out
          </button>
        </div>
      )}
    </div>
  );
}
