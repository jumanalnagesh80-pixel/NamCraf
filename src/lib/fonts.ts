/**
 * Fonts available in the editor — a large, multilingual set spanning many
 * scripts (Latin, Devanagari, Arabic, CJK, Cyrillic, Thai, Hebrew, Tamil,
 * Bengali and more). Google Fonts ships each face with a `unicode-range`, so
 * the browser only downloads a font file when text actually uses its glyphs —
 * keeping things fast even with dozens of families available.
 */
export interface DesignFont {
  id: string;
  name: string;
  stack: string;
  /** Grouping label for the language / script picker. */
  lang: string;
}

export const FONTS: DesignFont[] = [
  // — Latin: display & sans —
  { id: "fraunces", name: "Fraunces", stack: '"Fraunces","Playfair Display",Georgia,serif', lang: "Latin" },
  { id: "playfair", name: "Playfair Display", stack: '"Playfair Display",Georgia,serif', lang: "Latin" },
  { id: "poppins", name: "Poppins", stack: '"Poppins",Inter,ui-sans-serif,system-ui,sans-serif', lang: "Latin" },
  { id: "inter", name: "Inter", stack: '"Inter",ui-sans-serif,system-ui,sans-serif', lang: "Latin" },
  { id: "montserrat", name: "Montserrat", stack: '"Montserrat",ui-sans-serif,sans-serif', lang: "Latin" },
  { id: "space", name: "Space Grotesk", stack: '"Space Grotesk",ui-sans-serif,sans-serif', lang: "Latin" },
  { id: "oswald", name: "Oswald", stack: '"Oswald",ui-sans-serif,sans-serif', lang: "Latin" },
  { id: "bebas", name: "Bebas Neue", stack: '"Bebas Neue",Impact,ui-sans-serif,sans-serif', lang: "Latin" },
  { id: "archivo", name: "Archivo Black", stack: '"Archivo Black",ui-sans-serif,sans-serif', lang: "Latin" },
  { id: "pacifico", name: "Pacifico", stack: '"Pacifico",cursive', lang: "Handwriting" },
  { id: "lobster", name: "Lobster", stack: '"Lobster",cursive', lang: "Handwriting" },
  { id: "caveat", name: "Caveat", stack: '"Caveat",cursive', lang: "Handwriting" },

  // — System fallbacks —
  { id: "georgia", name: "Georgia (serif)", stack: 'Georgia,"Times New Roman",serif', lang: "System" },
  { id: "mono", name: "Monospace", stack: 'ui-monospace,"SFMono-Regular",Menlo,monospace', lang: "System" },
  { id: "system", name: "System Sans", stack: 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif', lang: "System" },

  // — Devanagari (Hindi / Marathi / Nepali) —
  { id: "noto-deva", name: "Noto Sans Devanagari · नोटो", stack: '"Noto Sans Devanagari",sans-serif', lang: "Devanagari (हिन्दी)" },
  { id: "hind", name: "Hind · हिन्द", stack: '"Hind",sans-serif', lang: "Devanagari (हिन्दी)" },
  { id: "baloo", name: "Baloo 2 · बालू", stack: '"Baloo 2",cursive', lang: "Devanagari (हिन्दी)" },

  // — Arabic —
  { id: "noto-arabic", name: "Noto Sans Arabic · نوٹو", stack: '"Noto Sans Arabic",sans-serif', lang: "Arabic (العربية)" },
  { id: "cairo", name: "Cairo · القاهرة", stack: '"Cairo",sans-serif', lang: "Arabic (العربية)" },

  // — CJK —
  { id: "noto-jp", name: "Noto Sans JP · 日本語", stack: '"Noto Sans JP",sans-serif', lang: "Japanese (日本語)" },
  { id: "noto-kr", name: "Noto Sans KR · 한국어", stack: '"Noto Sans KR",sans-serif', lang: "Korean (한국어)" },
  { id: "noto-sc", name: "Noto Sans SC · 简体中文", stack: '"Noto Sans SC",sans-serif', lang: "Chinese (中文)" },

  // — Other scripts —
  { id: "noto-thai", name: "Noto Sans Thai · ไทย", stack: '"Noto Sans Thai",sans-serif', lang: "Thai (ไทย)" },
  { id: "noto-hebrew", name: "Noto Sans Hebrew · עברית", stack: '"Noto Sans Hebrew",sans-serif', lang: "Hebrew (עברית)" },
  { id: "noto-tamil", name: "Noto Sans Tamil · தமிழ்", stack: '"Noto Sans Tamil",sans-serif', lang: "Tamil (தமிழ்)" },
  { id: "noto-bengali", name: "Noto Sans Bengali · বাংলা", stack: '"Noto Sans Bengali",sans-serif', lang: "Bengali (বাংলা)" },
];

export const DEFAULT_FONT_ID = "fraunces";

export function getFont(id: string): DesignFont {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
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
    "family=Poppins:wght@400;500;600;700",
    "family=Inter:wght@400;600;700",
    "family=Montserrat:wght@400;700;900",
    "family=Space+Grotesk:wght@400;500;700",
    "family=Oswald:wght@400;600;700",
    "family=Bebas+Neue",
    "family=Archivo+Black",
    "family=Pacifico",
    "family=Lobster",
    "family=Caveat:wght@400;700",
    "family=Noto+Sans+Devanagari:wght@400;700",
    "family=Hind:wght@400;700",
    "family=Baloo+2:wght@400;700",
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
