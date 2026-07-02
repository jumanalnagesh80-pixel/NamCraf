/**
 * Design persistence. Saves the editable state of a template design either to
 * the cloud (Supabase `template_designs`, when signed in) or to localStorage
 * (guests). The two share the same shape so a guest design can later be synced.
 */
import { getSupabase, type TemplateDesignRow } from "./supabase";
import { DEFAULT_PALETTE_ID } from "./palettes";
import { DEFAULT_BODY_FONT_ID, DEFAULT_FONT_ID } from "./fonts";
import type { ShapeType } from "./graphics";

/** A graphic element (shape or sticker) placed on the canvas. Positions are in
 *  the design's base coordinate space (see BASE_WIDTH in DesignCanvas). */
export interface DesignElement {
  id: string;
  kind: "shape" | "sticker" | "text";
  shape?: ShapeType;
  emoji?: string;
  /** text content when kind === "text" */
  text?: string;
  /** font id for text elements (falls back to the design font) */
  fontId?: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  /** 0..1, defaults to 1 */
  opacity?: number;
  /** mirror horizontally */
  flipH?: boolean;
  /** text formatting */
  bold?: boolean;
  italic?: boolean;
  align?: "left" | "center" | "right";
  letterSpacing?: number;
  /** layer state */
  locked?: boolean;
  hidden?: boolean;
}

/** CSS-filter adjustments applied to an uploaded background image. */
export interface BgFilters {
  brightness: number; // %
  contrast: number; // %
  saturate: number; // %
  blur: number; // px
  grayscale: number; // %
}

export function defaultBgFilters(): BgFilters {
  return { brightness: 100, contrast: 100, saturate: 100, blur: 0, grayscale: 0 };
}

export function bgFilterCss(f: BgFilters | undefined): string {
  const x = f ?? defaultBgFilters();
  return `brightness(${x.brightness}%) contrast(${x.contrast}%) saturate(${x.saturate}%) blur(${x.blur}px) grayscale(${x.grayscale}%)`;
}

/** One-tap photo looks (built from the same adjustments). */
export interface FilterPreset {
  id: string;
  name: string;
  filters: BgFilters;
}

export const FILTER_PRESETS: FilterPreset[] = [
  { id: "original", name: "Original", filters: { brightness: 100, contrast: 100, saturate: 100, blur: 0, grayscale: 0 } },
  { id: "vivid", name: "Vivid", filters: { brightness: 106, contrast: 118, saturate: 145, blur: 0, grayscale: 0 } },
  { id: "warm", name: "Warm", filters: { brightness: 106, contrast: 102, saturate: 128, blur: 0, grayscale: 0 } },
  { id: "cool", name: "Cool", filters: { brightness: 100, contrast: 106, saturate: 88, blur: 0, grayscale: 0 } },
  { id: "fade", name: "Fade", filters: { brightness: 116, contrast: 84, saturate: 82, blur: 0, grayscale: 0 } },
  { id: "vintage", name: "Vintage", filters: { brightness: 108, contrast: 92, saturate: 76, blur: 0, grayscale: 18 } },
  { id: "mono", name: "Mono", filters: { brightness: 104, contrast: 108, saturate: 0, blur: 0, grayscale: 100 } },
  { id: "noir", name: "Noir", filters: { brightness: 92, contrast: 135, saturate: 0, blur: 0, grayscale: 100 } },
  { id: "dreamy", name: "Dreamy", filters: { brightness: 110, contrast: 94, saturate: 112, blur: 2, grayscale: 0 } },
  { id: "sharp", name: "Sharp", filters: { brightness: 100, contrast: 125, saturate: 110, blur: 0, grayscale: 0 } },
];

export interface DesignState {
  headline: string;
  tagline: string;
  paletteId: string;
  fontId: string; // heading font id
  /** body / supporting-copy font id (from the curated font pairing) */
  bodyFontId: string;
  darkText: boolean;
  headlineSize: number; // px at the design's base resolution
  backgroundImage: string | null; // data URL or remote URL
  elements: DesignElement[];
  bgFilters?: BgFilters;
}

