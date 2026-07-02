/**
 * Design persistence. Saves the editable state of a template design either to
 * the cloud (Supabase `template_designs`, when signed in) or to localStorage
 * (guests). The two share the same shape so a guest design can later be synced.
 */
import { getSupabase, type TemplateDesignRow } from "./supabase";
import { DEFAULT_PALETTE_ID } from "./palettes";
import { DEFAULT_FONT_ID } from "./fonts";
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
}

export interface DesignState {
  headline: string;
  tagline: string;
  paletteId: string;
  fontId: string;
  darkText: boolean;
  headlineSize: number; // px at the design's base resolution
  backgroundImage: string | null; // data URL or remote URL
  elements: DesignElement[];
}

export function defaultDesign(overrides: Partial<DesignState> = {}): DesignState {
  return {
    headline: "",
    tagline: "",
    paletteId: DEFAULT_PALETTE_ID,
    fontId: DEFAULT_FONT_ID,
    darkText: false,
    headlineSize: 64,
    backgroundImage: null,
    elements: [],
    ...overrides,
  };
}

/** Normalize a loaded design so older saves (without `elements`) stay valid. */
function normalize(design: Partial<DesignState> | null): DesignState | null {
  if (!design) return null;
  return { ...defaultDesign(), ...design, elements: design.elements ?? [] };
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
    darkText: row.dark_text,
    headlineSize: row.headline_size,
    backgroundImage: row.background_image,
    elements: (row.elements as DesignElement[] | null) ?? [],
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
      dark_text: design.darkText,
      headline_size: design.headlineSize,
      background_image: design.backgroundImage,
      elements: design.elements,
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
