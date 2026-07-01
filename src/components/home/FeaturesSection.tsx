import { FEATURES } from "~/lib/homeData";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-muted/40 border-border border-y">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-secondary text-sm font-bold tracking-wide uppercase">
            Why NAMCRAFT
          </span>
          <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">
            A whole studio, in your browser
          </h2>
          <p className="text-muted-foreground mt-3">
            Everything you need to design, remix and ship — with a little hand-crafted charm.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="border-border bg-card shadow-soft rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-stamp"
            >
              <span className="bg-accent text-accent-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                {f.icon}
              </span>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
