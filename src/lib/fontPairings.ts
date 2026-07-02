/**
 * Curated font-pairing engine (Starter Packs).
 *
 * Every template category maps to a "font pack" — a small set of hand-picked
 * heading + body combinations that always look *designed*, never random. When a
 * user opens a template, the editor auto-populates the heading + body font from
 * the pack's default pair (still fully editable). The "Shuffle Fonts" button
 * cycles through the pack's alternate pairs.
 *
 * This whole file is a data-driven config table: `FONT_PACKS` + `CATEGORY_TO_PACK`
 * can be edited to add/adjust pairings without touching the editor code. In a
 * later phase these move into a DB table (category_id → font_pair_list).
 */
import { DEFAULT_BODY_FONT_ID, DEFAULT_FONT_ID, isKnownFont } from "./fonts";

export interface FontPair {
  id: string;
  /** heading / display font id (see fonts.ts) */
  headingFontId: string;
  /** body / supporting-copy font id */
  bodyFontId: string;
  /** short mood description shown in the UI */
  mood: string;
}

export interface FontPack {
  id: string;
  label: string;
  /** the pack's overall vibe */
  mood: string;
  /** first pair is the default; the rest are the "shuffle" alternates */
  pairs: FontPair[];
}

/** A user's saved brand fonts (from their Brand Kit). Both optional. */
export interface BrandKitFonts {
  headingFontId?: string;
  bodyFontId?: string;
}

function pair(id: string, headingFontId: string, bodyFontId: string, mood: string): FontPair {
  return { id, headingFontId, bodyFontId, mood };
}

/**
 * The curated starter packs. The first pair in each pack is the default that
 * auto-populates; the remaining pairs are the "Shuffle Fonts" alternates
 * (3–5 per pack, always designed combos).
 */
export const FONT_PACKS: Record<string, FontPack> = {
  wedding: {
    id: "wedding",
    label: "Wedding / Invitation",
    mood: "elegant, romantic",
    pairs: [
      pair("wedding-0", "playfair", "cormorant-garamond", "elegant, romantic"),
      pair("wedding-1", "great-vibes", "cormorant-garamond", "script, dreamy"),
      pair("wedding-2", "cormorant", "work-sans", "clean, editorial"),
      pair("wedding-3", "fraunces", "lato", "warm, refined"),
    ],
  },
  corporate: {
    id: "corporate",
    label: "Business / Corporate",
    mood: "clean, professional",
    pairs: [
      pair("corporate-0", "montserrat", "source-sans", "clean, professional"),
      pair("corporate-1", "poppins", "work-sans", "modern, approachable"),
      pair("corporate-2", "inter", "roboto", "neutral, techy"),
      pair("corporate-3", "space", "inter", "sharp, modern"),
    ],
  },
  resume: {
    id: "resume",
    label: "Resume / CV",
    mood: "modern, readable",
    pairs: [
      pair("resume-0", "poppins", "lato", "modern, readable"),
      pair("resume-1", "montserrat", "karla", "structured, clean"),
      pair("resume-2", "work-sans", "source-sans", "quiet, professional"),
      pair("resume-3", "inter", "roboto", "neutral, crisp"),
    ],
  },
  socialCasual: {
    id: "socialCasual",
    label: "Social Post (casual)",
    mood: "friendly, playful",
    pairs: [
      pair("socialCasual-0", "baloo", "nunito", "friendly, playful"),
      pair("socialCasual-1", "poppins", "nunito", "rounded, upbeat"),
      pair("socialCasual-2", "fredoka", "karla", "bubbly, casual"),
      pair("socialCasual-3", "montserrat", "nunito", "clean, cheerful"),
    ],
  },
  posterEvent: {
    id: "posterEvent",
    label: "Poster / Event",
    mood: "bold, high-impact",
    pairs: [
      pair("posterEvent-0", "bebas", "roboto", "bold, high-impact"),
      pair("posterEvent-1", "anton", "inter", "loud, punchy"),
      pair("posterEvent-2", "oswald", "work-sans", "condensed, strong"),
      pair("posterEvent-3", "archivo", "lato", "heavy, modern"),
    ],
  },
  festival: {
    id: "festival",
    label: "Festival / Greeting",
    mood: "festive, warm",
    pairs: [
      pair("festival-0", "great-vibes", "mukta", "festive, warm"),
      pair("festival-1", "lobster", "karla", "retro, joyful"),
      pair("festival-2", "pacifico", "nunito", "playful, warm"),
      pair("festival-3", "abril-fatface", "lato", "celebratory, bold"),
    ],
  },
  thumbnail: {
    id: "thumbnail",
    label: "YouTube Thumbnail",
    mood: "loud, punchy",
    pairs: [
      pair("thumbnail-0", "anton", "inter", "loud, punchy"),
      pair("thumbnail-1", "bebas", "roboto", "high-impact"),
      pair("thumbnail-2", "archivo", "work-sans", "heavy, modern"),
      pair("thumbnail-3", "oswald", "inter", "condensed, bold"),
    ],
  },
  minimalPortfolio: {
    id: "minimalPortfolio",
    label: "Minimal / Portfolio",
    mood: "clean, editorial",
    pairs: [
      pair("minimalPortfolio-0", "cormorant", "work-sans", "clean, editorial"),
      pair("minimalPortfolio-1", "fraunces", "inter", "refined, modern"),
      pair("minimalPortfolio-2", "playfair", "karla", "elegant, quiet"),
      pair("minimalPortfolio-3", "space", "source-sans", "sharp, minimal"),
    ],
  },
  kidsFun: {
    id: "kidsFun",
    label: "Kids / Fun",
    mood: "bubbly, playful",
    pairs: [
      pair("kidsFun-0", "fredoka", "comic-neue", "bubbly, playful"),
      pair("kidsFun-1", "baloo", "nunito", "rounded, friendly"),
      pair("kidsFun-2", "pacifico", "karla", "hand-drawn, fun"),
      pair("kidsFun-3", "fredoka", "nunito", "soft, cheerful"),
    ],
  },
  restaurantMenu: {
    id: "restaurantMenu",
    label: "Restaurant / Menu",
    mood: "upscale, appetizing",
    pairs: [
      pair("restaurantMenu-0", "abril-fatface", "karla", "upscale, appetizing"),
      pair("restaurantMenu-1", "playfair", "lato", "classic, refined"),
      pair("restaurantMenu-2", "cormorant", "work-sans", "editorial, fresh"),
      pair("restaurantMenu-3", "fraunces", "source-sans", "warm, premium"),
    ],
  },
  // For Indic-language templates: a regional display font paired with a clean
  // regional body font, same heading + body logic.
  indic: {
    id: "indic",
    label: "Indic Script",
    mood: "regional, warm",
    pairs: [
      pair("indic-0", "baloo-bhai", "hind", "friendly, warm"),
      pair("indic-1", "baloo", "mukta", "rounded, clean"),
      pair("indic-2", "baloo-bhai", "mukta", "bold, readable"),
      pair("indic-3", "hind", "noto-deva", "clean, neutral"),
    ],
  },
};

