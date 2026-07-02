import { Link } from "@tanstack/react-router";
import { DesignCanvas } from "./DesignCanvas";
import { defaultDesign } from "~/lib/designStore";
import { sampleTemplateForCategory, type TemplateCategory } from "~/lib/templates";
import { getCategoryVisual } from "~/lib/categoryVisuals";

/** A category tile that shows a real sample design from that category. */
export function CategoryCard({ category }: { category: TemplateCategory }) {
  const t = sampleTemplateForCategory(category.id);
  const visual = getCategoryVisual(category.id);

  const design = defaultDesign({
    headline: t?.headline || category.label,
    tagline: t?.tagline || "",
    paletteId: t?.paletteId ?? "stamp",
    fontId: t?.fontId ?? "fraunces",
    darkText: t?.darkText ?? false,
    headlineSize: 120,
  });

  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.id }}
      aria-label={`${category.label} templates`}
      className="group border-border shadow-soft block overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-stamp"
    >
      <DesignCanvas ratio="4:5" design={design} eyebrow={category.label} rounded={false} />
      <div className="bg-card flex items-center gap-2 px-3 py-2.5">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-md text-sm"
          style={{ background: visual.gradient }}
          aria-hidden="true"
        >
          {category.icon}
        </span>
        <span className="truncate text-sm font-semibold">{category.label}</span>
      </div>
    </Link>
  );
}
