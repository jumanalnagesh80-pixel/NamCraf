import { Link } from "@tanstack/react-router";
import { StampLogo } from "./StampLogo";

const COLUMNS: { title: string; links: { label: string; to: string; hash?: string }[] }[] = [
  {
    title: "Create",
    links: [
      { label: "All templates", to: "/templates" },
      { label: "Logos", to: "/templates" },
      { label: "Posters", to: "/templates" },
      { label: "Social posts", to: "/templates" },
      { label: "Presentations", to: "/templates" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Features", to: "/", hash: "features" },
      { label: "Pricing", to: "/", hash: "pricing" },
      { label: "Journal", to: "/", hash: "journal" },
      { label: "Testimonials", to: "/", hash: "testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Favorites", to: "/favorites" },
      { label: "Sign in", to: "/auth" },
      { label: "FAQ", to: "/", hash: "faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border bg-muted/40 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="flex items-center gap-2.5" aria-label="NAMCRAFT home">
            <StampLogo size={40} />
            <span className="font-display text-lg font-black tracking-tight">
              NAM<span className="text-gradient-stamp">CRAFT</span>
            </span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-xs text-sm">
            A playful, hand-crafted design studio in your browser. Design anything — from a
            single stamp to a full brand kit.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { label: "Instagram", href: "https://instagram.com/namcraft.studio" },
              { label: "Twitter", href: "https://twitter.com/namcraft" },
              { label: "Dribbble", href: "https://dribbble.com/namcraft" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="border-border hover:bg-muted rounded-full border px-3 py-1.5 text-xs font-semibold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold tracking-wide uppercase">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    hash={link.hash}
                    className="text-muted-foreground hover:text-foreground text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} NAMCRAFT Graphic Studio. Stamped with care.</p>
          <p>Made with the stamp-blue / blossom-pink / lemon-yellow palette.</p>
        </div>
      </div>
    </footer>
  );
}
