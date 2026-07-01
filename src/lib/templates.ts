import { DEFAULT_FONT_ID } from "./fonts";
import { DEFAULT_PALETTE_ID } from "./palettes";

export type AspectRatio = "1:1" | "3:4" | "4:5" | "16:9";

export interface TemplateCategory {
  id: string;
  label: string;
  /** emoji used on category chips */
  icon: string;
}

export const CATEGORIES: TemplateCategory[] = [
  { id: "logos", label: "Logos", icon: "✳️" },
  { id: "posters", label: "Posters", icon: "🖼️" },
  { id: "social", label: "Social Posts", icon: "💬" },
  { id: "presentations", label: "Presentations", icon: "📊" },
  { id: "business-cards", label: "Business Cards", icon: "🪪" },
  { id: "flyers", label: "Flyers", icon: "📄" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "resumes", label: "Resumes", icon: "📝" },
];

export const RATIOS: { id: AspectRatio; label: string }[] = [
  { id: "1:1", label: "Square 1:1" },
  { id: "3:4", label: "Portrait 3:4" },
  { id: "4:5", label: "Portrait 4:5" },
  { id: "16:9", label: "Wide 16:9" },
];

export interface Template {
  id: string;
  title: string;
  category: string; // category id
  ratio: AspectRatio;
  headline: string;
  tagline: string;
  paletteId: string;
  fontId: string;
  darkText: boolean;
  popularity: number; // 0-100 for "popular" sort
  createdAt: string; // ISO date for "newest" sort
  tags: string[];
}

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function ratioToNumber(ratio: AspectRatio): number {
  const [w, h] = ratio.split(":").map(Number);
  return w / h;
}

/**
 * The studio catalog. 42 hand-crafted starting points across every category and
 * ratio. Each is a fully editable starting design in the editor.
 */
