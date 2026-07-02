import { ShapeGraphic } from "./ShapeGraphic";
import { getCategoryVisual } from "~/lib/categoryVisuals";
import type { TemplateCategory } from "~/lib/templates";

/** A visual, image-like thumbnail for a category (brand gradient + shape + icon). */
export function CategoryThumb({
  category,
  showLabel = true,
  className = "",
}: {
  category: TemplateCategory;
  showLabel?: boolean;
  className?: string;
}) {
  const v = getCategoryVisual(category.id);
  const ink = v.dark ? "#1E2340" : "#FFFFFF";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ background: v.gradient, aspectRatio: "4 / 3" }}
    >
      {/* faint decorative shape */}
      <div style={{ position: "absolute", right: -18, bottom: -18, opacity: 0.22 }}>
        <ShapeGraphic type={v.shape} color={ink} size={104} />
      </div>
      <div style={{ position: "absolute", left: -16, top: -16, opacity: 0.14 }}>
        <ShapeGraphic type={v.shape} color={ink} size={64} />
      </div>

      {/* icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ fontSize: 34 }} aria-hidden="true">
          {category.icon}
        </span>
      </div>

      {/* label */}
      {showLabel && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%)",
            }}
          />
          <span
            className="absolute bottom-2 left-0 right-0 px-2 text-center text-xs font-bold"
            style={{ color: v.dark ? "#1E2340" : "#FFFFFF" }}
          >
            {category.label}
          </span>
        </>
      )}
    </div>
  );
}
