import { Link } from "@tanstack/react-router";
import type { Template } from "~/lib/templates";
import { categoryLabel } from "~/lib/templates";
import { defaultDesign } from "~/lib/designStore";
import { DesignCanvas } from "./DesignCanvas";
import { FavoriteButton } from "./FavoriteButton";
import { Button } from "./ui/Button";

/** A single template in a library / spark grid. Shows a live preview, favorite
 *  toggle and a Use action that routes to the editor. */
export function TemplateCard({ template }: { template: Template }) {
  const design = defaultDesign({
    headline: template.headline,
    tagline: template.tagline,
    paletteId: template.paletteId,
    fontId: template.fontId,
    darkText: template.darkText,
    headlineSize: 92,
  });

  return (
    <div className="group border-border bg-card shadow-soft flex flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-stamp">
      <div className="relative">
        <Link
          to="/templates/$id"
          params={{ id: template.id }}
          aria-label={`Open ${template.title} in the editor`}
        >
          <DesignCanvas
            ratio={template.ratio}
            design={design}
            eyebrow={categoryLabel(template.category)}
            rounded={false}
          />
        </Link>
        <div className="absolute right-3 top-3">
          <FavoriteButton templateId={template.id} />
        </div>
        <span className="bg-background/80 text-muted-foreground absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur">
          {template.ratio}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{template.title}</h3>
          <p className="text-muted-foreground text-xs">{categoryLabel(template.category)}</p>
        </div>
        <Link to="/templates/$id" params={{ id: template.id }}>
          <Button size="sm">Use</Button>
        </Link>
      </div>
    </div>
  );
}
