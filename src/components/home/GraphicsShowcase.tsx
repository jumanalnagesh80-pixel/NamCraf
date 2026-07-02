import { Link } from "@tanstack/react-router";
import { ShapeGraphic } from "~/components/ShapeGraphic";
import { Button } from "~/components/ui/Button";
import { SHAPES, STICKER_SETS, TOTAL_GRAPHICS_COUNT } from "~/lib/graphics";
import { formatCount, formatLakh } from "~/lib/templates";

const SHAPE_COLORS = ["#2E4BC7", "#F26E86", "#F7D94C", "#3FBFA0", "#EF9FDC", "#1E2340"];
const featuredShapes = SHAPES.slice(0, 18);
const featuredStickers = STICKER_SETS.flatMap((s) => s.emoji.slice(0, 4)).slice(0, 18);

export function GraphicsShowcase() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
            Graphics · shapes · stickers
          </span>
          <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">
            {formatLakh(TOTAL_GRAPHICS_COUNT)} graphics to drop on any design
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Add vector shapes and emoji stickers with a tap, then drag to position, resize,
            rotate and recolor. Layer them over any template to make it unmistakably yours —
            all {formatCount(TOTAL_GRAPHICS_COUNT)} of them, free.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/templates/$id" params={{ id: "social-quote" }}>
              <Button size="lg" className="bg-gradient-neon glow animate-gradient-move">
                Add graphics now
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="glass">
                Browse templates
              </Button>
            </Link>
          </div>
        </div>

        <div className="glass glow rounded-3xl p-6">
          <div className="grid grid-cols-6 gap-3">
            {featuredShapes.map((s, i) => (
              <div key={s.id} className="flex aspect-square items-center justify-center">
                <ShapeGraphic type={s.id} color={SHAPE_COLORS[i % SHAPE_COLORS.length]} size={40} />
              </div>
            ))}
          </div>
          <div className="border-border my-4 border-t" />
          <div className="grid grid-cols-6 gap-3 text-center text-3xl">
            {featuredStickers.map((e, i) => (
              <span key={`${e}-${i}`}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
