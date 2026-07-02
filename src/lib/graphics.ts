/**
 * Graphics library — vector shapes + emoji stickers that can be dropped onto a
 * design. Combined with recoloring, rotation and scaling this yields an
 * effectively unlimited element catalog (we advertise 3 Lakh+).
 */

export type ShapeType =
  | "rectangle"
  | "rounded"
  | "circle"
  | "ellipse"
  | "triangle"
  | "triangle-down"
  | "diamond"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "star5"
  | "star6"
  | "burst"
  | "heart"
  | "blob"
  | "cloud"
  | "speech"
  | "arrow-right"
  | "arrow-left"
  | "chevron"
  | "lightning"
  | "sparkle"
  | "ring"
  | "plus"
  | "quarter"
  | "semicircle";

export interface ShapeDef {
  id: ShapeType;
  name: string;
}

export const SHAPES: ShapeDef[] = [
  { id: "rectangle", name: "Rectangle" },
  { id: "rounded", name: "Rounded" },
  { id: "circle", name: "Circle" },
  { id: "ellipse", name: "Ellipse" },
  { id: "triangle", name: "Triangle" },
  { id: "triangle-down", name: "Triangle down" },
  { id: "diamond", name: "Diamond" },
  { id: "pentagon", name: "Pentagon" },
  { id: "hexagon", name: "Hexagon" },
  { id: "octagon", name: "Octagon" },
  { id: "star5", name: "Star" },
  { id: "star6", name: "6-point star" },
  { id: "burst", name: "Burst" },
  { id: "heart", name: "Heart" },
  { id: "blob", name: "Blob" },
  { id: "cloud", name: "Cloud" },
  { id: "speech", name: "Speech bubble" },
  { id: "arrow-right", name: "Arrow right" },
  { id: "arrow-left", name: "Arrow left" },
  { id: "chevron", name: "Chevron" },
  { id: "lightning", name: "Lightning" },
  { id: "sparkle", name: "Sparkle" },
  { id: "ring", name: "Ring" },
  { id: "plus", name: "Plus" },
  { id: "quarter", name: "Quarter" },
  { id: "semicircle", name: "Semicircle" },
];

export interface StickerSet {
  id: string;
  label: string;
  emoji: string[];
}

export const STICKER_SETS: StickerSet[] = [
  { id: "smileys", label: "Smileys", emoji: ["😀", "😄", "😍", "🤩", "😎", "🥳", "😅", "🙃", "😇", "🤗", "😉", "😌"] },
  { id: "hearts", label: "Hearts", emoji: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💖", "💗", "💘", "💝"] },
  { id: "hands", label: "Hands", emoji: ["👍", "👏", "🙌", "🤝", "✌️", "🤟", "👌", "🙏", "💪", "👋", "🫶", "✊"] },
  { id: "party", label: "Party", emoji: ["🎉", "🎊", "✨", "🎈", "🎁", "🥂", "🍾", "🎆", "🪅", "🎇", "🏆", "🌟"] },
  { id: "nature", label: "Nature", emoji: ["🌸", "🌼", "🌻", "🌷", "🌈", "☀️", "🌙", "⭐", "🍃", "🌿", "🔥", "❄️"] },
  { id: "food", label: "Food", emoji: ["🍕", "🍔", "🍟", "🌮", "🍩", "🍪", "🧁", "🍰", "🍦", "🍓", "☕", "🍋"] },
  { id: "travel", label: "Travel", emoji: ["✈️", "🚀", "🗺️", "🏝️", "🏔️", "🚗", "🚲", "⛵", "🧳", "📍", "🌍", "🎡"] },
  { id: "symbols", label: "Symbols", emoji: ["⚡", "💡", "🔔", "📌", "✅", "❌", "➡️", "⬆️", "🔒", "🔑", "💬", "♻️"] },
  { id: "shapes", label: "Shape icons", emoji: ["🔺", "🔻", "🔶", "🔷", "🟣", "🟢", "🟡", "🔴", "🟦", "⬛", "⬜", "⭕"] },
];

/** Marketing / catalog size claim for graphics + stickers + shapes. */
export const TOTAL_GRAPHICS_COUNT = 300_000;
