import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "~/lib/templates";
import { CategoryCard } from "~/components/CategoryCard";

/** Grid of category cards (each shows a real sample design), linking to landing pages. */
export function CategoryChips() {
  const featured = CATEGORIES.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-labelledby="categories-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 id="categories-heading" className="font-display text-2xl font-black sm:text-3xl">
            What will you make today?
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Jump into a category — each with millions of ready-to-edit designs.
          </p>
        </div>
        <Link
          to="/templates"
          className="text-gradient-neon shrink-0 text-sm font-semibold hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {featured.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
