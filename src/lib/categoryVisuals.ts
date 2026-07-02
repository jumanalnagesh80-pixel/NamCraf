import type { ShapeType } from "./graphics";

/** A generated "thumbnail" look per category: a brand gradient + a decorative
 *  shape. Lets category tiles read as images without external assets. */
export interface CategoryVisual {
  gradient: string;
  shape: ShapeType;
  /** use dark ink for icon/label when the gradient is light */
  dark?: boolean;
}

export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  social: { gradient: "linear-gradient(135deg,#2E4BC7,#F26E86)", shape: "speech" },
  instagram: { gradient: "linear-gradient(135deg,#F26E86,#F7D94C)", shape: "circle" },
  videos: { gradient: "linear-gradient(135deg,#1E2340,#2E4BC7)", shape: "triangle" },
  presentations: { gradient: "linear-gradient(135deg,#2E4BC7,#3FBFA0)", shape: "rectangle" },
  websites: { gradient: "linear-gradient(135deg,#3FBFA0,#2E4BC7)", shape: "rounded" },
  whiteboards: { gradient: "linear-gradient(135deg,#F7D94C,#F26E86)", shape: "blob", dark: true },
  docs: { gradient: "linear-gradient(160deg,#FBF5E9,#F0E6D2)", shape: "rectangle", dark: true },
  logos: { gradient: "linear-gradient(135deg,#2E4BC7,#4A1D48)", shape: "star5" },
  posters: { gradient: "linear-gradient(135deg,#F26E86,#2E4BC7)", shape: "diamond" },
  flyers: { gradient: "linear-gradient(135deg,#F7D94C,#3FBFA0)", shape: "star6", dark: true },
  "business-cards": { gradient: "linear-gradient(135deg,#1E2340,#3FBFA0)", shape: "rounded" },
  resumes: { gradient: "linear-gradient(135deg,#2E4BC7,#FBAFC0)", shape: "rectangle" },
  marketing: { gradient: "linear-gradient(135deg,#F26E86,#F7D94C)", shape: "burst", dark: true },
  printables: { gradient: "linear-gradient(135deg,#3FBFA0,#F7D94C)", shape: "hexagon", dark: true },
  mockups: { gradient: "linear-gradient(135deg,#4A1D48,#F26E86)", shape: "rounded" },
  ebooks: { gradient: "linear-gradient(135deg,#2E4BC7,#F7D94C)", shape: "rectangle" },
};

export function getCategoryVisual(id: string): CategoryVisual {
  return (
    CATEGORY_VISUALS[id] ?? {
      gradient: "linear-gradient(135deg,#2E4BC7,#F26E86)",
      shape: "circle",
    }
  );
}
