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
  { id: "social", label: "Social Posts", icon: "💬" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "videos", label: "Videos", icon: "🎬" },
  { id: "presentations", label: "Presentations", icon: "📊" },
  { id: "websites", label: "Websites", icon: "🌐" },
  { id: "whiteboards", label: "Whiteboards", icon: "🧠" },
  { id: "docs", label: "Docs", icon: "📑" },
  { id: "logos", label: "Logos", icon: "✳️" },
  { id: "posters", label: "Posters", icon: "🖼️" },
  { id: "flyers", label: "Flyers", icon: "📄" },
  { id: "business-cards", label: "Business Cards", icon: "🪪" },
  { id: "resumes", label: "Resumes", icon: "📝" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "printables", label: "Printables", icon: "🖨️" },
  { id: "mockups", label: "Mockups", icon: "📱" },
  { id: "ebooks", label: "E-books", icon: "📚" },
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

export function getCategory(id: string): TemplateCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/** Short marketing blurb per category, used on category landing pages. */
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  logos: "Craft a memorable mark. Monograms, badges and wordmarks that scale from favicon to billboard.",
  posters: "Stop the scroll and fill the wall. Bold, high-impact posters for every event and campaign.",
  social: "Show up on every feed. On-brand posts, quotes and announcements sized for social.",
  presentations: "Pitch with polish. Title slides, dividers and stat highlights that command the room.",
  "business-cards": "Make the handshake count. Clean, confident cards that put your name front and centre.",
  flyers: "Spread the word. Eye-catching flyers for openings, workshops, markets and gigs.",
  instagram: "Own the grid. Stories, carousels and reel covers designed to stop thumbs.",
  resumes: "Get hired in style. Modern, recruiter-friendly résumés that read as clearly as they look.",
  videos: "Make it move. Reels, shorts and animated posts — trim, caption and export video-ready designs.",
  websites: "Ship a page today. Simple, striking landing pages and link-in-bio sites, no code needed.",
  whiteboards: "Think together. Infinite whiteboards for brainstorms, planning and team workshops.",
  docs: "Write it beautifully. Interactive docs, reports and newsletters with rich media and tables.",
  marketing: "Convert more. Ads, banners and campaigns tuned to grab attention and drive clicks.",
  printables: "Print at home. Wall art, planners, invitations and printables ready for any printer.",
  mockups: "Show it in context. Device and product mockups that make your work look shipped.",
  ebooks: "Package your knowledge. Polished e-book and lead-magnet covers and interiors.",
};

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

/** Curated, hand-crafted templates (used for the "featured" / spark grids). */
export const CURATED_TEMPLATES = TEMPLATES;

// ============================================================================
// Procedural catalog — a 3,000,000+ (30 lakh+) template universe.
//
// We can't materialize three million objects, so templates are *generated
// deterministically from an integer index*. Any id `gen-<n>` reconstructs the
// exact same template every time, so links, the editor, favorites and saved
// designs all work across the entire virtual catalog. The library materializes
// a large browsable pool and paginates through it.
// ============================================================================

/** Marketing / catalog size claim shown across the UI. */
export const TOTAL_TEMPLATE_COUNT = 4_000_000;

/** How many procedural templates to keep in memory for browsing/filtering. */
export const GEN_POOL_SIZE = 6000;

const PALETTE_IDS = ["stamp", "sunrise", "cream", "berry", "blossom", "lemon", "ink", "mint"];
const FONT_IDS = ["fraunces", "poppins", "playfair", "georgia", "mono", "system"];
const ALL_RATIOS: AspectRatio[] = ["1:1", "3:4", "4:5", "16:9"];
const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

const BRAND_WORDS = [
  "Nova", "Vertex", "Lumen", "Bloom", "Orbit", "Pulse", "Vela", "Zephyr", "Aster", "Quill",
  "Ember", "Halo", "Onyx", "Sage", "Coral", "Flux", "Prism", "Nimbus", "Cobalt", "Wren",
  "Solace", "Atlas", "Echo", "Indigo", "Juno", "Kepler", "Lyra", "Muse", "Nordic", "Opal",
];
const BRAND_SUFFIX = ["Studio", "Labs", "Co.", "Atelier", "Collective", "Works", "Agency", "Group", "& Co.", "Design"];
const POSTER_TITLES = ["Neon Nights", "Aurora Fest", "Synthwave Live", "Gallery Opening", "Night Market", "Design Week", "Poetry Slam", "Sound Waves", "Future Fair", "City Lights"];
const SOCIAL_LINES = ["Make it happen", "Stay curious", "Big news is coming", "We're live now", "New drop today", "Dream bigger", "Level up", "Good vibes only", "You've got this", "Create the future"];
const PRES_TITLES = ["The Big Idea", "Q3 Review", "Roadmap 2027", "Our Mission", "Key Metrics", "Case Study", "Vision Deck", "Growth Plan", "Product Update", "Team Sync"];
const PEOPLE = ["Ava Moreno", "Leo Park", "Mia Chen", "Sam Taylor", "Priya Nair", "Daniel Cruz", "Nora Vale", "Kai Wu", "Ines Rossi", "Omar Said"];
const ROLES = ["Creative Director", "Founder & CEO", "Product Designer", "AI Engineer", "Growth Lead", "Photographer", "Writer", "Consultant", "Digital Artist", "Brand Strategist"];
const FLYER_TITLES = ["Grand Opening", "Live Workshop", "Weekend Market", "Live Music", "Launch Party", "Pop-up Shop", "Charity Run", "Open House", "Game Night", "Meetup"];
const IG_TITLES = ["Watch this", "5 quick tips", "Behind the scenes", "Save this post", "New post", "Tap to play", "This or that?", "Ask me anything", "Big giveaway", "Swipe up"];

