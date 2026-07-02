const STEPS = [
  {
    n: "01",
    icon: "🔍",
    title: "Search the multiverse",
    body: "Type what you need and dive into millions of templates across every category and ratio.",
  },
  {
    n: "02",
    icon: "🪄",
    title: "Remix it live",
    body: "Swap palettes and fonts, rewrite the copy, resize, and drop in your own imagery — instantly.",
  },
  {
    n: "03",
    icon: "🚀",
    title: "Export & launch",
    body: "Download crisp PNG or SVG, print, share, or save to the cloud and pick up on any device.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-gradient-neon text-sm font-bold tracking-wide uppercase">
          How it works
        </span>
        <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">
          From idea to export in three moves
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.n} className="glass glow relative overflow-hidden rounded-3xl p-7">
            <span className="text-gradient-neon font-display absolute right-5 top-3 text-6xl font-black opacity-20">
              {step.n}
            </span>
            <div className="bg-gradient-neon glow animate-gradient-move mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
