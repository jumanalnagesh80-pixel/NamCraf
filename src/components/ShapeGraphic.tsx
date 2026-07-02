import type { ShapeType } from "~/lib/graphics";

/** Renders a vector shape into a square SVG of the given size and color. */
export function ShapeGraphic({
  type,
  color,
  size = 100,
  className = "",
}: {
  type: ShapeType;
  color: string;
  size?: number;
  className?: string;
}) {
  const common = { fill: color };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", overflow: "visible" }}
    >
      {renderShape(type, color)}
    </svg>
  );

  function renderShape(t: ShapeType, c: string) {
    switch (t) {
      case "rectangle":
        return <rect x="4" y="18" width="92" height="64" {...common} />;
      case "rounded":
        return <rect x="6" y="6" width="88" height="88" rx="20" {...common} />;
      case "circle":
        return <circle cx="50" cy="50" r="46" {...common} />;
      case "ellipse":
        return <ellipse cx="50" cy="50" rx="48" ry="32" {...common} />;
      case "triangle":
        return <polygon points="50,6 96,92 4,92" {...common} />;
      case "triangle-down":
        return <polygon points="4,8 96,8 50,94" {...common} />;
      case "diamond":
        return <polygon points="50,4 96,50 50,96 4,50" {...common} />;
      case "pentagon":
        return <polygon points="50,4 96,38 78,94 22,94 4,38" {...common} />;
      case "hexagon":
        return <polygon points="27,6 73,6 96,50 73,94 27,94 4,50" {...common} />;
      case "octagon":
        return <polygon points="31,4 69,4 96,31 96,69 69,96 31,96 4,69 4,31" {...common} />;
      case "star5":
        return (
          <polygon
            points="50,4 61,38 97,38 68,60 79,94 50,72 21,94 32,60 3,38 39,38"
            {...common}
          />
        );
      case "star6":
        return (
          <polygon
            points="50,3 62,24 86,24 74,45 86,66 62,66 50,88 38,66 14,66 26,45 14,24 38,24"
            {...common}
          />
        );
      case "burst":
        return (
          <polygon
            points="50,2 58,26 80,14 72,38 98,42 76,54 92,74 66,70 66,96 50,76 34,96 34,70 8,74 24,54 2,42 28,38 20,14 42,26"
            {...common}
          />
        );
      case "heart":
        return (
          <path
            d="M50 88 C10 60 6 30 28 20 C40 14 50 24 50 32 C50 24 60 14 72 20 C94 30 90 60 50 88 Z"
            {...common}
          />
        );
      case "blob":
        return (
          <path
            d="M64 8 C84 10 96 30 92 50 C88 70 96 84 78 92 C58 100 30 96 16 80 C2 64 6 40 18 26 C30 12 44 6 64 8 Z"
            {...common}
          />
        );
      case "cloud":
        return (
          <path
            d="M28 74 C12 74 6 60 18 52 C16 34 42 28 50 42 C60 30 84 36 82 54 C96 56 94 74 78 74 Z"
            {...common}
          />
        );
      case "speech":
        return (
          <path
            d="M10 14 H90 A6 6 0 0 1 96 20 V64 A6 6 0 0 1 90 70 H44 L24 90 V70 H10 A6 6 0 0 1 4 64 V20 A6 6 0 0 1 10 14 Z"
            {...common}
          />
        );
      case "arrow-right":
        return <polygon points="4,36 60,36 60,18 96,50 60,82 60,64 4,64" {...common} />;
      case "arrow-left":
        return <polygon points="96,36 40,36 40,18 4,50 40,82 40,64 96,64" {...common} />;
      case "chevron":
        return <polygon points="20,6 56,50 20,94 44,94 80,50 44,6" {...common} />;
      case "lightning":
        return <polygon points="58,2 22,54 46,54 38,98 82,40 54,40" {...common} />;
      case "sparkle":
        return (
          <path
            d="M50 4 C54 30 70 46 96 50 C70 54 54 70 50 96 C46 70 30 54 4 50 C30 46 46 30 50 4 Z"
            {...common}
          />
        );
      case "ring":
        return (
          <path
            d="M50 4 A46 46 0 1 0 50.01 4 Z M50 28 A22 22 0 1 1 49.99 28 Z"
            fillRule="evenodd"
            {...common}
          />
        );
      case "plus":
        return <polygon points="38,4 62,4 62,38 96,38 96,62 62,62 62,96 38,96 38,62 4,62 4,38 38,38" {...common} />;
      case "quarter":
        return <path d="M6 94 V6 A88 88 0 0 1 94 94 Z" {...common} />;
      case "semicircle":
        return <path d="M4 72 A46 46 0 0 1 96 72 Z" {...common} />;
      default:
        return <rect x="6" y="6" width="88" height="88" rx="16" {...common} />;
    }
  }
}
