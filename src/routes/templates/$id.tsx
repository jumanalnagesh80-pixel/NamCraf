import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toPng, toSvg } from "html-to-image";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { DesignCanvas } from "~/components/DesignCanvas";
import { FavoriteButton } from "~/components/FavoriteButton";
import { Button } from "~/components/ui/Button";
import { PALETTES } from "~/lib/palettes";
import { FONTS } from "~/lib/fonts";
import { categoryLabel, getTemplate } from "~/lib/templates";
import {
  defaultDesign,
  loadLocalDesign,
  saveLocalDesign,
  loadCloudDesign,
  saveCloudDesign,
  type DesignState,
} from "~/lib/designStore";
import { useAuth } from "~/hooks/useAuth";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/templates/$id")({
  loader: ({ params }) => {
    const template = getTemplate(params.id);
    if (!template) throw notFound();
    return { template };
  },
  head: ({ loaderData, params }) => {
    const t = loaderData?.template;
    return {
      ...seo({
        path: `/templates/${params.id}`,
        title: t ? `Edit “${t.title}”` : "Editor",
        description: t
          ? `Customize the ${t.title} template — edit text, swap palettes and fonts, then export as PNG or SVG. A ${categoryLabel(t.category)} design at ${t.ratio}.`
          : "Customize a template in the NAMCRAFT live editor.",
      }),
    };
  },
  component: EditorPage,
});

type SaveState = "idle" | "saving" | "saved" | "error";

