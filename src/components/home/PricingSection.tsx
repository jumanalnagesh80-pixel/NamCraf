import { Link } from "@tanstack/react-router";
import { PRICING } from "~/lib/homeData";
import { Button } from "~/components/ui/Button";
import { cn } from "~/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-secondary text-sm font-bold tracking-wide uppercase">Pricing</span>
        <h2 className="font-display mt-2 text-3xl font-black sm:text-4xl">
          Simple plans, no surprises
        </h2>
        <p className="text-muted-foreground mt-3">
          Start free forever. Upgrade when you're ready to sync and collaborate.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PRICING.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative flex flex-col rounded-3xl border p-7 transition",
              tier.featured
                ? "border-primary glass glow scale-[1.03]"
                : "border-border glass shadow-soft",
            )}
          >
            {tier.featured && (
              <span className="bg-gradient-stamp text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-wide uppercase">
                Most popular
              </span>
            )}
            <h3 className="font-display text-2xl font-black">{tier.name}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{tier.tagline}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-black">{tier.price}</span>
              <span className="text-muted-foreground text-sm">/ {tier.cadence}</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Link to="/auth" className="mt-7">
              <Button
                variant={tier.featured ? "primary" : "outline"}
                size="lg"
                className="w-full"
              >
                {tier.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
