export interface Feature {
  icon: string;
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "🎨",
    title: "Studio-crafted templates",
    body: "40+ starting points across logos, posters, social, decks and more — every one fully editable.",
  },
  {
    icon: "🖌️",
    title: "Live in-browser editor",
    body: "Swap palettes, fonts and text, resize headlines and drop in your own imagery instantly.",
  },
  {
    icon: "⬇️",
    title: "Export anywhere",
    body: "Download crisp PNG or vector-friendly SVG, print, or share natively straight from the canvas.",
  },
  {
    icon: "☁️",
    title: "Cloud sync",
    body: "Sign in to save designs and favorites — they follow you across every device.",
  },
  {
    icon: "🌗",
    title: "Delightful dark mode",
    body: "A deep-berry night theme with a no-flash toggle in every header.",
  },
  {
    icon: "⚡",
    title: "Fast & accessible",
    body: "Server-rendered with TanStack Start, keyboard-friendly, and tuned for great SEO.",
  },
];

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  featured?: boolean;
  cta: string;
  features: string[];
}

export const PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything you need to start stamping.",
    cta: "Start for free",
    features: [
      "All 40+ templates",
      "Live editor",
      "PNG exports",
      "Guest saves (this device)",
      "Community support",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    price: "$12",
    cadence: "per month",
    tagline: "For makers who publish often.",
    featured: true,
    cta: "Go Studio",
    features: [
      "Everything in Free",
      "SVG + high-res PNG exports",
      "Cloud sync across devices",
      "Unlimited saved designs",
      "Background image uploads",
      "Priority support",
    ],
  },
  {
    id: "teams",
    name: "Teams",
    price: "$29",
    cadence: "per month",
    tagline: "Shared brand kits for the whole crew.",
    cta: "Start Teams",
    features: [
      "Everything in Studio",
      "Shared brand palettes",
      "Team template library",
      "Roles & permissions",
      "Centralized billing",
      "Onboarding session",
    ],
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "NAMCRAFT replaced three tools in our workflow. The stamp aesthetic makes every post feel unmistakably us.",
    name: "Ava Moreno",
    role: "Creative Director, Bloom & Co.",
    avatar: "🌸",
  },
  {
    quote:
      "I made a full pitch deck in an afternoon. Switching palettes mid-edit is genuinely magical.",
    name: "Leo Park",
    role: "Founder, Riverside Labs",
    avatar: "🚀",
  },
  {
    quote:
      "The SVG exports drop straight into our print pipeline. No more blurry logos, ever.",
    name: "Mia Chen",
    role: "Brand Designer, Freelance",
    avatar: "🎨",
  },
  {
    quote:
      "Dark mode is gorgeous and the whole thing is fast. My résumé looked hired within a week.",
    name: "Sam Taylor",
    role: "Product Designer",
    avatar: "✨",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Do I need an account to use NAMCRAFT?",
    a: "No. You can browse every template and use the full editor as a guest — your work is saved to this device. Sign in to sync designs and favorites across devices.",
  },
  {
    q: "What formats can I export?",
    a: "You can download your design as a PNG or an SVG directly from the editor. You can also print or use your device's native share sheet.",
  },
  {
    q: "Can I upload my own images?",
    a: "Yes. In the editor you can upload a background image, and layer your headline and tagline on top with adjustable colors and fonts.",
  },
  {
    q: "Is there a free plan?",
    a: "Absolutely. The Free plan includes all templates, the editor and PNG exports, forever. Studio and Teams add cloud sync, SVG exports and collaboration.",
  },
  {
    q: "How does cloud sync work?",
    a: "When you sign in, favorites and saved designs are stored securely in the cloud with row-level security, so only you can access them — on any device.",
  },
];

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  emoji: string;
}

export const JOURNAL: JournalPost[] = [
  {
    id: "brand-in-a-day",
    title: "Build a brand identity in a single afternoon",
    excerpt: "A practical, stamp-by-stamp workflow for going from blank canvas to a cohesive look.",
    category: "Branding",
    date: "2026-06-24",
    readMinutes: 6,
    emoji: "✳️",
  },
  {
    id: "color-that-converts",
    title: "Color that converts: picking a palette with intent",
    excerpt: "Why stamp blue, blossom pink and lemon yellow play so nicely — and how to make it yours.",
    category: "Design",
    date: "2026-06-10",
    readMinutes: 5,
    emoji: "🎨",
  },
  {
    id: "social-in-minutes",
    title: "A week of social posts in under an hour",
    excerpt: "Batch-create on-brand content by remixing a single template across ratios.",
    category: "Social",
    date: "2026-05-29",
    readMinutes: 4,
    emoji: "📸",
  },
];
