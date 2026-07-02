import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toPng, toSvg, toJpeg } from "html-to-image";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { DesignCanvas, BASE_WIDTH } from "~/components/DesignCanvas";
import { ShapeGraphic } from "~/components/ShapeGraphic";
import { FavoriteButton } from "~/components/FavoriteButton";
import { Button } from "~/components/ui/Button";
import { useToast } from "~/components/ui/Toast";
import { PALETTES, getPalette } from "~/lib/palettes";
import { fontsByLanguage, getFont } from "~/lib/fonts";
import { SHAPES, STICKER_SETS, type ShapeType } from "~/lib/graphics";
import { categoryLabel, getTemplate, ratioToNumber } from "~/lib/templates";
import {
  defaultDesign,
  defaultBgFilters,
  loadLocalDesign,
  saveLocalDesign,
  loadCloudDesign,
  saveCloudDesign,
  type DesignState,
  type DesignElement,
} from "~/lib/designStore";
import { useAuth } from "~/hooks/useAuth";
import { cn } from "~/lib/utils";

const SHAPE_COLORS = ["#2E4BC7", "#F26E86", "#F7D94C", "#FBF5E9", "#1E2340", "#3FBFA0", "#FFFFFF"];

function uid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `el-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
}

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
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "svg">("png");
  const [exportScale, setExportScale] = useState(2);
  const [transparent, setTransparent] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stickerSet, setStickerSet] = useState(STICKER_SETS[0].id);

  // ---- Undo / redo history ----
  const pastRef = useRef<DesignState[]>([]);
  const futureRef = useRef<DesignState[]>([]);
  const baselineRef = useRef<DesignState>(design);
  const skipHistoryRef = useRef(false);
  const [, bumpHistory] = useState(0);
  const canUndo = pastRef.current.length > 0;
  const canRedo = futureRef.current.length > 0;

  // Debounced commit: a burst of edits (e.g. a drag) becomes one undo step.
  useEffect(() => {
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false;
      baselineRef.current = design;
      return;
    }
    const id = setTimeout(() => {
      if (baselineRef.current !== design) {
        pastRef.current.push(baselineRef.current);
        if (pastRef.current.length > 60) pastRef.current.shift();
        futureRef.current = [];
        baselineRef.current = design;
        bumpHistory((n) => n + 1);
      }
    }, 400);
    return () => clearTimeout(id);
  }, [design]);

  function undo() {
    if (!pastRef.current.length) return;
    futureRef.current.push(design);
    const prev = pastRef.current.pop() as DesignState;
    baselineRef.current = prev;
    skipHistoryRef.current = true;
    setSelectedId(null);
    setDesign(prev);
    bumpHistory((n) => n + 1);
  }

  function redo() {
    if (!futureRef.current.length) return;
    pastRef.current.push(design);
    const next = futureRef.current.pop() as DesignState;
    baselineRef.current = next;
    skipHistoryRef.current = true;
    setSelectedId(null);
    setDesign(next);
    bumpHistory((n) => n + 1);
  }

  function resetHistory(next: DesignState) {
    pastRef.current = [];
    futureRef.current = [];
    baselineRef.current = next;
    skipHistoryRef.current = true;
    setDesign(next);
    bumpHistory((n) => n + 1);
  }

  const baseHeight = Math.round(BASE_WIDTH / ratioToNumber(template.ratio));
  const selectedEl = design.elements.find((e) => e.id === selectedId) ?? null;

  const setElements = (updater: (els: DesignElement[]) => DesignElement[]) =>
    setDesign((d) => ({ ...d, elements: updater(d.elements) }));

  const onElementChange = (id: string, patch: Partial<DesignElement>) =>
    setElements((els) => els.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  function addShape(shape: ShapeType) {
    const id = uid();
    const size = Math.round(BASE_WIDTH * 0.18);
    setElements((els) => [
      ...els,
      {
        id,
        kind: "shape",
        shape,
        x: BASE_WIDTH / 2 - size / 2,
        y: baseHeight / 2 - size / 2,
        size,
        color: getPalette(design.paletteId).accent,
        rotation: 0,
      },
    ]);
    setSelectedId(id);
  }

  function addSticker(emoji: string) {
    const id = uid();
    const size = Math.round(BASE_WIDTH * 0.14);
    setElements((els) => [
      ...els,
      { id, kind: "sticker", emoji, x: BASE_WIDTH / 2 - size / 2, y: baseHeight / 2 - size / 2, size, color: "#000", rotation: 0, opacity: 1, flipH: false },
    ]);
    setSelectedId(id);
  }

  function addText() {
    const id = uid();
    const size = Math.round(BASE_WIDTH * 0.06);
    setElements((els) => [
      ...els,
      {
        id,
        kind: "text",
        text: "Your text",
        fontId: design.fontId,
        x: BASE_WIDTH / 2 - 160,
        y: baseHeight / 2 - size / 2,
        size,
        color: "#FFFFFF",
        rotation: 0,
        opacity: 1,
        flipH: false,
      },
    ]);
    setSelectedId(id);
  }

  function removeSelected() {
    if (!selectedId) return;
    setElements((els) => els.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  }

  function reorderSelected(dir: "front" | "back") {
    if (!selectedId) return;
    setElements((els) => {
      const idx = els.findIndex((e) => e.id === selectedId);
      if (idx < 0) return els;
      const copy = [...els];
      const [item] = copy.splice(idx, 1);
      if (dir === "front") copy.push(item);
      else copy.unshift(item);
      return copy;
    });
  }

  function duplicateSelected() {
    if (!selectedId) return;
    const el = design.elements.find((e) => e.id === selectedId);
    if (!el) return;
    const id = uid();
    setElements((els) => [...els, { ...el, id, x: el.x + 40, y: el.y + 40 }]);
    setSelectedId(id);
  }

  function alignSelected(axis: "h" | "v") {
    if (!selectedEl) return;
    const w = selectedEl.kind === "text" ? selectedEl.size * 3 : selectedEl.size;
    const h = selectedEl.kind === "text" ? selectedEl.size * 1.2 : selectedEl.size;
    if (axis === "h") onElementChange(selectedEl.id, { x: BASE_WIDTH / 2 - w / 2 });
    else onElementChange(selectedEl.id, { y: baseHeight / 2 - h / 2 });
  }

  const bgFilters = design.bgFilters ?? defaultBgFilters();
  const setBgFilter = (key: keyof typeof bgFilters, value: number) =>
    setDesign((d) => ({
      ...d,
      bgFilters: { ...(d.bgFilters ?? defaultBgFilters()), [key]: value },
    }));

  // Keyboard shortcuts for the selected element: Esc = deselect,
  // Delete/Backspace = remove, arrows = nudge (Shift = larger step).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const typing =
        !!t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable);
      if (typing) return;

      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
        return;
      }
      if (mod && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
        return;
      }
      if (mod && e.key.toLowerCase() === "d") {
        e.preventDefault();
        duplicateSelected();
        return;
      }

      if (!selectedId) return;

      if (e.key === "Escape") return setSelectedId(null);
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        return removeSelected();
      }
      const el = design.elements.find((x) => x.id === selectedId);
      if (!el) return;
      const step = e.shiftKey ? 40 : 10;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onElementChange(selectedId, { x: el.x - step });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onElementChange(selectedId, { x: el.x + step });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        onElementChange(selectedId, { y: el.y - step });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onElementChange(selectedId, { y: el.y + step });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design, selectedId]);

  // Restore a previously saved design (cloud when signed in, else local).
  useEffect(() => {
    let active = true;
    async function restore() {
      let saved: DesignState | null = null;
      if (user) saved = await loadCloudDesign(user.id, template.id);
      if (!saved) saved = loadLocalDesign(template.id);
      if (saved && active) resetHistory(saved);
    }
    void restore();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        toast(
          ok ? "Saved to your cloud — synced across devices." : "Could not save to cloud.",
          ok ? "success" : "error",
        );
      } else {
        saveLocalDesign(template.id, design);
        setSaveState("saved");
        const msg = cloudEnabled
          ? "Saved on this device. Sign in to sync everywhere."
          : "Saved on this device.";
        setMessage(msg);
        toast(msg, "success");
      }
    } catch {
      setSaveState("error");
      setMessage("Something went wrong while saving.");
      toast("Something went wrong while saving.", "error");
    }
    setTimeout(() => setSaveState("idle"), 2500);
  }

  // Clear the selection ring before rasterizing so it isn't captured.
  async function deselectForCapture() {
    setSelectedId(null);
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r(null))),
    );
  }

  function fileName(ext: string) {
    const slug = (design.headline || template.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
    return `namcraft-${slug || template.id}.${ext}`;
  }

  async function download() {
    if (!exportRef.current) return;
    setBusy(true);
    await deselectForCapture();
    try {
      const node = exportRef.current;
      const opts: Record<string, unknown> = { cacheBust: true };
      if (exportFormat === "svg") {
        opts.pixelRatio = 1;
      } else {
        opts.pixelRatio = exportScale;
      }
      if (exportFormat === "png") {
        if (!transparent) opts.backgroundColor = "#ffffff";
      } else if (exportFormat === "jpg") {
        opts.backgroundColor = "#ffffff";
        opts.quality = 0.95;
      }
      const dataUrl =
        exportFormat === "png"
          ? await toPng(node, opts)
          : exportFormat === "jpg"
            ? await toJpeg(node, opts)
            : await toSvg(node, opts);
      const link = document.createElement("a");
      link.download = fileName(exportFormat);
      link.href = dataUrl;
      link.click();
      toast(
        `Downloaded ${exportFormat.toUpperCase()}${exportFormat !== "svg" ? ` @ ${exportScale}×` : ""}`,
        "success",
      );
    } catch {
      setMessage("Export failed — please try again.");
      toast("Export failed — please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  async function handlePrint() {
    if (!exportRef.current) return;
    await deselectForCapture();
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
    await deselectForCapture();
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
            <div className="glass mr-1 flex items-center gap-1 rounded-full p-1">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                aria-label="Undo"
                title="Undo (Ctrl/Cmd+Z)"
                className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full text-lg transition disabled:opacity-40"
              >
                ↶
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                aria-label="Redo"
                title="Redo (Ctrl/Cmd+Shift+Z)"
                className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full text-lg transition disabled:opacity-40"
              >
                ↷
              </button>
            </div>
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
                  editable
                  selectedId={selectedId}
                  onSelectElement={setSelectedId}
                  onElementChange={onElementChange}
                />
              </div>
              {design.elements.length > 0 && (
                <p className="text-muted-foreground mt-3 text-center text-xs">
                  Tip: tap a shape or sticker to select it, then drag to move it.
                </p>
              )}
            </div>

            {/* Export options */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as "png" | "jpg" | "svg")}
                className="border-border bg-card rounded-full border px-3 py-2 text-sm font-medium outline-none"
                aria-label="Export format"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG (vector)</option>
              </select>
              <select
                value={exportScale}
                onChange={(e) => setExportScale(Number(e.target.value))}
                disabled={exportFormat === "svg"}
                className="border-border bg-card rounded-full border px-3 py-2 text-sm font-medium outline-none disabled:opacity-50"
                aria-label="Export scale"
              >
                <option value={1}>1× · 1080px</option>
                <option value={2}>2× · 2160px</option>
                <option value={3}>3× · 3240px</option>
              </select>
              {exportFormat === "png" && (
                <label className="border-border flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={transparent}
                    onChange={(e) => setTransparent(e.target.checked)}
                    className="accent-primary"
                  />
                  Transparent
                </label>
              )}
              <Button
                onClick={download}
                disabled={busy}
                className="bg-gradient-neon glow animate-gradient-move"
              >
                {busy ? "Exporting…" : "⬇ Download"}
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

            <Panel title="Font · all languages">
              <select
                value={design.fontId}
                onChange={(e) => update("fontId", e.target.value)}
                className="editor-input"
                aria-label="Font family"
              >
                {fontsByLanguage().map((group) => (
                  <optgroup key={group.lang} label={group.lang}>
                    {group.fonts.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p
                className="border-border mt-3 truncate rounded-xl border px-3 py-3 text-center text-xl"
                style={{ fontFamily: getFont(design.fontId).stack }}
              >
                {design.headline || "Aa · अ · ع · あ · 한"}
              </p>
            </Panel>

            <Panel title="Elements · text, shapes & stickers">
              <Button variant="outline" className="glass mb-4 w-full" onClick={addText}>
                ➕ Add a text box
              </Button>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Shapes
              </div>
              <div className="grid grid-cols-6 gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => addShape(s.id)}
                    title={s.name}
                    aria-label={`Add ${s.name}`}
                    className="border-border hover:bg-muted hover:border-primary flex aspect-square items-center justify-center rounded-lg border p-1.5 transition"
                  >
                    <ShapeGraphic type={s.id} color="currentColor" size={26} />
                  </button>
                ))}
              </div>

              <div className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Stickers
              </div>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {STICKER_SETS.map((set) => (
                  <button
                    key={set.id}
                    type="button"
                    onClick={() => setStickerSet(set.id)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition",
                      stickerSet === set.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    {set.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {(STICKER_SETS.find((s) => s.id === stickerSet) ?? STICKER_SETS[0]).emoji.map(
                  (emoji, i) => (
                    <button
                      key={`${emoji}-${i}`}
                      type="button"
                      onClick={() => addSticker(emoji)}
                      className="hover:bg-muted rounded-lg py-1.5 text-2xl transition"
                      aria-label="Add sticker"
                    >
                      {emoji}
                    </button>
                  ),
                )}
              </div>
            </Panel>

            {selectedEl && (
              <Panel title={`Selected ${selectedEl.kind}`}>
                {selectedEl.kind === "text" && (
                  <>
                    <Field label="Text">
                      <textarea
                        value={selectedEl.text ?? ""}
                        onChange={(e) => onElementChange(selectedEl.id, { text: e.target.value })}
                        rows={2}
                        className="editor-input resize-none"
                        placeholder="Type your text"
                      />
                    </Field>
                    <Field label="Font">
                      <select
                        value={selectedEl.fontId ?? design.fontId}
                        onChange={(e) => onElementChange(selectedEl.id, { fontId: e.target.value })}
                        className="editor-input"
                      >
                        {fontsByLanguage().map((group) => (
                          <optgroup key={group.lang} label={group.lang}>
                            {group.fonts.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </Field>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onElementChange(selectedEl.id, { bold: !selectedEl.bold })}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm font-black",
                          selectedEl.bold ? "border-primary bg-muted" : "border-border",
                        )}
                        aria-pressed={Boolean(selectedEl.bold)}
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => onElementChange(selectedEl.id, { italic: !selectedEl.italic })}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm italic",
                          selectedEl.italic ? "border-primary bg-muted" : "border-border",
                        )}
                        aria-pressed={Boolean(selectedEl.italic)}
                      >
                        I
                      </button>
                      {(["left", "center", "right"] as const).map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => onElementChange(selectedEl.id, { align: a })}
                          className={cn(
                            "rounded-lg border px-2.5 py-1.5 text-xs",
                            (selectedEl.align ?? "center") === a
                              ? "border-primary bg-muted"
                              : "border-border",
                          )}
                          aria-label={`Align ${a}`}
                        >
                          {a === "left" ? "⬅" : a === "center" ? "↔" : "➡"}
                        </button>
                      ))}
                    </div>
                    <Field label={`Letter spacing — ${selectedEl.letterSpacing ?? 0}px`}>
                      <input
                        type="range"
                        min={-5}
                        max={30}
                        value={selectedEl.letterSpacing ?? 0}
                        onChange={(e) =>
                          onElementChange(selectedEl.id, { letterSpacing: Number(e.target.value) })
                        }
                        className="accent-primary w-full"
                      />
                    </Field>
                  </>
                )}

                <Field label={`Size — ${Math.round(selectedEl.size)}px`}>
                  <input
                    type="range"
                    min={selectedEl.kind === "text" ? 20 : 40}
                    max={640}
                    value={selectedEl.size}
                    onChange={(e) => onElementChange(selectedEl.id, { size: Number(e.target.value) })}
                    className="accent-primary w-full"
                  />
                </Field>
                <Field label={`Rotation — ${Math.round(selectedEl.rotation)}°`}>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={selectedEl.rotation}
                    onChange={(e) =>
                      onElementChange(selectedEl.id, { rotation: Number(e.target.value) })
                    }
                    className="accent-primary w-full"
                  />
                </Field>
                <Field label={`Opacity — ${Math.round((selectedEl.opacity ?? 1) * 100)}%`}>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={Math.round((selectedEl.opacity ?? 1) * 100)}
                    onChange={(e) =>
                      onElementChange(selectedEl.id, { opacity: Number(e.target.value) / 100 })
                    }
                    className="accent-primary w-full"
                  />
                </Field>

                {(selectedEl.kind === "shape" || selectedEl.kind === "text") && (
                  <div>
                    <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                      Color
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {SHAPE_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => onElementChange(selectedEl.id, { color: c })}
                          aria-label={`Color ${c}`}
                          className={cn(
                            "h-7 w-7 rounded-full border-2 transition",
                            selectedEl.color === c ? "border-primary scale-110" : "border-border",
                          )}
                          style={{ background: c }}
                        />
                      ))}
                      <input
                        type="color"
                        value={selectedEl.color}
                        onChange={(e) => onElementChange(selectedEl.id, { color: e.target.value })}
                        className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                        aria-label="Custom color"
                      />
                    </div>
                  </div>
                )}

                <label className="flex items-center justify-between gap-3 pt-1 text-sm font-medium">
                  <span>Flip horizontally</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(selectedEl.flipH)}
                    onClick={() => onElementChange(selectedEl.id, { flipH: !selectedEl.flipH })}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition",
                      selectedEl.flipH ? "bg-primary" : "bg-border",
                    )}
                  >
                    <span
                      className={cn(
                        "bg-card absolute top-0.5 h-5 w-5 rounded-full shadow transition-all",
                        selectedEl.flipH ? "left-[1.4rem]" : "left-0.5",
                      )}
                    />
                  </button>
                </label>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => alignSelected("h")}>
                    ↔ Center
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => alignSelected("v")}>
                    ↕ Center
                  </Button>
                  <Button size="sm" variant="outline" onClick={duplicateSelected}>
                    ⧉ Duplicate
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => reorderSelected("front")}>
                    ⬆ Front
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => reorderSelected("back")}>
                    ⬇ Back
                  </Button>
                  <Button size="sm" variant="outline" onClick={removeSelected}>
                    🗑 Delete
                  </Button>
                </div>
                <p className="text-muted-foreground pt-1 text-xs">
                  Shortcuts: drag to move · arrow keys to nudge · Delete to remove · Esc to deselect.
                </p>
              </Panel>
            )}

            {design.elements.length > 0 && (
              <Panel title={`Layers · ${design.elements.length}`}>
                <div className="space-y-1.5">
                  {[...design.elements].reverse().map((el) => (
                    <div
                      key={el.id}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-sm transition",
                        selectedId === el.id
                          ? "border-primary bg-muted"
                          : "border-border hover:bg-muted",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(el.id)}
                        className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      >
                        <span className="text-base" aria-hidden="true">
                          {el.kind === "sticker" ? el.emoji : el.kind === "text" ? "🅣" : "◆"}
                        </span>
                        <span className="truncate">
                          {el.kind === "text"
                            ? el.text || "Text"
                            : el.kind === "sticker"
                              ? "Sticker"
                              : (el.shape ?? "Shape")}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setElements((els) => els.filter((x) => x.id !== el.id));
                          if (selectedId === el.id) setSelectedId(null);
                        }}
                        aria-label="Delete layer"
                        className="text-muted-foreground hover:text-destructive px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            <Panel title="Background image">
              <label className="border-border hover:bg-muted flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-sm font-medium transition">
                <span aria-hidden="true">🖼️</span>
                {design.backgroundImage ? "Replace image" : "Upload image"}
                <input type="file" accept="image/*" onChange={onUploadImage} className="hidden" />
              </label>
              {design.backgroundImage && (
                <>
                  <button
                    type="button"
                    onClick={() => update("backgroundImage", null)}
                    className="text-destructive mt-2 text-sm font-semibold hover:underline"
                  >
                    Remove image
                  </button>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Adjust
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setDesign((d) => ({ ...d, bgFilters: defaultBgFilters() }))
                        }
                        className="text-primary text-xs font-semibold hover:underline"
                      >
                        Reset
                      </button>
                    </div>
                    <Field label={`Brightness — ${bgFilters.brightness}%`}>
                      <input type="range" min={0} max={200} value={bgFilters.brightness}
                        onChange={(e) => setBgFilter("brightness", Number(e.target.value))}
                        className="accent-primary w-full" />
                    </Field>
                    <Field label={`Contrast — ${bgFilters.contrast}%`}>
                      <input type="range" min={0} max={200} value={bgFilters.contrast}
                        onChange={(e) => setBgFilter("contrast", Number(e.target.value))}
                        className="accent-primary w-full" />
                    </Field>
                    <Field label={`Saturation — ${bgFilters.saturate}%`}>
                      <input type="range" min={0} max={200} value={bgFilters.saturate}
                        onChange={(e) => setBgFilter("saturate", Number(e.target.value))}
                        className="accent-primary w-full" />
                    </Field>
                    <Field label={`Blur — ${bgFilters.blur}px`}>
                      <input type="range" min={0} max={20} value={bgFilters.blur}
                        onChange={(e) => setBgFilter("blur", Number(e.target.value))}
                        className="accent-primary w-full" />
                    </Field>
                    <Field label={`Grayscale — ${bgFilters.grayscale}%`}>
                      <input type="range" min={0} max={100} value={bgFilters.grayscale}
                        onChange={(e) => setBgFilter("grayscale", Number(e.target.value))}
                        className="accent-primary w-full" />
                    </Field>
                  </div>
                </>
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