function EditorPage() {
  const { template } = Route.useLoaderData();
  const { user, cloudEnabled } = useAuth();

  const exportRef = useRef<HTMLDivElement>(null);
  const [design, setDesign] = useState<DesignState>(() =>
    defaultDesign({
      headline: template.headline,
      tagline: template.tagline,
      paletteId: template.paletteId,
      fontId: template.fontId,
      darkText: template.darkText,
      headlineSize: 96,
    }),
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [busy, setBusy] = useState<null | "png" | "svg">(null);
  const [message, setMessage] = useState<string | null>(null);

  // Restore a previously saved design (cloud when signed in, else local).
  useEffect(() => {
    let active = true;
    async function restore() {
      let saved: DesignState | null = null;
      if (user) saved = await loadCloudDesign(user.id, template.id);
      if (!saved) saved = loadLocalDesign(template.id);
      if (saved && active) setDesign(saved);
    }
    void restore();
    return () => {
      active = false;
    };
  }, [user, template.id]);

  const update = <K extends keyof DesignState>(key: K, value: DesignState[K]) =>
    setDesign((d) => ({ ...d, [key]: value }));

  function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("backgroundImage", reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    setSaveState("saving");
    try {
      if (user) {
        const ok = await saveCloudDesign(user.id, template.id, design);
        setSaveState(ok ? "saved" : "error");
        setMessage(ok ? "Saved to your cloud — synced across devices." : "Could not save to cloud.");
      } else {
        saveLocalDesign(template.id, design);
        setSaveState("saved");
        setMessage(
          cloudEnabled
            ? "Saved on this device. Sign in to sync everywhere."
            : "Saved on this device.",
        );
      }
    } catch {
      setSaveState("error");
      setMessage("Something went wrong while saving.");
    }
    setTimeout(() => setSaveState("idle"), 2500);
  }

  function fileName(ext: string) {
    const slug = (design.headline || template.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
    return `namcraft-${slug || template.id}.${ext}`;
  }

  async function download(kind: "png" | "svg") {
    if (!exportRef.current) return;
    setBusy(kind);
    try {
      const options = { pixelRatio: 2, cacheBust: true, backgroundColor: "#ffffff" };
      const dataUrl =
        kind === "png"
          ? await toPng(exportRef.current, options)
          : await toSvg(exportRef.current, options);
      const link = document.createElement("a");
      link.download = fileName(kind);
      link.href = dataUrl;
      link.click();
    } catch {
      setMessage("Export failed — please try again.");
    } finally {
      setBusy(null);
    }
  }

  async function handlePrint() {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, { pixelRatio: 2, cacheBust: true });
      const w = window.open("", "_blank");
      if (!w) return;
      w.document.write(
        `<html><head><title>${template.title}</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh}img{max-width:100%;max-height:100%}</style></head><body><img src="${dataUrl}" onload="window.focus();window.print();"/></body></html>`,
      );
      w.document.close();
    } catch {
      setMessage("Could not open print view.");
    }
  }

  async function handleShare() {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, { pixelRatio: 2, cacheBust: true });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName("png"), { type: "image/png" });
      const nav = navigator as Navigator & {
        canShare?: (data: ShareData) => boolean;
      };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({
          files: [file],
          title: template.title,
          text: `Made with NAMCRAFT Graphic Studio`,
        });
      } else if (nav.share) {
        await nav.share({ title: template.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Sharing isn't supported here — link copied instead.");
      }
    } catch {
      /* user cancelled share — ignore */
    }
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* breadcrumb + title */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Link to="/templates" className="hover:text-foreground hover:underline">
                Templates
              </Link>
              <span aria-hidden="true">/</span>
              <span>{categoryLabel(template.category)}</span>
            </div>
            <h1 className="font-display mt-1 text-3xl font-black">{template.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteButton templateId={template.id} size={22} />
            <Button variant="outline" size="sm" onClick={handleShare}>
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          {/* Live preview */}
          <div className="order-1">
            <div className="border-border bg-muted/40 flex items-center justify-center rounded-3xl border p-4 sm:p-8">
              <div className="w-full max-w-xl">
                <DesignCanvas
                  ref={exportRef}
                  ratio={template.ratio}
                  design={design}
                  eyebrow={categoryLabel(template.category)}
                />
              </div>
            </div>

            {/* Export bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button onClick={() => download("png")} disabled={busy !== null}>
                {busy === "png" ? "Exporting…" : "⬇ Download PNG"}
              </Button>
              <Button variant="secondary" onClick={() => download("svg")} disabled={busy !== null}>
                {busy === "svg" ? "Exporting…" : "⬇ Download SVG"}
              </Button>
              <Button variant="outline" onClick={handleSave} disabled={saveState === "saving"}>
                {saveState === "saving"
                  ? "Saving…"
                  : saveState === "saved"
                    ? "✓ Saved"
                    : user
                      ? "☁ Save to cloud"
                      : "💾 Save"}
              </Button>
            </div>
            {message && (
              <p className="text-muted-foreground mt-3 text-sm" role="status">
                {message}
              </p>
            )}
          </div>

          {/* Controls */}
          <aside className="order-2 space-y-6">
            <Panel title="Text">
              <Field label="Headline">
                <input
                  type="text"
                  value={design.headline}
                  onChange={(e) => update("headline", e.target.value)}
                  className="editor-input"
                  placeholder="Your headline"
                />
              </Field>
              <Field label="Tagline">
                <textarea
                  value={design.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                  rows={2}
                  className="editor-input resize-none"
                  placeholder="A supporting line"
                />
              </Field>
              <Field label={`Headline size — ${design.headlineSize}px`}>
                <input
                  type="range"
                  min={48}
                  max={180}
                  value={design.headlineSize}
                  onChange={(e) => update("headlineSize", Number(e.target.value))}
                  className="accent-primary w-full"
                />
              </Field>
              <label className="flex items-center justify-between gap-3 text-sm font-medium">
                <span>Dark text</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={design.darkText}
                  onClick={() => update("darkText", !design.darkText)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition",
                    design.darkText ? "bg-primary" : "bg-border",
                  )}
                >
                  <span
                    className={cn(
                      "bg-card absolute top-0.5 h-5 w-5 rounded-full shadow transition-all",
                      design.darkText ? "left-[1.4rem]" : "left-0.5",
                    )}
                  />
                </button>
              </label>
            </Panel>

            <Panel title="Palette">
              <div className="grid grid-cols-4 gap-2">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => update("paletteId", p.id)}
                    title={p.name}
                    aria-label={p.name}
                    aria-pressed={design.paletteId === p.id}
                    className={cn(
                      "h-12 rounded-xl border-2 transition",
                      design.paletteId === p.id
                        ? "border-primary scale-105"
                        : "border-transparent hover:scale-105",
                    )}
                    style={{ background: p.bg }}
                  />
                ))}
              </div>
            </Panel>

            <Panel title="Font">
              <div className="grid gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => update("fontId", f.id)}
                    aria-pressed={design.fontId === f.id}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left text-sm transition",
                      design.fontId === f.id
                        ? "border-primary bg-muted"
                        : "border-border hover:bg-muted",
                    )}
                    style={{ fontFamily: f.stack }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Background image">
              <label className="border-border hover:bg-muted flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-sm font-medium transition">
                <span aria-hidden="true">🖼️</span>
                {design.backgroundImage ? "Replace image" : "Upload image"}
                <input type="file" accept="image/*" onChange={onUploadImage} className="hidden" />
              </label>
              {design.backgroundImage && (
                <button
                  type="button"
                  onClick={() => update("backgroundImage", null)}
                  className="text-destructive mt-2 text-sm font-semibold hover:underline"
                >
                  Remove image
                </button>
              )}
            </Panel>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border bg-card shadow-soft rounded-2xl border p-5">
      <h2 className="mb-4 text-sm font-bold tracking-wide uppercase">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-muted-foreground mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