function pick<T>(arr: T[], n: number): T {
  return arr[((n % arr.length) + arr.length) % arr.length];
}

// A small deterministic hash so different fields vary independently.
function hash(n: number, salt: number): number {
  let x = (n + 1) * (salt * 2654435761);
  x = (x ^ (x >>> 15)) >>> 0;
  return x;
}

function contentFor(category: string, n: number): { title: string; headline: string; tagline: string; tags: string[] } {
  switch (category) {
    case "logos": {
      const name = pick(BRAND_WORDS, hash(n, 3));
      const suffix = pick(BRAND_SUFFIX, hash(n, 5));
      return { title: `${name} ${suffix} Logo`, headline: name, tagline: `${suffix} · est. 2026`, tags: ["logo", "brand", "monogram"] };
    }
    case "posters": {
      const t = pick(POSTER_TITLES, hash(n, 3));
      return { title: `${t} Poster`, headline: t, tagline: `Fri · 8PM · Hall ${1 + (hash(n, 7) % 9)}`, tags: ["poster", "event"] };
    }
    case "social": {
      const t = pick(SOCIAL_LINES, hash(n, 3));
      return { title: `${t} · Social`, headline: t, tagline: "@namcraft.studio", tags: ["social", "post"] };
    }
    case "presentations": {
      const t = pick(PRES_TITLES, hash(n, 3));
      return { title: `${t} Slide`, headline: t, tagline: "NAMCRAFT · 2026", tags: ["slide", "deck"] };
    }
    case "business-cards": {
      const p = pick(PEOPLE, hash(n, 3));
      const r = pick(ROLES, hash(n, 5));
      return { title: `${p} Card`, headline: p, tagline: r, tags: ["card", "identity"] };
    }
    case "flyers": {
      const t = pick(FLYER_TITLES, hash(n, 3));
      return { title: `${t} Flyer`, headline: t, tagline: "Sat · free entry", tags: ["flyer", "promo"] };
    }
    case "instagram": {
      const t = pick(IG_TITLES, hash(n, 3));
      return { title: `${t} · IG`, headline: t, tagline: "double-tap ❤", tags: ["instagram", "story"] };
    }
    case "resumes": {
      const p = pick(PEOPLE, hash(n, 3));
      const r = pick(ROLES, hash(n, 5));
      return { title: `${p} Résumé`, headline: p, tagline: r, tags: ["resume", "cv"] };
    }
    case "videos": {
      const t = pick(SOCIAL_LINES, hash(n, 3));
      return { title: `${t} · Video`, headline: t, tagline: "▶ tap to play", tags: ["video", "reel", "short"] };
    }
    case "websites": {
      const name = pick(BRAND_WORDS, hash(n, 3));
      return { title: `${name} Landing Page`, headline: name, tagline: "build something people love", tags: ["website", "landing"] };
    }
    case "whiteboards": {
      const t = pick(PRES_TITLES, hash(n, 5));
      return { title: `${t} Whiteboard`, headline: t, tagline: "brainstorm · plan · align", tags: ["whiteboard", "team"] };
    }
    case "docs": {
      const t = pick(PRES_TITLES, hash(n, 7));
      return { title: `${t} Doc`, headline: t, tagline: "a clean, shareable document", tags: ["doc", "report"] };
    }
    case "marketing": {
      const t = pick(SOCIAL_LINES, hash(n, 5));
      return { title: `${t} Ad`, headline: t, tagline: "shop now →", tags: ["ad", "marketing", "banner"] };
    }
    case "printables": {
      const t = pick(POSTER_TITLES, hash(n, 5));
      return { title: `${t} Printable`, headline: t, tagline: "print at home · A4", tags: ["printable", "wall art"] };
    }
    case "mockups": {
      const name = pick(BRAND_WORDS, hash(n, 5));
      return { title: `${name} Mockup`, headline: name, tagline: "product · preview", tags: ["mockup", "product"] };
    }
    case "ebooks": {
      const t = pick(PRES_TITLES, hash(n, 9));
      return { title: `${t} E-book`, headline: t, tagline: "a NAMCRAFT guide", tags: ["ebook", "cover"] };
    }
    default:
      return { title: `Design ${n}`, headline: "Your headline", tagline: "Your tagline", tags: ["design"] };
  }
}

