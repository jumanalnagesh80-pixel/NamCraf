/**
 * Fonts available in the editor — a large, multilingual set spanning many
 * scripts (Latin, Devanagari, Arabic, CJK, Cyrillic, Thai, Hebrew, Tamil,
 * Bengali and more). Google Fonts ships each face with a `unicode-range`, so
 * the browser only downloads a font file when text actually uses its glyphs —
 * keeping things fast even with dozens of families available.
 *
 * Each font also carries lightweight design metadata (category, role, moods)
 * that powers the font picker's search/filter and the curated font-pairing
 * engine in `fontPairings.ts`.
 */

/** Broad visual classification, used for filtering in the picker. */
export type FontCategory =
  | "Sans"
  | "Serif"
  | "Display"
  | "Handwriting"
  | "Monospace"
  | "Regional";

/** Whether a face reads best as a heading, as body copy, or works for both. */
export type FontRole = "heading" | "body" | "both";

/** Mood tags surfaced in the picker ("bold", "elegant", "playful", …). */
export type FontMood =
  | "bold"
  | "elegant"
  | "modern"
  | "playful"
  | "clean"
  | "friendly"
  | "editorial"
  | "romantic"
  | "retro"
  | "techy"
  | "warm"
  | "luxury";

export interface DesignFont {
  id: string;
  name: string;
  /** Full CSS font-family stack. Already ends in a generic family so text
   *  never breaks even if the web font fails to load. */
  stack: string;
  /** Grouping label for the language / script picker. */
  lang: string;
  /** Visual classification for filtering. */
  category?: FontCategory;
  /** Suggested usage. */
  role?: FontRole;
  /** Mood tags for search/filter. */
  moods?: FontMood[];
}

