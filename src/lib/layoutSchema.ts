/**
 * Parametric template engine (Phase 1).
 *
 * A "template" is no longer a static file — it is generated deterministically
 * from a small set of reusable building blocks:
 *
 *     one instance  =  archetype  ×  alignment  ×  palette  ×  font-pair  ×  ratio  ×  content
 *
 * A core template is a JSON *layout schema*: an archetype made of positioned
 * slots (placeholders for eyebrow / heading / body / footer / decorative
 * shapes). Every slot uses normalized 0..1 coordinates so a single archetype
 * adapts to any aspect ratio ("magic resize" foundation). The multiplier
 * dimensions below expand each archetype into a very large browsable catalog,
 * and the count scales linearly as more archetypes are authored — which is how
 * the system reaches the 40-lakh target without materializing objects.
 */
import type { AspectRatio } from "./templates";

export type SlotRole = "eyebrow" | "heading" | "body" | "footer" | "shape" | "image";

/** A placeholder inside an archetype. Coordinates/sizes are fractions (0..1)
 *  of the design's width/height, resolved to pixels per ratio at render time. */
export interface LayoutSlot {
  id: string;
  role: SlotRole;
  /** left edge, 0..1 of width */
  x: number;
  /** top edge, 0..1 of height */
  y: number;
  /** width, 0..1 of width */
  w: number;
  /** text alignment (text slots) */
  align?: "left" | "center" | "right";
  /** relative font scale for text slots (multiplies the base type scale) */
  scale?: number;
  /** decorative shape id (shape slots) — matches graphics.ts ShapeType */
  shape?: string;
}

export interface LayoutArchetype {
  id: string;
  name: string;
  /** template categories this archetype suits best */
  categories: string[];
  /** positioned placeholders */
  slots: LayoutSlot[];
}

/** Micro-variation of an archetype: a global alignment/spacing shift. This is
 *  the "layout micro-variations" multiplier from the spec. */
export interface AlignmentVariant {
  id: string;
  label: string;
  align: "left" | "center" | "right";
  /** vertical anchor of the headline/body block */
  anchor: "top" | "middle" | "bottom";
}

export const ALIGNMENT_VARIANTS: AlignmentVariant[] = [
  { id: "left-bottom", label: "Left · Bottom", align: "left", anchor: "bottom" },
  { id: "center-middle", label: "Center · Middle", align: "center", anchor: "middle" },
  { id: "right-top", label: "Right · Top", align: "right", anchor: "top" },
];

/**
 * The authored core templates (archetypes). Adding an archetype here multiplies
 * the whole catalog. Each is a genuine layout schema, not a rendered file.
 */