/**
 * Which pack each template category defaults to. Editable data — designers can
 * remap a category to a different pack without code changes.
 */
export const CATEGORY_TO_PACK: Record<string, string> = {
  logos: "corporate",
  posters: "posterEvent",
  social: "socialCasual",
  instagram: "socialCasual",
  videos: "thumbnail",
  presentations: "corporate",
  websites: "minimalPortfolio",
  whiteboards: "corporate",
  docs: "minimalPortfolio",
  flyers: "posterEvent",
  "business-cards": "corporate",
  resumes: "resume",
  marketing: "posterEvent",
  printables: "festival",
  mockups: "minimalPortfolio",
  ebooks: "minimalPortfolio",
};

const FALLBACK_PACK_ID = "corporate";

/** The pack that a template category maps to (falls back to a safe default). */
export function packForCategory(categoryId: string): FontPack {
  const packId = CATEGORY_TO_PACK[categoryId] ?? FALLBACK_PACK_ID;
  return FONT_PACKS[packId] ?? FONT_PACKS[FALLBACK_PACK_ID];
}

/** All curated pairs available for a category (default first). */
export function pairsForCategory(categoryId: string): FontPair[] {
  return packForCategory(categoryId).pairs;
}

/** The default pair for a category. */
export function defaultPairForCategory(categoryId: string): FontPair {
  return packForCategory(categoryId).pairs[0];
}

/** Look up a pair by its id across every pack. */
export function getPair(pairId: string | undefined): FontPair | undefined {
  if (!pairId) return undefined;
  for (const packId in FONT_PACKS) {
    const found = FONT_PACKS[packId].pairs.find((p) => p.id === pairId);
    if (found) return found;
  }
  return undefined;
}

/**
 * Deterministically pick one of a category's pairs by index. Used by the
 * procedural template generator so different generated templates in the same
 * category still vary their (always-designed) pairing.
 */
export function pairForCategoryIndex(categoryId: string, index: number): FontPair {
  const pairs = pairsForCategory(categoryId);
  const i = ((index % pairs.length) + pairs.length) % pairs.length;
  return pairs[i];
}

/**
 * "Shuffle Fonts": advance to the next curated pair for a category. Cycles
 * through the pack (never returns a random/broken combination).
 */
export function shuffleNextPair(categoryId: string, currentPairId?: string): FontPair {
  const pairs = pairsForCategory(categoryId);
  const idx = pairs.findIndex((p) => p.id === currentPairId);
  const next = idx < 0 ? 0 : (idx + 1) % pairs.length;
  return pairs[next];
}

/**
 * Resolve the pair to apply for a template, honoring a Brand Kit override.
 * If the user has saved brand fonts, those take priority over the category
 * default (Brand Kit override rule). Unknown font ids are ignored so a stale
 * brand kit can never break the pairing.
 */
export function resolvePair(categoryId: string, brandKit?: BrandKitFonts): FontPair {
  const base = defaultPairForCategory(categoryId);
  if (!brandKit) return base;
  const headingFontId =
    brandKit.headingFontId && isKnownFont(brandKit.headingFontId)
      ? brandKit.headingFontId
      : base.headingFontId;
  const bodyFontId =
    brandKit.bodyFontId && isKnownFont(brandKit.bodyFontId)
      ? brandKit.bodyFontId
      : base.bodyFontId;
  if (headingFontId === base.headingFontId && bodyFontId === base.bodyFontId) return base;
  return { id: "brand", headingFontId, bodyFontId, mood: "your brand kit" };
}

/** A universally safe default pair when no category context is available. */
export const DEFAULT_PAIR: FontPair = pair(
  "default",
  DEFAULT_FONT_ID,
  DEFAULT_BODY_FONT_ID,
  "balanced",
);