export const FONTS: DesignFont[] = [
  // — Latin: display & serif —
  { id: "fraunces", name: "Fraunces", stack: '"Fraunces","Playfair Display",Georgia,serif', lang: "Latin", category: "Serif", role: "heading", moods: ["elegant", "editorial", "luxury"] },
  { id: "playfair", name: "Playfair Display", stack: '"Playfair Display",Georgia,serif', lang: "Latin", category: "Serif", role: "heading", moods: ["elegant", "romantic", "editorial"] },
  { id: "cormorant-garamond", name: "Cormorant Garamond", stack: '"Cormorant Garamond","Cormorant",Georgia,serif', lang: "Latin", category: "Serif", role: "body", moods: ["elegant", "romantic", "editorial"] },
  { id: "cormorant", name: "Cormorant", stack: '"Cormorant","Cormorant Garamond",Georgia,serif', lang: "Latin", category: "Serif", role: "heading", moods: ["elegant", "editorial", "clean"] },
  { id: "abril-fatface", name: "Abril Fatface", stack: '"Abril Fatface","Playfair Display",Georgia,serif', lang: "Latin", category: "Display", role: "heading", moods: ["bold", "luxury", "editorial"] },

  // — Latin: sans —
  { id: "poppins", name: "Poppins", stack: '"Poppins",Inter,ui-sans-serif,system-ui,sans-serif', lang: "Latin", category: "Sans", role: "both", moods: ["modern", "clean", "friendly"] },
  { id: "inter", name: "Inter", stack: '"Inter",ui-sans-serif,system-ui,sans-serif', lang: "Latin", category: "Sans", role: "both", moods: ["modern", "clean", "techy"] },
  { id: "montserrat", name: "Montserrat", stack: '"Montserrat",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "heading", moods: ["clean", "modern", "bold"] },
  { id: "source-sans", name: "Source Sans 3", stack: '"Source Sans 3","Source Sans Pro",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["clean", "modern"] },
  { id: "lato", name: "Lato", stack: '"Lato",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["clean", "modern", "friendly"] },
  { id: "nunito", name: "Nunito", stack: '"Nunito",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["friendly", "playful", "clean"] },
  { id: "roboto", name: "Roboto", stack: '"Roboto",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["modern", "clean", "techy"] },
  { id: "work-sans", name: "Work Sans", stack: '"Work Sans",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["clean", "modern", "editorial"] },
  { id: "karla", name: "Karla", stack: '"Karla",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["clean", "friendly", "modern"] },
  { id: "space", name: "Space Grotesk", stack: '"Space Grotesk",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "heading", moods: ["modern", "techy"] },

  // — Latin: high-impact display —
  { id: "oswald", name: "Oswald", stack: '"Oswald",ui-sans-serif,sans-serif', lang: "Latin", category: "Display", role: "heading", moods: ["bold", "modern"] },
  { id: "bebas", name: "Bebas Neue", stack: '"Bebas Neue",Impact,ui-sans-serif,sans-serif', lang: "Latin", category: "Display", role: "heading", moods: ["bold"] },
  { id: "anton", name: "Anton", stack: '"Anton",Impact,ui-sans-serif,sans-serif', lang: "Latin", category: "Display", role: "heading", moods: ["bold"] },
  { id: "archivo", name: "Archivo Black", stack: '"Archivo Black",ui-sans-serif,sans-serif', lang: "Latin", category: "Display", role: "heading", moods: ["bold", "modern"] },

  // — Latin: friendly / playful —
  { id: "fredoka", name: "Fredoka", stack: '"Fredoka",ui-sans-serif,sans-serif', lang: "Latin", category: "Display", role: "heading", moods: ["playful", "friendly"] },
  { id: "comic-neue", name: "Comic Neue", stack: '"Comic Neue",ui-sans-serif,sans-serif', lang: "Latin", category: "Sans", role: "body", moods: ["playful", "friendly"] },
  { id: "baloo", name: "Baloo 2 · बालू", stack: '"Baloo 2",cursive', lang: "Devanagari (हिन्दी)", category: "Display", role: "heading", moods: ["playful", "friendly", "bold"] },

  // — Handwriting / script —
  { id: "great-vibes", name: "Great Vibes", stack: '"Great Vibes","Pacifico",cursive', lang: "Handwriting", category: "Handwriting", role: "heading", moods: ["romantic", "elegant", "warm"] },
  { id: "pacifico", name: "Pacifico", stack: '"Pacifico",cursive', lang: "Handwriting", category: "Handwriting", role: "heading", moods: ["playful", "warm", "retro"] },
  { id: "lobster", name: "Lobster", stack: '"Lobster",cursive', lang: "Handwriting", category: "Handwriting", role: "heading", moods: ["retro", "bold", "warm"] },
  { id: "caveat", name: "Caveat", stack: '"Caveat",cursive', lang: "Handwriting", category: "Handwriting", role: "heading", moods: ["playful", "friendly"] },

  // — System fallbacks —
  { id: "georgia", name: "Georgia (serif)", stack: 'Georgia,"Times New Roman",serif', lang: "System", category: "Serif", role: "body", moods: ["editorial", "clean"] },
  { id: "mono", name: "Monospace", stack: 'ui-monospace,"SFMono-Regular",Menlo,monospace', lang: "System", category: "Monospace", role: "both", moods: ["techy", "modern"] },
  { id: "system", name: "System Sans", stack: 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif', lang: "System", category: "Sans", role: "both", moods: ["clean", "modern"] },

  // — Devanagari (Hindi / Marathi / Nepali) —
  { id: "noto-deva", name: "Noto Sans Devanagari · नोटो", stack: '"Noto Sans Devanagari",sans-serif', lang: "Devanagari (हिन्दी)", category: "Regional", role: "body", moods: ["clean", "modern"] },
  { id: "hind", name: "Hind · हिन्द", stack: '"Hind",sans-serif', lang: "Devanagari (हिन्दी)", category: "Regional", role: "body", moods: ["clean", "friendly"] },
  { id: "mukta", name: "Mukta · मुक्त", stack: '"Mukta",sans-serif', lang: "Devanagari (हिन्दी)", category: "Regional", role: "body", moods: ["clean", "warm"] },
  { id: "baloo-bhai", name: "Baloo Bhai 2 · बलू भाई", stack: '"Baloo Bhai 2","Baloo 2",cursive', lang: "Devanagari (हिन्दी)", category: "Regional", role: "heading", moods: ["playful", "bold", "friendly"] },

  // — Arabic —
  { id: "noto-arabic", name: "Noto Sans Arabic · نوٹو", stack: '"Noto Sans Arabic",sans-serif', lang: "Arabic (العربية)", category: "Regional", role: "body", moods: ["clean"] },
  { id: "cairo", name: "Cairo · القاهرة", stack: '"Cairo",sans-serif', lang: "Arabic (العربية)", category: "Regional", role: "both", moods: ["clean", "modern"] },

  // — CJK —
  { id: "noto-jp", name: "Noto Sans JP · 日本語", stack: '"Noto Sans JP",sans-serif', lang: "Japanese (日本語)", category: "Regional", role: "both", moods: ["clean"] },
  { id: "noto-kr", name: "Noto Sans KR · 한국어", stack: '"Noto Sans KR",sans-serif', lang: "Korean (한국어)", category: "Regional", role: "both", moods: ["clean"] },
  { id: "noto-sc", name: "Noto Sans SC · 简体中文", stack: '"Noto Sans SC",sans-serif', lang: "Chinese (中文)", category: "Regional", role: "both", moods: ["clean"] },

  // — Other scripts —
  { id: "noto-thai", name: "Noto Sans Thai · ไทย", stack: '"Noto Sans Thai",sans-serif', lang: "Thai (ไทย)", category: "Regional", role: "both", moods: ["clean"] },
  { id: "noto-hebrew", name: "Noto Sans Hebrew · עברית", stack: '"Noto Sans Hebrew",sans-serif', lang: "Hebrew (עברית)", category: "Regional", role: "both", moods: ["clean"] },
  { id: "noto-tamil", name: "Noto Sans Tamil · தமிழ்", stack: '"Noto Sans Tamil",sans-serif', lang: "Tamil (தமிழ்)", category: "Regional", role: "both", moods: ["clean"] },
  { id: "noto-bengali", name: "Noto Sans Bengali · বাংলা", stack: '"Noto Sans Bengali",sans-serif', lang: "Bengali (বাংলা)", category: "Regional", role: "both", moods: ["clean"] },
];

export const DEFAULT_FONT_ID = "fraunces";

/** Sensible body-copy default, paired with the display default above. */
export const DEFAULT_BODY_FONT_ID = "work-sans";

export function getFont(id: string): DesignFont {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}

/** Resolve a font id to a CSS font-family stack, always ending in a generic
 *  family so text renders even if the web font never loads (graceful
 *  fallback — no broken/invisible text). */
export function fontStack(id: string | undefined): string {
  const f = id ? FONTS.find((x) => x.id === id) : undefined;
  return f?.stack ?? FONTS[0].stack;
}

/** True when a font id exists in the library. */
export function isKnownFont(id: string | undefined): boolean {
  return !!id && FONTS.some((f) => f.id === id);
}

/** Fonts grouped by language/script, preserving declaration order. */
export function fontsByLanguage(): { lang: string; fonts: DesignFont[] }[] {
  const order: string[] = [];
  const map = new Map<string, DesignFont[]>();
  for (const f of FONTS) {
    if (!map.has(f.lang)) {
      map.set(f.lang, []);
      order.push(f.lang);
    }
    map.get(f.lang)!.push(f);
  }
  return order.map((lang) => ({ lang, fonts: map.get(lang)! }));
}

/** Fonts grouped by visual category, for a "browse by style" picker. */
export function fontsByCategory(): { category: FontCategory; fonts: DesignFont[] }[] {
  const order: FontCategory[] = ["Sans", "Serif", "Display", "Handwriting", "Monospace", "Regional"];
  return order
    .map((category) => ({ category, fonts: FONTS.filter((f) => (f.category ?? "Sans") === category) }))
    .filter((g) => g.fonts.length > 0);
}

/**
 * Search / filter the library by free text (matches name), category, mood and
 * role. All filters are optional and combine with AND.
 */
export function searchFonts(opts: {
  query?: string;
  category?: FontCategory;
  mood?: FontMood;
  role?: FontRole;
} = {}): DesignFont[] {
  const q = opts.query?.trim().toLowerCase();
  return FONTS.filter((f) => {
    if (q && !f.name.toLowerCase().includes(q)) return false;
    if (opts.category && (f.category ?? "Sans") !== opts.category) return false;
    if (opts.mood && !(f.moods ?? []).includes(opts.mood)) return false;
    if (opts.role && f.role && f.role !== "both" && f.role !== opts.role) return false;
    return true;
  });
}

/** A short, script-appropriate string for live-previewing a font in the picker. */
export function previewText(font: DesignFont): string {
  switch (font.lang) {
    case "Devanagari (हिन्दी)":
      return "नमस्ते · डिज़ाइन";
    case "Arabic (العربية)":
      return "تصميم · مرحبا";
    case "Japanese (日本語)":
      return "デザイン · こんにちは";
    case "Korean (한국어)":
      return "디자인 · 안녕하세요";
    case "Chinese (中文)":
      return "设计 · 你好";
    case "Thai (ไทย)":
      return "ออกแบบ · สวัสดี";
    case "Hebrew (עברית)":
      return "עיצוב · שלום";
    case "Tamil (தமிழ்)":
      return "வடிவமைப்பு";
    case "Bengali (বাংলা)":
      return "ডিজাইন";
    default:
      return font.name;
  }
}

/**
 * The Google Fonts stylesheet href covering every family above. Single-weight
 * display faces omit the wght axis (requesting an unavailable weight would fail
 * the whole request).
 */
export const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900",
    "family=Playfair+Display:wght@500;700;900",
    "family=Cormorant+Garamond:wght@400;500;600;700",
    "family=Cormorant:wght@400;500;600;700",
    "family=Abril+Fatface",
    "family=Poppins:wght@400;500;600;700",
    "family=Inter:wght@400;600;700",
    "family=Montserrat:wght@400;700;900",
    "family=Source+Sans+3:wght@400;600;700",
    "family=Lato:wght@400;700;900",
    "family=Nunito:wght@400;600;700;800",
    "family=Roboto:wght@400;500;700",
    "family=Work+Sans:wght@400;500;600;700",
    "family=Karla:wght@400;600;700",
    "family=Space+Grotesk:wght@400;500;700",
    "family=Oswald:wght@400;600;700",
    "family=Bebas+Neue",
    "family=Anton",
    "family=Archivo+Black",
    "family=Fredoka:wght@400;500;600;700",
    "family=Comic+Neue:wght@400;700",
    "family=Great+Vibes",
    "family=Pacifico",
    "family=Lobster",
    "family=Caveat:wght@400;700",
    "family=Noto+Sans+Devanagari:wght@400;700",
    "family=Hind:wght@400;700",
    "family=Mukta:wght@400;600;700",
    "family=Baloo+2:wght@400;700",
    "family=Baloo+Bhai+2:wght@400;600;700",
    "family=Noto+Sans+Arabic:wght@400;700",
    "family=Cairo:wght@400;700",
    "family=Noto+Sans+JP:wght@400;700",
    "family=Noto+Sans+KR:wght@400;700",
    "family=Noto+Sans+SC:wght@400;700",
    "family=Noto+Sans+Thai:wght@400;700",
    "family=Noto+Sans+Hebrew:wght@400;700",
    "family=Noto+Sans+Tamil:wght@400;700",
    "family=Noto+Sans+Bengali:wght@400;700",
  ].join("&") +
  "&display=swap";