export const ARCHETYPES: LayoutArchetype[] = [
  {
    id: "stacked-hero",
    name: "Stacked Hero",
    categories: ["social", "instagram", "posters", "marketing"],
    slots: [
      { id: "eyebrow", role: "eyebrow", x: 0.08, y: 0.08, w: 0.5, align: "left" },
      { id: "heading", role: "heading", x: 0.08, y: 0.42, w: 0.84, align: "left", scale: 1 },
      { id: "body", role: "body", x: 0.08, y: 0.66, w: 0.72, align: "left", scale: 0.34 },
      { id: "footer", role: "footer", x: 0.08, y: 0.9, w: 0.84, align: "left", scale: 0.2 },
    ],
  },
  {
    id: "centered-badge",
    name: "Centered Badge",
    categories: ["logos", "business-cards", "social", "instagram"],
    slots: [
      { id: "eyebrow", role: "eyebrow", x: 0.25, y: 0.16, w: 0.5, align: "center" },
      { id: "heading", role: "heading", x: 0.1, y: 0.42, w: 0.8, align: "center", scale: 1 },
      { id: "body", role: "body", x: 0.2, y: 0.62, w: 0.6, align: "center", scale: 0.32 },
      { id: "footer", role: "footer", x: 0.3, y: 0.86, w: 0.4, align: "center", scale: 0.2 },
    ],
  },
  {
    id: "editorial-split",
    name: "Editorial Split",
    categories: ["presentations", "websites", "docs", "ebooks", "marketing"],
    slots: [
      { id: "image", role: "image", x: 0.52, y: 0, w: 0.48 },
      { id: "eyebrow", role: "eyebrow", x: 0.07, y: 0.14, w: 0.4, align: "left" },
      { id: "heading", role: "heading", x: 0.07, y: 0.34, w: 0.42, align: "left", scale: 0.92 },
      { id: "body", role: "body", x: 0.07, y: 0.62, w: 0.4, align: "left", scale: 0.3 },
      { id: "footer", role: "footer", x: 0.07, y: 0.88, w: 0.4, align: "left", scale: 0.2 },
    ],
  },
  {
    id: "poster-impact",
    name: "Poster Impact",
    categories: ["posters", "flyers", "videos", "marketing"],
    slots: [
      { id: "heading", role: "heading", x: 0.06, y: 0.3, w: 0.88, align: "center", scale: 1.25 },
      { id: "body", role: "body", x: 0.12, y: 0.6, w: 0.76, align: "center", scale: 0.3 },
      { id: "shape", role: "shape", x: 0.4, y: 0.78, w: 0.2, shape: "starburst" },
      { id: "footer", role: "footer", x: 0.12, y: 0.9, w: 0.76, align: "center", scale: 0.2 },
    ],
  },
  {
    id: "corner-anchor",
    name: "Corner Anchor",
    categories: ["business-cards", "resumes", "logos", "docs"],
    slots: [
      { id: "eyebrow", role: "eyebrow", x: 0.08, y: 0.1, w: 0.5, align: "left" },
      { id: "heading", role: "heading", x: 0.08, y: 0.7, w: 0.7, align: "left", scale: 0.8 },
      { id: "body", role: "body", x: 0.08, y: 0.84, w: 0.6, align: "left", scale: 0.28 },
    ],
  },
  {
    id: "quote-frame",
    name: "Quote Frame",
    categories: ["social", "instagram", "presentations"],
    slots: [
      { id: "shape", role: "shape", x: 0.1, y: 0.16, w: 0.14, shape: "quote" },
      { id: "heading", role: "heading", x: 0.12, y: 0.36, w: 0.76, align: "center", scale: 0.9 },
      { id: "footer", role: "footer", x: 0.2, y: 0.78, w: 0.6, align: "center", scale: 0.24 },
    ],
  },
  {
    id: "banner-wide",
    name: "Wide Banner",
    categories: ["websites", "marketing", "presentations", "videos"],
    slots: [
      { id: "eyebrow", role: "eyebrow", x: 0.06, y: 0.2, w: 0.4, align: "left" },
      { id: "heading", role: "heading", x: 0.06, y: 0.36, w: 0.6, align: "left", scale: 0.95 },
      { id: "body", role: "body", x: 0.06, y: 0.64, w: 0.5, align: "left", scale: 0.28 },
    ],
  },
  {
    id: "grid-thumb",
    name: "Thumbnail Punch",
    categories: ["videos"],
    slots: [
      { id: "heading", role: "heading", x: 0.05, y: 0.24, w: 0.9, align: "left", scale: 1.4 },
      { id: "shape", role: "shape", x: 0.72, y: 0.6, w: 0.22, shape: "arrow" },
      { id: "footer", role: "footer", x: 0.05, y: 0.86, w: 0.6, align: "left", scale: 0.22 },
    ],
  },
  {
    id: "minimal-margin",
    name: "Minimal Margin",
    categories: ["resumes", "docs", "ebooks", "printables", "mockups"],
    slots: [
      { id: "eyebrow", role: "eyebrow", x: 0.12, y: 0.12, w: 0.5, align: "left" },
      { id: "heading", role: "heading", x: 0.12, y: 0.44, w: 0.76, align: "left", scale: 0.85 },
      { id: "body", role: "body", x: 0.12, y: 0.6, w: 0.66, align: "left", scale: 0.3 },
      { id: "footer", role: "footer", x: 0.12, y: 0.88, w: 0.6, align: "left", scale: 0.2 },
    ],
  },
  {
    id: "festive-center",
    name: "Festive Center",
    categories: ["printables", "flyers", "social", "instagram"],
    slots: [
      { id: "shape", role: "shape", x: 0.42, y: 0.12, w: 0.16, shape: "sparkle" },
      { id: "eyebrow", role: "eyebrow", x: 0.25, y: 0.26, w: 0.5, align: "center" },
      { id: "heading", role: "heading", x: 0.1, y: 0.44, w: 0.8, align: "center", scale: 1.05 },
      { id: "body", role: "body", x: 0.2, y: 0.66, w: 0.6, align: "center", scale: 0.32 },
    ],
  },
  {
    id: "left-rail",
    name: "Left Rail",
    categories: ["presentations", "docs", "whiteboards", "websites"],
    slots: [
      { id: "shape", role: "shape", x: 0, y: 0, w: 0.06, shape: "bar" },
      { id: "eyebrow", role: "eyebrow", x: 0.12, y: 0.16, w: 0.5, align: "left" },
      { id: "heading", role: "heading", x: 0.12, y: 0.4, w: 0.76, align: "left", scale: 0.95 },
      { id: "body", role: "body", x: 0.12, y: 0.64, w: 0.66, align: "left", scale: 0.3 },
    ],
  },
  {
    id: "big-number",
    name: "Big Number",
    categories: ["presentations", "marketing", "social"],
    slots: [
      { id: "heading", role: "heading", x: 0.08, y: 0.28, w: 0.84, align: "left", scale: 1.6 },
      { id: "body", role: "body", x: 0.08, y: 0.62, w: 0.6, align: "left", scale: 0.3 },
      { id: "footer", role: "footer", x: 0.08, y: 0.88, w: 0.6, align: "left", scale: 0.2 },
    ],
  },
  {
    id: "overlay-photo",
    name: "Overlay Photo",
    categories: ["instagram", "social", "posters", "marketing", "flyers"],
    slots: [
      { id: "image", role: "image", x: 0, y: 0, w: 1 },
      { id: "heading", role: "heading", x: 0.08, y: 0.58, w: 0.84, align: "left", scale: 1 },
      { id: "body", role: "body", x: 0.08, y: 0.8, w: 0.7, align: "left", scale: 0.3 },
    ],
  },
  {
    id: "whiteboard-notes",
    name: "Whiteboard Notes",
    categories: ["whiteboards", "docs"],
    slots: [
      { id: "eyebrow", role: "eyebrow", x: 0.06, y: 0.08, w: 0.5, align: "left" },
      { id: "heading", role: "heading", x: 0.06, y: 0.24, w: 0.88, align: "left", scale: 0.8 },
      { id: "shape", role: "shape", x: 0.7, y: 0.6, w: 0.22, shape: "circle" },
      { id: "body", role: "body", x: 0.06, y: 0.5, w: 0.6, align: "left", scale: 0.3 },
    ],
  },
];

