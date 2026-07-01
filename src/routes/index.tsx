import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { Marquee } from "~/components/Marquee";
import { Hero } from "~/components/home/Hero";
import { CategoryChips } from "~/components/home/CategoryChips";
import { SparkGrid } from "~/components/home/SparkGrid";
import { FeaturesSection } from "~/components/home/FeaturesSection";
import { PricingSection } from "~/components/home/PricingSection";
import { Testimonials } from "~/components/home/Testimonials";
import { FaqSection } from "~/components/home/FaqSection";
import { JournalSection } from "~/components/home/JournalSection";
import { CtaSection } from "~/components/home/CtaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      path: "/",
      title: undefined,
      description:
        "Design anything with NAMCRAFT Graphic Studio — a playful, hand-crafted design platform. Browse 40+ templates and remix them in a live editor.",
    }),
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <CategoryChips />
      <SparkGrid />
      <FeaturesSection />
      <PricingSection />
      <Testimonials />
      <JournalSection />
      <FaqSection />
      <CtaSection />
    </SiteLayout>
  );
}
