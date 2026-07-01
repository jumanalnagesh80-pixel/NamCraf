import { useState } from "react";
import { FAQS } from "~/lib/homeData";
import { cn } from "~/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-secondary text-sm font-bold tracking-wide uppercase">FAQ</span>
        <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">Good questions</h2>
      </div>

      <div className="mt-10 space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="border-border bg-card overflow-hidden rounded-2xl border"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="hover:bg-muted flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition"
              >
                <span>{faq.q}</span>
                <span
                  className={cn(
                    "text-primary shrink-0 text-xl transition-transform",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
