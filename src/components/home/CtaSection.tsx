import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { StampLogo } from "~/components/StampLogo";

export function CtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="bg-gradient-neon glow animate-gradient-move relative mx-auto flex max-w-6xl flex-col items-center overflow-hidden rounded-[2rem] px-6 py-16 text-center text-primary-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #fff 2px, transparent 2px), radial-gradient(circle at 80% 60%, #fff 2px, transparent 2px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative">
          <div className="mb-6 flex justify-center">
            <StampLogo size={56} />
          </div>
          <h2 className="font-display text-3xl font-black sm:text-5xl">
            Ready to design anything?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
            Pick a template and make it yours in minutes. Free forever — no card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/templates">
              <Button variant="accent" size="lg">
                Browse templates
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="border-white/40 text-primary-foreground hover:bg-white/10">
                Create free account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
