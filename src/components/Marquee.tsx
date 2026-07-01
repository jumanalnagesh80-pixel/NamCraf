const DEFAULT_ITEMS = [
  "Logos",
  "Posters",
  "Social Posts",
  "Presentations",
  "Business Cards",
  "Flyers",
  "Instagram",
  "Résumés",
  "Brand Kits",
  "Menus",
  "Invitations",
  "Banners",
];

/** Full-width scrolling marquee of studio capabilities. */
export function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="bg-accent text-accent-foreground border-border overflow-hidden border-y py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-bold tracking-wide">
            <span>{item}</span>
            <span aria-hidden="true" className="text-base">
              ✳️
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