/** Archetypes suited to a given template category (falls back to all). */
export function archetypesForCategory(categoryId: string): LayoutArchetype[] {
  const matches = ARCHETYPES.filter((a) => a.categories.includes(categoryId));
  return matches.length ? matches : ARCHETYPES;
}

export function getArchetype(id: string): LayoutArchetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}

/** Resolve a slot's normalized coordinates to absolute pixels for a canvas. */
export function resolveSlot(
  slot: LayoutSlot,
  width: number,
  height: number,
): { x: number; y: number; w: number } {
  return { x: slot.x * width, y: slot.y * height, w: slot.w * width };
}

// ---------------------------------------------------------------------------
// Catalog-size math — the parametric multiplier.
// ---------------------------------------------------------------------------

/** Multiplier dimensions used to size the browsable catalog. Palette / font-pair
 *  counts are representative averages (the real value varies per category). */
export const MULTIPLIERS = {
  archetypes: ARCHETYPES.length,
  alignments: ALIGNMENT_VARIANTS.length,
  palettes: 8,
  fontPairsPerCategory: 4,
  ratios: 4,
  /** deterministic headline/content permutations per slot set */
  contentVariations: 30,
};

/** The real size of the browsable parametric catalog for the current building
 *  blocks. Scales linearly as archetypes/palettes/pairs are added. */
export const PARAMETRIC_CATALOG_SIZE =
  MULTIPLIERS.archetypes *
  MULTIPLIERS.alignments *
  MULTIPLIERS.palettes *
  MULTIPLIERS.fontPairsPerCategory *
  MULTIPLIERS.ratios *
  MULTIPLIERS.contentVariations;

const ALL_RATIOS: AspectRatio[] = ["1:1", "3:4", "4:5", "16:9"];

/** Decoded coordinates of a catalog index into the multiplier space. */
export interface VariantCoords {
  archetype: LayoutArchetype;
  alignment: AlignmentVariant;
  ratio: AspectRatio;
  paletteIndex: number;
  pairIndex: number;
  contentSeed: number;
}

/**
 * Deterministically decode an integer catalog index into its variant
 * coordinates. Mixed-radix decomposition keeps every dimension independent, so
 * the same index always reconstructs the identical template (links, favorites
 * and saved designs stay valid across the whole virtual catalog).
 */
export function variantFromIndex(index: number): VariantCoords {
  const n = Math.abs(Math.trunc(index));
  let x = n;
  const archetype = ARCHETYPES[x % ARCHETYPES.length];
  x = Math.floor(x / ARCHETYPES.length);
  const alignment = ALIGNMENT_VARIANTS[x % ALIGNMENT_VARIANTS.length];
  x = Math.floor(x / ALIGNMENT_VARIANTS.length);
  const ratio = ALL_RATIOS[x % ALL_RATIOS.length];
  x = Math.floor(x / ALL_RATIOS.length);
  const paletteIndex = x % MULTIPLIERS.palettes;
  x = Math.floor(x / MULTIPLIERS.palettes);
  const pairIndex = x % MULTIPLIERS.fontPairsPerCategory;
  x = Math.floor(x / MULTIPLIERS.fontPairsPerCategory);
  const contentSeed = x % MULTIPLIERS.contentVariations;
  return { archetype, alignment, ratio, paletteIndex, pairIndex, contentSeed };
}
