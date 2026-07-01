/**
 * Predefined design palettes used inside the template editor. Each palette maps
 * to concrete colors so exported PNG/SVG artwork is self-contained (independent
 * of the app theme tokens).
 */
export interface DesignPalette {
  id: string;
  name: string;
  /** background gradient / solid for the canvas */
  bg: string;
  /** primary surface / shape color */
  surface: string;
  /** accent color for tags & shapes */
  accent: string;
  /** default light text color */
  textLight: string;
  /** default dark text color */
  textDark: string;
}

export const PALETTES: DesignPalette[] = [
  {
    id: "stamp",
    name: "Stamp Blue",
    bg: "linear-gradient(135deg, #2E4BC7, #F26E86)",
    surface: "#2E4BC7",
    accent: "#F7D94C",
    textLight: "#FEFAF0",
    textDark: "#1E2340",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    bg: "linear-gradient(120deg, #F7D94C, #F26E86)",
    surface: "#F26E86",
    accent: "#2E4BC7",
    textLight: "#FFFFFF",
    textDark: "#1E2340",
  },
  {
    id: "cream",
    name: "Warm Cream",
    bg: "linear-gradient(160deg, #FBF5E9, #F0E6D2)",
    surface: "#FFFFFF",
    accent: "#F26E86",
    textLight: "#FBF5E9",
    textDark: "#1E2340",
  },
  {
    id: "berry",
    name: "Deep Berry",
    bg: "linear-gradient(150deg, #2A1230, #4A1D48)",
    surface: "#4A1D48",
    accent: "#F7D94C",
    textLight: "#FBF5E9",
    textDark: "#2A1230",
  },
  {
    id: "blossom",
    name: "Blossom",
    bg: "linear-gradient(135deg, #F26E86, #FBAFC0)",
    surface: "#F26E86",
    accent: "#F7D94C",
    textLight: "#FFFFFF",
    textDark: "#5A1F2E",
  },
  {
    id: "lemon",
    name: "Lemon Pop",
    bg: "linear-gradient(120deg, #F7D94C, #FBF0A0)",
    surface: "#F7D94C",
    accent: "#2E4BC7",
    textLight: "#FFFDF0",
    textDark: "#4A3E00",
  },
  {
    id: "ink",
    name: "Deep Ink",
    bg: "linear-gradient(150deg, #1E2340, #2E4BC7)",
    surface: "#1E2340",
    accent: "#F7D94C",
    textLight: "#FEFAF0",
    textDark: "#1E2340",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    bg: "linear-gradient(135deg, #2E4BC7, #3FBFA0)",
    surface: "#3FBFA0",
    accent: "#F7D94C",
    textLight: "#FFFFFF",
    textDark: "#0E3A32",
  },
];

export const DEFAULT_PALETTE_ID = "stamp";

export function getPalette(id: string): DesignPalette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}