/** Reconstruct a procedural template from its integer index. Fully deterministic. */
export function generateTemplate(index: number): Template {
  const category = pick(CATEGORY_IDS, index);
  const wide = ["videos", "presentations", "websites", "whiteboards", "business-cards", "marketing"];
  const portrait = ["docs", "ebooks", "printables", "resumes", "mockups"];
  const ratio: AspectRatio = wide.includes(category)
    ? "16:9"
    : portrait.includes(category)
      ? pick(["3:4", "4:5"] as AspectRatio[], hash(index, 11))
      : pick(ALL_RATIOS, hash(index, 11));
  const paletteId = pick(PALETTE_IDS, hash(index, 13));
  const fontId = pick(FONT_IDS, hash(index, 17));
  const darkText = paletteId === "cream" || paletteId === "lemon";
  const { title, headline, tagline, tags } = contentFor(category, index);

  const daysAgo = hash(index, 19) % 900;
  const createdAt = new Date(Date.UTC(2026, 5, 1) - daysAgo * 86_400_000)
    .toISOString()
    .slice(0, 10);

  return {
    id: `gen-${index}`,
    title,
    category,
    ratio,
    headline,
    tagline,
    paletteId,
    fontId,
    darkText,
    popularity: 30 + (hash(index, 23) % 70),
    createdAt,
    tags,
  };
}

/** A large materialized pool of procedural templates for browsing/filtering. */
export const GENERATED_TEMPLATES: Template[] = Array.from({ length: GEN_POOL_SIZE }, (_, i) =>
  generateTemplate(i),
);

/** Everything browsable in the library: curated first, then the generated pool. */
export const ALL_TEMPLATES: Template[] = [...CURATED_TEMPLATES, ...GENERATED_TEMPLATES];

const GEN_ID_RE = /^gen-(\d+)$/;

export interface BlankPreset {
  id: string;
  label: string;
  icon: string;
  ratio: AspectRatio;
  category: string;
  dims: string;
}

/** Start-from-scratch presets ("new document" flow). */
export const BLANK_PRESETS: BlankPreset[] = [
  { id: "blank-ig-post", label: "Instagram Post", icon: "📸", ratio: "1:1", category: "instagram", dims: "1080 × 1080" },
  { id: "blank-story", label: "Story", icon: "📱", ratio: "3:4", category: "social", dims: "1080 × 1440" },
  { id: "blank-presentation", label: "Presentation", icon: "📊", ratio: "16:9", category: "presentations", dims: "1920 × 1080" },
  { id: "blank-poster", label: "Poster", icon: "🖼️", ratio: "3:4", category: "posters", dims: "1080 × 1440" },
  { id: "blank-doc", label: "Document (A4)", icon: "📄", ratio: "3:4", category: "docs", dims: "A4" },
  { id: "blank-thumbnail", label: "YouTube Thumbnail", icon: "🎬", ratio: "16:9", category: "videos", dims: "1280 × 720" },
  { id: "blank-logo", label: "Logo", icon: "✳️", ratio: "1:1", category: "logos", dims: "1080 × 1080" },
  { id: "blank-banner", label: "Banner / Ad", icon: "📣", ratio: "16:9", category: "marketing", dims: "1920 × 1080" },
];

function blankTemplate(preset: BlankPreset): Template {
  return {
    id: preset.id,
    title: `Blank ${preset.label}`,
    category: preset.category,
    ratio: preset.ratio,
    headline: "",
    tagline: "",
    paletteId: "cream",
    fontId: "poppins",
    darkText: true,
    popularity: 0,
    createdAt: "2026-06-01",
    tags: ["blank", "custom"],
  };
}

export function getTemplate(id: string): Template | undefined {
  const curated = TEMPLATES.find((t) => t.id === id);
  if (curated) return curated;
  const m = GEN_ID_RE.exec(id);
  if (m) return generateTemplate(Number(m[1]));
  if (id.startsWith("blank-")) {
    const preset = BLANK_PRESETS.find((p) => p.id === id);
    return blankTemplate(preset ?? BLANK_PRESETS[0]);
  }
  return undefined;
}

/** A representative template for a category (prefers a curated one). */
export function sampleTemplateForCategory(id: string): Template | undefined {
  return ALL_TEMPLATES.find((t) => t.category === id);
}

/** Human-friendly big-number formatting, e.g. 3000000 -> "3M+". */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K+`;
  return String(n);
}

/** Indian-format count, e.g. 3000000 -> "30 Lakh+". */
export function formatLakh(n: number): string {
  if (n >= 100_000) return `${Math.floor(n / 100_000)} Lakh+`;
  return String(n);
}

// Sanity defaults are re-exported for the editor's "reset" flow.
export const EDITOR_DEFAULTS = {
  paletteId: DEFAULT_PALETTE_ID,
  fontId: DEFAULT_FONT_ID,
};
