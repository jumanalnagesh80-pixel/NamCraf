const TOOLS = [
  { icon: "🪄", title: "Magic Resize", body: "Reflow any design across 1:1, 3:4, 4:5 and 16:9 in a single tap." },
  { icon: "🎨", title: "Smart Palette", body: "Instantly recolor with curated, on-brand palettes generated for you." },
  { icon: "✂️", title: "Background Studio", body: "Drop in your own imagery and layer crisp, legible type on top." },
  { icon: "🔤", title: "Font Intelligence", body: "Pair display and body fonts that always look considered." },
  { icon: "🧩", title: "Brand Kits", body: "Save colors, fonts and logos so every export stays consistent." },
  { icon: "⚡", title: "One-tap Export", body: "PNG, SVG, print and native share — no round-trips, no waiting." },
];

export function AiTools() {
  return (
    <section id="ai" className="scroll-mt-20 relative overflow-hidden">
      <div aria-hidden="true" className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
            AI-powered toolkit
          </span>
          <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">
            Superpowers built into every canvas
          </h2>
          <p className="text-muted-foreground mt-3">
            The studio does the heavy lifting so you can focus on the idea.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <div
              key={t.title}
              className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:glow"
            >
              <div className="bg-gradient-neon glow animate-gradient-move mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
                {t.icon}
              </div>
              <h3 className="text-lg font-bold">{t.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
