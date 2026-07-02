const BRANDS = [
  "NOVABANK",
  "Lumen",
  "Vertex",
  "Orbit",
  "PULSE",
  "Zephyr",
  "Aster",
  "Cobalt",
  "Nimbus",
  "Prism",
  "Halo",
  "Indigo",
];

/** "Trusted by" scrolling brand strip. */
export function BrandsMarquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="py-10">
      <p className="text-muted-foreground text-center text-sm font-semibold tracking-widest uppercase">
        Trusted by fast-moving teams worldwide
      </p>
      <div className="relative mt-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent"
        />
        <div
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent"
        />
        <div className="animate-marquee flex w-max items-center gap-14 whitespace-nowrap">
          {row.map((brand, i) => (
            <span
              key={i}
              className="text-muted-foreground font-display text-2xl font-black tracking-tight opacity-70 transition hover:opacity-100"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
