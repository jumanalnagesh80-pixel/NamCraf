import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { TemplateCard } from "~/components/TemplateCard";
import { DesignCanvas } from "~/components/DesignCanvas";
import { Button } from "~/components/ui/Button";
import { useFavorites } from "~/hooks/useFavorites";
import { useAuth } from "~/hooks/useAuth";
import { getTemplate, categoryLabel } from "~/lib/templates";
import {
  listLocalDesigns,
  listCloudDesigns,
  type DesignState,
} from "~/lib/designStore";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    ...seo({
      path: "/favorites",
      title: "Favorites & saved designs",
      description:
        "Your bookmarked templates and saved designs — synced across devices when you're signed in.",
    }),
  }),
  component: FavoritesPage,
});

interface SavedDesign {
  templateId: string;
  design: DesignState;
}

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [loadingDesigns, setLoadingDesigns] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoadingDesigns(true);
      const list = user ? await listCloudDesigns(user.id) : listLocalDesigns();
      if (active) {
        setDesigns(list);
        setLoadingDesigns(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [user]);

  const favTemplates = favorites
    .map((id) => getTemplate(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <header className="mb-10">
          <h1 className="font-display text-4xl font-black sm:text-5xl">Your studio</h1>
          <p className="text-muted-foreground mt-2">
            {user
              ? "Synced to your account across every device."
              : "Saved on this device. Sign in to sync everywhere."}
          </p>
          {!user && (
            <Link to="/auth" className="mt-4 inline-block">
              <Button>Sign in to sync</Button>
            </Link>
          )}
        </header>

        {/* Favorites */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              ⭐
            </span>
            <h2 className="font-display text-2xl font-black">
              Favorites ({favTemplates.length})
            </h2>
          </div>

          {favTemplates.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <EmptyState
              emoji="☆"
              title="No favorites yet"
              body="Tap the star on any template to bookmark it here."
            />
          )}
        </section>

        {/* Saved designs */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🎨
            </span>
            <h2 className="font-display text-2xl font-black">
              Saved designs ({designs.length})
            </h2>
          </div>

          {loadingDesigns ? (
            <p className="text-muted-foreground">Loading your designs…</p>
          ) : designs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {designs.map(({ templateId, design }) => {
                const template = getTemplate(templateId);
                if (!template) return null;
                return (
                  <Link
                    key={templateId}
                    to="/templates/$id"
                    params={{ id: templateId }}
                    className="group border-border bg-card shadow-soft flex flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-stamp"
                  >
                    <DesignCanvas
                      ratio={template.ratio}
                      design={design}
                      eyebrow={categoryLabel(template.category)}
                      rounded={false}
                    />
                    <div className="flex items-center justify-between gap-2 p-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {design.headline || template.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {categoryLabel(template.category)} · {template.ratio}
                        </p>
                      </div>
                      <span className="text-primary text-sm font-semibold group-hover:underline">
                        Edit →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState
              emoji="🖌️"
              title="No saved designs yet"
              body="Open any template, make it yours, and hit Save to keep it here."
              cta
            />
          )}
        </section>
      </div>
    </SiteLayout>
  );
}

function EmptyState({
  emoji,
  title,
  body,
  cta,
}: {
  emoji: string;
  title: string;
  body: string;
  cta?: boolean;
}) {
  return (
    <div className="border-border bg-card flex flex-col items-center rounded-3xl border py-16 text-center">
      <span className="text-5xl" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="font-display mt-4 text-xl font-black">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm">{body}</p>
      {cta && (
        <Link to="/templates" className="mt-6">
          <Button>Browse templates</Button>
        </Link>
      )}
    </div>
  );
}
