import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { TemplateCard } from "~/components/TemplateCard";
import { Button } from "~/components/ui/Button";
import {
  ALL_TEMPLATES,
  CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  getCategory,
  formatCount,
} from "~/lib/templates";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    const c = loaderData?.category;
    return {
      ...seo({
        path: `/category/${params.slug}`,
        title: c ? `${c.label} templates` : "Category",
        description: c
          ? `${CATEGORY_DESCRIPTIONS[c.id] ?? `Browse ${c.label} templates.`} Remix any of them in the NAMCRAFT live editor.`
          : "Browse templates by category.",
      }),
    };
  },
  component: CategoryPage,
});

const PREVIEW = 12;

function CategoryPage() {
  const { category } = Route.useLoaderData();

  const items = ALL_TEMPLATES.filter((t) => t.category === category.id);
  const preview = items.slice(0, PREVIEW);
  const others = CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-aurora pointer-events-none absolute inset-0 -z-20" />
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <div className="bg-gradient-neon glow animate-gradient-move mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
            {category.icon}
          </div>
          <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
            {formatCount(3_000_000)} templates · {category.label}
          </span>
          <h1 className="font-display mt-2 text-4xl font-black sm:text-6xl">
            {category.label} templates
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            {CATEGORY_DESCRIPTIONS[category.id]}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/templates" search={{ category: category.id }}>
              <Button size="lg" className="bg-gradient-neon glow animate-gradient-move">
                Browse all {category.label.toLowerCase()}
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="lg" className="glass">
                All categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Preview grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-black">Popular in {category.label}</h2>
          <Link
            to="/templates"
            search={{ category: category.id }}
            className="text-gradient-neon shrink-0 text-sm font-semibold hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {preview.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* Explore other categories */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display mb-5 text-xl font-black">Explore other categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {others.map((c) => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.id }}
              className="group glass flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition hover:-translate-y-1 hover:glow"
            >
              <span className="bg-gradient-neon animate-gradient-move flex h-11 w-11 items-center justify-center rounded-xl text-xl">
                {c.icon}
              </span>
              <span className="text-sm font-semibold">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
