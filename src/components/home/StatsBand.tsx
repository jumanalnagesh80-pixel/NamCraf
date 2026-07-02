import { TOTAL_TEMPLATE_COUNT, formatCount } from "~/lib/templates";
import { TOTAL_GRAPHICS_COUNT } from "~/lib/graphics";
import { FONTS } from "~/lib/fonts";

const STATS = [
  { value: formatCount(TOTAL_TEMPLATE_COUNT), label: "Templates" },
  { value: formatCount(TOTAL_GRAPHICS_COUNT), label: "Graphics & shapes" },
  { value: `${FONTS.length}+`, label: "Fonts · all languages" },
  { value: "4.9★", label: "Avg. rating" },
];

export function StatsBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="glass glow grid grid-cols-2 gap-4 rounded-3xl p-6 sm:p-8 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-gradient-neon font-display text-4xl font-black sm:text-5xl">
              {s.value}
            </div>
            <div className="text-muted-foreground mt-1 text-sm font-semibold tracking-wide uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
