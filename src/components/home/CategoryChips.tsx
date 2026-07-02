import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "~/lib/templates";
import { CategoryThumb } from "~/components/CategoryThumb";

/** Grid of category thumbnails, each linking to its landing page. */
export function CategoryChips() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-labelledby="categories-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 id="categories-heading" className="font-display text-2xl font-black sm:text-3xl">
            What will you make today?
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Jump straight into a category.</p>
        </div>
        <Link
          to="/templates"
          className="text-gradient-neon shrink-0 text-sm font-semibold hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to="/category/$slug"
            params={{ slug: cat.id }}
            aria-label={`${cat.label} templates`}
            className="group block transition hover:-translate-y-1"
          >
            <CategoryThumb category={cat} className="shadow-soft group-hover:shadow-stamp" />
          </Link>
        ))}
      </div>
    </section>
  );
}
