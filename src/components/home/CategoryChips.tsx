import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "~/lib/templates";

/** Grid of category chips, each linking to filtered templates. */
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
          className="text-primary shrink-0 text-sm font-semibold hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to="/templates"
            search={{ category: cat.id }}
            className="group border-border bg-card hover:border-primary hover:shadow-soft flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition hover:-translate-y-1"
          >
            <span className="bg-muted group-hover:bg-accent flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition">
              {cat.icon}
            </span>
            <span className="text-sm font-semibold">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
