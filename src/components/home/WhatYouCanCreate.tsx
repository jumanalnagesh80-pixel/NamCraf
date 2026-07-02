import { Link } from "@tanstack/react-router";

interface UseCase {
  icon: string;
  title: string;
  body: string;
  to: string;
  slug?: string;
}

const USE_CASES: UseCase[] = [
  {
    icon: "📣",
    title: "Social media & marketing",
    body: "Posts, reels and ads for Instagram, TikTok & YouTube — animated banners, captions and on-brand campaigns.",
    to: "/category/$slug",
    slug: "marketing",
  },
  {
    icon: "📊",
    title: "Docs & presentations",
    body: "Interactive pitch decks, newsletters and reports with rich media, tables and clean typography.",
    to: "/category/$slug",
    slug: "presentations",
  },
  {
    icon: "🎬",
    title: "Photo & video editing",
    body: "Trim clips, resize for any platform, layer text and stickers, and repurpose long video into shorts.",
    to: "/category/$slug",
    slug: "videos",
  },
  {
    icon: "🛍️",
    title: "Digital products",
    body: "Printables, wall art, e-books and product mockups — ready to sell or ship.",
    to: "/category/$slug",
    slug: "printables",
  },
  {
    icon: "🌐",
    title: "Websites & whiteboards",
    body: "Spin up simple web pages and link-in-bio sites, or brainstorm together on infinite boards.",
    to: "/category/$slug",
    slug: "websites",
  },
  {
    icon: "🧩",
    title: "Brand & identity",
    body: "Logos, business cards, résumés and brand kits that keep every design unmistakably you.",
    to: "/category/$slug",
    slug: "logos",
  },
];

export function WhatYouCanCreate() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
          One platform, endless designs
        </span>
        <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">
          What will you create?
        </h2>
        <p className="text-muted-foreground mt-3">
          A drag-and-drop studio with AI-powered tools for anything you can imagine — no design
          experience required.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map((u) => (
          <Link
            key={u.title}
            to={u.to}
            params={u.slug ? { slug: u.slug } : undefined}
            className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:glow"
          >
            <div className="bg-gradient-neon glow animate-gradient-move mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
              {u.icon}
            </div>
            <h3 className="text-lg font-bold">{u.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{u.body}</p>
            <span className="text-gradient-neon mt-4 inline-block text-sm font-semibold">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
