import { useEffect, useState } from "react";
import { TESTIMONIALS } from "~/lib/homeData";
import { cn } from "~/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [paused, count]);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-muted/40 border-border border-y"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <span className="text-secondary text-sm font-bold tracking-wide uppercase">Loved by makers</span>
        <h2 id="testimonials-heading" className="font-display mt-2 text-3xl font-black sm:text-4xl">
          Designed with delight
        </h2>

        <div
          className="border-border bg-card shadow-soft mt-10 rounded-3xl border p-8 sm:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="text-4xl" aria-hidden="true">
            {active.avatar}
          </div>
          <blockquote className="font-display mt-5 text-xl font-semibold leading-relaxed sm:text-2xl">
            “{active.quote}”
          </blockquote>
          <div className="mt-6">
            <p className="font-bold">{active.name}</p>
            <p className="text-muted-foreground text-sm">{active.role}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index ? "bg-primary w-8" : "bg-border w-2.5 hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
