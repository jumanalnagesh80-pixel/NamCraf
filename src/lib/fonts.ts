/**
 * Fonts available in the editor. We rely on widely available system font stacks
 * plus the display faces loaded in __root, so exports render consistently without
 * needing to embed webfonts.
 */
export interface DesignFont {
  id: string;
  name: string;
  stack: string;
}

export const FONTS: DesignFont[] = [
  { id: "fraunces", name: "Fraunces (Display)", stack: '"Fraunces", "Playfair Display", Georgia, serif' },
  { id: "poppins", name: "Poppins (Sans)", stack: '"Poppins", "Inter", ui-sans-serif, system-ui, sans-serif' },
  { id: "playfair", name: "Playfair Display", stack: '"Playfair Display", Georgia, serif' },
  { id: "georgia", name: "Georgia", stack: 'Georgia, "Times New Roman", serif' },
  { id: "mono", name: "Monospace", stack: 'ui-monospace, "SFMono-Regular", "Menlo", monospace' },
  { id: "system", name: "System Sans", stack: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' },
];

export const DEFAULT_FONT_ID = "fraunces";

export function getFont(id: string): DesignFont {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}