export function defaultDesign(overrides: Partial<DesignState> = {}): DesignState {
  const base: DesignState = {
    headline: "",
    tagline: "",
    paletteId: DEFAULT_PALETTE_ID,
    fontId: DEFAULT_FONT_ID,
    bodyFontId: DEFAULT_BODY_FONT_ID,
    darkText: false,
    headlineSize: 64,
    backgroundImage: null,
    elements: [],
    bgFilters: defaultBgFilters(),
    ...overrides,
  };
  // Guard against an explicit `undefined` override wiping required fields.
  base.bodyFontId = base.bodyFontId ?? DEFAULT_BODY_FONT_ID;
  base.fontId = base.fontId ?? DEFAULT_FONT_ID;
  return base;
}

/** Normalize a loaded design so older saves (without newer fields) stay valid. */
function normalize(design: Partial<DesignState> | null): DesignState | null {
  if (!design) return null;
  return {
    ...defaultDesign(),
    ...design,
    bodyFontId: design.bodyFontId ?? DEFAULT_BODY_FONT_ID,
    elements: design.elements ?? [],
    bgFilters: { ...defaultBgFilters(), ...(design.bgFilters ?? {}) },
  };
}

const LS_PREFIX = "namcraft:design:";

function lsKey(templateId: string) {
  return `${LS_PREFIX}${templateId}`;
}

// ---- Local (guest) storage --------------------------------------------------

export function loadLocalDesign(templateId: string): DesignState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(lsKey(templateId));
    return raw ? normalize(JSON.parse(raw) as Partial<DesignState>) : null;
  } catch {
    return null;
  }
}

export function saveLocalDesign(templateId: string, design: DesignState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(lsKey(templateId), JSON.stringify(design));
  } catch {
    /* storage full / disabled — ignore */
  }
}

export function listLocalDesigns(): { templateId: string; design: DesignState }[] {
  if (typeof window === "undefined") return [];
  const out: { templateId: string; design: DesignState }[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key?.startsWith(LS_PREFIX)) {
      try {
        const design = normalize(
          JSON.parse(window.localStorage.getItem(key) as string) as Partial<DesignState>,
        );
        if (design) out.push({ templateId: key.slice(LS_PREFIX.length), design });
      } catch {
        /* skip corrupt entry */
      }
    }
  }
  return out;
}

// ---- Cloud storage ----------------------------------------------------------

function rowToDesign(row: TemplateDesignRow): DesignState {
  return {
    headline: row.headline,
    tagline: row.tagline,
    paletteId: row.palette_id,
    fontId: row.font_id,
    bodyFontId: row.body_font_id ?? DEFAULT_BODY_FONT_ID,
    darkText: row.dark_text,
    headlineSize: row.headline_size,
    backgroundImage: row.background_image,
    elements: (row.elements as DesignElement[] | null) ?? [],
    bgFilters: { ...defaultBgFilters(), ...((row.bg_filters as Partial<BgFilters> | null) ?? {}) },
  };
}

export async function loadCloudDesign(
  userId: string,
  templateId: string,
): Promise<DesignState | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("template_designs")
    .select("*")
    .eq("user_id", userId)
    .eq("template_id", templateId)
    .maybeSingle();
  if (error || !data) return null;
  return rowToDesign(data as TemplateDesignRow);
}

export async function saveCloudDesign(
  userId: string,
  templateId: string,
  design: DesignState,
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from("template_designs").upsert(
    {
      user_id: userId,
      template_id: templateId,
      headline: design.headline,
      tagline: design.tagline,
      palette_id: design.paletteId,
      font_id: design.fontId,
      body_font_id: design.bodyFontId,
      dark_text: design.darkText,
      headline_size: design.headlineSize,
      background_image: design.backgroundImage,
      elements: design.elements,
      bg_filters: design.bgFilters ?? defaultBgFilters(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,template_id" },
  );
  return !error;
}

export async function listCloudDesigns(
  userId: string,
): Promise<{ templateId: string; design: DesignState }[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("template_designs")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return (data as TemplateDesignRow[]).map((row) => ({
    templateId: row.template_id,
    design: rowToDesign(row),
  }));
}
