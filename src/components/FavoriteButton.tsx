import { useFavorites } from "~/hooks/useFavorites";
import { cn } from "~/lib/utils";

interface FavoriteButtonProps {
  templateId: string;
  className?: string;
  size?: number;
}

/** ⭐ favorite toggle used on template cards and in the editor. */
export function FavoriteButton({ templateId, className = "", size = 20 }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(templateId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(templateId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "flex items-center justify-center rounded-full border transition",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card/90 hover:bg-muted",
        className,
      )}
      style={{ width: size + 18, height: size + 18 }}
    >
      <span style={{ fontSize: size }} aria-hidden="true">
        {active ? "⭐" : "☆"}
      </span>
    </button>
  );
}
