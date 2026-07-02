import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { Marquee } from "~/components/Marquee";
import { Hero } from "~/components/home/Hero";
import { StatsBand } from "~/components/home/StatsBand";
import { BrandsMarquee } from "~/components/home/BrandsMarquee";
import { CategoryChips } from "~/components/home/CategoryChips";
import { SparkGrid } from "~/components/home/SparkGrid";
import { HowItWorks } from "~/components/home/HowItWorks";
import { AiTools } from "~/components/home/AiTools";
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
        "NAMCRAFT is a free-to-use online graphic design tool. Design anything from 3M+ templates — logos, posters, social posts, presentations, résumés and more. Remix them live in your browser and export in seconds. No download, no signup.",
    }),
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <StatsBand />
      <BrandsMarquee />
      <CategoryChips />
      <SparkGrid />
      <HowItWorks />
      <AiTools />
      <Marquee />
      <FeaturesSection />
      <PricingSection />
      <Testimonials />
      <JournalSection />
      <FaqSection />
      <CtaSection />
    </SiteLayout>
  );
}