export const TEMPLATES: Template[] = [
  // ---- Logos ---------------------------------------------------------------
  { id: "logo-stamp-mark", title: "Stamp Mark Monogram", category: "logos", ratio: "1:1", headline: "NC", tagline: "NAMCRAFT · est. 2024", paletteId: "stamp", fontId: "fraunces", darkText: false, popularity: 96, createdAt: "2026-06-20", tags: ["monogram", "minimal", "brand"] },
  { id: "logo-blossom-badge", title: "Blossom Badge", category: "logos", ratio: "1:1", headline: "Bloom & Co.", tagline: "florals · gifts", paletteId: "blossom", fontId: "playfair", darkText: false, popularity: 81, createdAt: "2026-05-11", tags: ["badge", "floral"] },
  { id: "logo-lemon-circle", title: "Lemon Circle", category: "logos", ratio: "1:1", headline: "Citrus", tagline: "juice bar", paletteId: "lemon", fontId: "poppins", darkText: true, popularity: 74, createdAt: "2026-04-02", tags: ["round", "food"] },
  { id: "logo-ink-serif", title: "Ink Serif Wordmark", category: "logos", ratio: "1:1", headline: "Atelier", tagline: "design house", paletteId: "ink", fontId: "fraunces", darkText: false, popularity: 88, createdAt: "2026-06-01", tags: ["wordmark", "luxury"] },
  { id: "logo-mint-leaf", title: "Mint Leaf", category: "logos", ratio: "1:1", headline: "Verde", tagline: "plant studio", paletteId: "mint", fontId: "poppins", darkText: false, popularity: 69, createdAt: "2026-03-14", tags: ["nature", "green"] },

  // ---- Posters -------------------------------------------------------------
  { id: "poster-jazz-night", title: "Jazz Night Poster", category: "posters", ratio: "3:4", headline: "Jazz Night", tagline: "Friday · 8PM · The Blue Room", paletteId: "ink", fontId: "playfair", darkText: false, popularity: 92, createdAt: "2026-06-18", tags: ["event", "music"] },
  { id: "poster-art-fair", title: "Art Fair", category: "posters", ratio: "3:4", headline: "City Art Fair", tagline: "Sept 12–14 · Downtown", paletteId: "sunrise", fontId: "fraunces", darkText: true, popularity: 78, createdAt: "2026-05-28", tags: ["event", "art"] },
  { id: "poster-film-fest", title: "Film Festival", category: "posters", ratio: "3:4", headline: "Indie Film Fest", tagline: "10 days · 40 films", paletteId: "berry", fontId: "fraunces", darkText: false, popularity: 85, createdAt: "2026-06-09", tags: ["film", "festival"] },
  { id: "poster-sale", title: "Big Sale Poster", category: "posters", ratio: "3:4", headline: "Up to 50% Off", tagline: "This weekend only", paletteId: "blossom", fontId: "poppins", darkText: false, popularity: 71, createdAt: "2026-02-20", tags: ["sale", "retail"] },
  { id: "poster-lemonade", title: "Lemonade Stand", category: "posters", ratio: "4:5", headline: "Fresh Lemonade", tagline: "handmade daily", paletteId: "lemon", fontId: "fraunces", darkText: true, popularity: 66, createdAt: "2026-01-30", tags: ["food", "summer"] },

  // ---- Social Posts --------------------------------------------------------
  { id: "social-quote", title: "Quote Card", category: "social", ratio: "1:1", headline: "Make it happen", tagline: "— daily motivation", paletteId: "stamp", fontId: "fraunces", darkText: false, popularity: 94, createdAt: "2026-06-22", tags: ["quote", "motivation"] },
  { id: "social-announce", title: "Announcement", category: "social", ratio: "1:1", headline: "We're Live!", tagline: "New collection just dropped", paletteId: "sunrise", fontId: "poppins", darkText: true, popularity: 80, createdAt: "2026-05-19", tags: ["announcement"] },
  { id: "social-tip", title: "Quick Tip", category: "social", ratio: "4:5", headline: "Tip #1", tagline: "Batch your content weekly", paletteId: "mint", fontId: "poppins", darkText: false, popularity: 63, createdAt: "2026-03-03", tags: ["tips", "carousel"] },
  { id: "social-event", title: "Event Reminder", category: "social", ratio: "1:1", headline: "Save the Date", tagline: "Aug 3 · RSVP now", paletteId: "blossom", fontId: "playfair", darkText: false, popularity: 77, createdAt: "2026-04-27", tags: ["event"] },
  { id: "social-thankyou", title: "Thank You Post", category: "social", ratio: "1:1", headline: "Thank You!", tagline: "10k strong and counting", paletteId: "berry", fontId: "fraunces", darkText: false, popularity: 72, createdAt: "2026-05-06", tags: ["milestone"] },

  // ---- Presentations -------------------------------------------------------
  { id: "pres-title", title: "Pitch Title Slide", category: "presentations", ratio: "16:9", headline: "The Big Idea", tagline: "Series A · 2026", paletteId: "stamp", fontId: "poppins", darkText: false, popularity: 90, createdAt: "2026-06-15", tags: ["pitch", "startup"] },
  { id: "pres-section", title: "Section Divider", category: "presentations", ratio: "16:9", headline: "01 · Overview", tagline: "Where we are today", paletteId: "ink", fontId: "fraunces", darkText: false, popularity: 68, createdAt: "2026-04-11", tags: ["divider"] },
  { id: "pres-stat", title: "Stat Highlight", category: "presentations", ratio: "16:9", headline: "3.2× Growth", tagline: "year over year", paletteId: "lemon", fontId: "poppins", darkText: true, popularity: 75, createdAt: "2026-05-02", tags: ["metrics"] },
  { id: "pres-quote", title: "Customer Quote", category: "presentations", ratio: "16:9", headline: "\u201CGame changer\u201D", tagline: "— a very happy client", paletteId: "sunrise", fontId: "playfair", darkText: true, popularity: 64, createdAt: "2026-03-22", tags: ["testimonial"] },
  { id: "pres-thanks", title: "Closing Slide", category: "presentations", ratio: "16:9", headline: "Thank You", tagline: "questions?", paletteId: "berry", fontId: "fraunces", darkText: false, popularity: 60, createdAt: "2026-02-14", tags: ["closing"] },

  // ---- Business Cards ------------------------------------------------------
  { id: "card-classic", title: "Classic Card", category: "business-cards", ratio: "16:9", headline: "Ava Moreno", tagline: "Creative Director", paletteId: "cream", fontId: "fraunces", darkText: true, popularity: 83, createdAt: "2026-06-04", tags: ["minimal"] },
  { id: "card-bold", title: "Bold Card", category: "business-cards", ratio: "16:9", headline: "Leo Park", tagline: "Founder · NAMCRAFT", paletteId: "stamp", fontId: "poppins", darkText: false, popularity: 79, createdAt: "2026-05-16", tags: ["bold"] },
  { id: "card-blossom", title: "Blossom Card", category: "business-cards", ratio: "16:9", headline: "Mia Chen", tagline: "Florist & Stylist", paletteId: "blossom", fontId: "playfair", darkText: false, popularity: 61, createdAt: "2026-03-08", tags: ["floral"] },
  { id: "card-mono", title: "Mono Card", category: "business-cards", ratio: "16:9", headline: "J. Rivera", tagline: "Software Engineer", paletteId: "ink", fontId: "mono", darkText: false, popularity: 58, createdAt: "2026-01-19", tags: ["tech"] },

  // ---- Flyers --------------------------------------------------------------
  { id: "flyer-workshop", title: "Workshop Flyer", category: "flyers", ratio: "3:4", headline: "Design Workshop", tagline: "Learn branding in a day", paletteId: "sunrise", fontId: "poppins", darkText: true, popularity: 82, createdAt: "2026-06-12", tags: ["education"] },
  { id: "flyer-market", title: "Market Day", category: "flyers", ratio: "3:4", headline: "Farmers Market", tagline: "Every Sunday · 9–2", paletteId: "mint", fontId: "fraunces", darkText: false, popularity: 70, createdAt: "2026-04-18", tags: ["community"] },
  { id: "flyer-gig", title: "Live Gig", category: "flyers", ratio: "4:5", headline: "Live Music", tagline: "Saturday · free entry", paletteId: "berry", fontId: "poppins", darkText: false, popularity: 67, createdAt: "2026-03-29", tags: ["music"] },
  { id: "flyer-grand-open", title: "Grand Opening", category: "flyers", ratio: "3:4", headline: "Now Open", tagline: "Come say hello 👋", paletteId: "lemon", fontId: "fraunces", darkText: true, popularity: 73, createdAt: "2026-05-24", tags: ["retail"] },

  // ---- Instagram -----------------------------------------------------------
  { id: "ig-story", title: "Story Cover", category: "instagram", ratio: "3:4", headline: "New Post", tagline: "swipe up ↑", paletteId: "blossom", fontId: "poppins", darkText: false, popularity: 89, createdAt: "2026-06-19", tags: ["story"] },
  { id: "ig-carousel", title: "Carousel Cover", category: "instagram", ratio: "4:5", headline: "5 Design Tips", tagline: "save this post", paletteId: "stamp", fontId: "fraunces", darkText: false, popularity: 86, createdAt: "2026-06-07", tags: ["carousel"] },
  { id: "ig-grid", title: "Grid Post", category: "instagram", ratio: "1:1", headline: "Behind the Scenes", tagline: "studio diaries", paletteId: "cream", fontId: "playfair", darkText: true, popularity: 65, createdAt: "2026-04-09", tags: ["bts"] },
  { id: "ig-reels", title: "Reels Cover", category: "instagram", ratio: "3:4", headline: "Watch This", tagline: "tap to play ▶", paletteId: "sunrise", fontId: "poppins", darkText: true, popularity: 76, createdAt: "2026-05-13", tags: ["video"] },
  { id: "ig-promo", title: "Promo Post", category: "instagram", ratio: "4:5", headline: "Flash Sale", tagline: "24 hours only", paletteId: "lemon", fontId: "poppins", darkText: true, popularity: 84, createdAt: "2026-06-11", tags: ["sale"] },

  // ---- Resumes -------------------------------------------------------------
  { id: "resume-modern", title: "Modern Resume", category: "resumes", ratio: "3:4", headline: "Sam Taylor", tagline: "Product Designer", paletteId: "cream", fontId: "poppins", darkText: true, popularity: 87, createdAt: "2026-06-16", tags: ["clean"] },
  { id: "resume-bold-header", title: "Bold Header CV", category: "resumes", ratio: "3:4", headline: "Priya N.", tagline: "Marketing Lead", paletteId: "stamp", fontId: "fraunces", darkText: false, popularity: 72, createdAt: "2026-05-01", tags: ["header"] },
  { id: "resume-serif", title: "Serif Résumé", category: "resumes", ratio: "3:4", headline: "Daniel Cruz", tagline: "Editor & Writer", paletteId: "ink", fontId: "playfair", darkText: false, popularity: 62, createdAt: "2026-03-17", tags: ["editorial"] },
  { id: "resume-mint", title: "Fresh Résumé", category: "resumes", ratio: "3:4", headline: "Nora Vale", tagline: "UX Researcher", paletteId: "mint", fontId: "poppins", darkText: false, popularity: 59, createdAt: "2026-02-05", tags: ["fresh"] },

  // ---- A few extras to round out ratios ------------------------------------
  { id: "poster-concert-wide", title: "Concert Banner", category: "posters", ratio: "16:9", headline: "Summer Sounds", tagline: "July 20 · Riverside Park", paletteId: "sunrise", fontId: "fraunces", darkText: true, popularity: 80, createdAt: "2026-06-14", tags: ["banner", "music"] },
  { id: "social-poll", title: "Poll Post", category: "social", ratio: "4:5", headline: "This or That?", tagline: "vote in comments", paletteId: "blossom", fontId: "poppins", darkText: false, popularity: 68, createdAt: "2026-04-23", tags: ["engagement"] },
  { id: "ig-quote-square", title: "Quote Square", category: "instagram", ratio: "1:1", headline: "Stay Curious", tagline: "words to live by", paletteId: "berry", fontId: "fraunces", darkText: false, popularity: 71, createdAt: "2026-05-09", tags: ["quote"] },
  { id: "flyer-food-menu", title: "Food Menu", category: "flyers", ratio: "4:5", headline: "Today's Menu", tagline: "fresh · local · seasonal", paletteId: "cream", fontId: "fraunces", darkText: true, popularity: 64, createdAt: "2026-03-26", tags: ["menu", "food"] },
  { id: "pres-agenda", title: "Agenda Slide", category: "presentations", ratio: "16:9", headline: "Today's Agenda", tagline: "3 things to cover", paletteId: "mint", fontId: "poppins", darkText: false, popularity: 57, createdAt: "2026-02-28", tags: ["agenda"] },
];

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

// Sanity defaults are re-exported for the editor's "reset" flow.
export const EDITOR_DEFAULTS = {
  paletteId: DEFAULT_PALETTE_ID,
  fontId: DEFAULT_FONT_ID,
};
