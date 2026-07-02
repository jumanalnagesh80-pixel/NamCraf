import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { Marquee } from "~/components/Marquee";
import { Hero } from "~/components/home/Hero";
import { StatsBand } from "~/components/home/StatsBand";
import { StartFromScratch } from "~/components/home/StartFromScratch";
import { BrandsMarquee } from "~/components/home/BrandsMarquee";
import { CategoryChips } from "~/components/home/CategoryChips";
import { WhatYouCanCreate } from "~/components/home/WhatYouCanCreate";
import { SparkGrid } from "~/components/home/SparkGrid";
import { GraphicsShowcase } from "~/components/home/GraphicsShowcase";
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
        "NAMCRAFT is a free-to-use, drag-and-drop online design platform with AI-powered tools. Create social posts, videos, presentations, websites, docs, logos, printables and more from 4M+ templates. Remix live in your browser — no download, no signup.",
    }),
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <StatsBand />
      <StartFromScratch />
      <BrandsMarquee />
      <CategoryChips />
      <WhatYouCanCreate />
      <SparkGrid />
      <GraphicsShowcase />
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
