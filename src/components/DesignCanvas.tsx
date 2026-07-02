import { forwardRef, useEffect, useRef, useState } from "react";
import type { DesignState, DesignElement } from "~/lib/designStore";
import { getPalette } from "~/lib/palettes";
import { getFont } from "~/lib/fonts";
import { ratioToNumber, type AspectRatio } from "~/lib/templates";
import { ShapeGraphic } from "./ShapeGraphic";

/** The design is authored at this base resolution; everything scales from it so
 *  on-screen previews and exports stay pixel-consistent. */
export const BASE_WIDTH = 1080;

interface DesignCanvasProps {
  ratio: AspectRatio;
  design: DesignState;
  /** category / eyebrow label shown on the stamp chip */
  eyebrow?: string;
  className?: string;
  /** rounded corners on the visible frame (exports are never rounded) */
  rounded?: boolean;
  /** enable element selection + drag (editor only) */
  editable?: boolean;
  selectedId?: string | null;
  onSelectElement?: (id: string | null) => void;
  onElementChange?: (id: string, patch: Partial<DesignElement>) => void;
}

/**
 * Renders a design at any container size using a fixed base-resolution stage
 * that is visually scaled to fit. The forwarded ref points at the *unscaled*
 * stage node, so `html-to-image` captures it at full BASE_WIDTH resolution.
 */
export const DesignCanvas = forwardRef<HTMLDivElement, DesignCanvasProps>(
  function DesignCanvas(
    {
      ratio,
      design,
      eyebrow = "NAMCRAFT",
      className = "",
      rounded = true,
      editable = false,
      selectedId = null,
      onSelectElement,
      onElementChange,
    },
    exportRef,
  ) {
    const frameRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3);
    const scaleRef = useRef(scale);
    scaleRef.current = scale;

    const ratioNum = ratioToNumber(ratio);
    const baseHeight = Math.round(BASE_WIDTH / ratioNum);

    useEffect(() => {
      const frame = frameRef.current;
      if (!frame) return;
      const update = () => setScale(frame.clientWidth / BASE_WIDTH);
      update();
      const ro = new ResizeObserver(update);
      ro.observe(frame);
      return () => ro.disconnect();
    }, []);

    const palette = getPalette(design.paletteId);
    const font = getFont(design.fontId);
    const textColor = design.darkText ? palette.textDark : palette.textLight;
    const taglineSize = Math.max(18, Math.round(design.headlineSize * 0.34));
    const pad = Math.round(BASE_WIDTH * 0.067);
    const hasImage = Boolean(design.backgroundImage);
    const elements = design.elements ?? [];

    function startDrag(e: React.PointerEvent, el: DesignElement) {
      if (!editable) return;
      e.stopPropagation();
      onSelectElement?.(el.id);
      const startX = e.clientX;
      const startY = e.clientY;
      const origX = el.x;
      const origY = el.y;
      const move = (ev: PointerEvent) => {
        const s = scaleRef.current || 1;
        onElementChange?.(el.id, {
          x: origX + (ev.clientX - startX) / s,
          y: origY + (ev.clientY - startY) / s,
        });
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    }

    return (
      <div
        ref={frameRef}
        className={`relative overflow-hidden ${rounded ? "rounded-xl" : ""} ${className}`}
        style={{ width: "100%", aspectRatio: String(ratioNum) }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: BASE_WIDTH,
            height: baseHeight,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <div
            ref={exportRef}
            style={{
              position: "relative",
              width: BASE_WIDTH,
              height: baseHeight,
              overflow: "hidden",
              background: hasImage ? "#000" : palette.bg,
              color: textColor,
              fontFamily: font.stack,
            }}
          >
            {hasImage && (
              <>
                <img
                  src={design.backgroundImage as string}
                  alt=""
                  crossOrigin="anonymous"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                  }}
                />
              </>
            )}

            {/* Decorative stamp perforation ring */}
            <div
              style={{
                position: "absolute",
                inset: Math.round(pad * 0.55),
                border: `3px dashed ${textColor}`,
                opacity: 0.28,
                borderRadius: 22,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: pad,
                boxSizing: "border-box",
              }}
            >
              {/* Eyebrow / stamp chip */}
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    background: palette.accent,
                    color: palette.textDark,
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "10px 20px",
                    borderRadius: 999,
                  }}
                >
                  {eyebrow}
                </span>
              </div>

              {/* Headline + tagline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h2
                  style={{
                    fontSize: design.headlineSize,
                    fontWeight: 900,
                    lineHeight: 1.02,
                    margin: 0,
                    textWrap: "balance",
                  }}
                >
                  {design.headline || "Your headline"}
                </h2>
                <p
                  style={{
                    fontSize: taglineSize,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    margin: 0,
                    opacity: 0.92,
                    maxWidth: "82%",
                  }}
                >
                  {design.tagline || "Add a supporting tagline"}
                </p>
              </div>

              {/* Footer accent bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    width: 92,
                    height: 10,
                    borderRadius: 999,
                    background: palette.accent,
                  }}
                />
                <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.85 }}>
                  namcraft.studio
                </span>
              </div>
            </div>

            {/* Graphic elements layer (shapes + stickers) */}
            <div
              style={{ position: "absolute", inset: 0, pointerEvents: editable ? "auto" : "none" }}
              onPointerDown={(e) => {
                if (editable && e.target === e.currentTarget) onSelectElement?.(null);
              }}
            >
              {elements.map((el) => {
                const selected = editable && selectedId === el.id;
                return (
                  <div
                    key={el.id}
                    onPointerDown={(e) => startDrag(e, el)}
                    style={{
                      position: "absolute",
                      left: el.x,
                      top: el.y,
                      width: el.size,
                      height: el.size,
                      transform: `rotate(${el.rotation}deg)`,
                      cursor: editable ? "move" : "default",
                      outline: selected ? "4px solid #ffffff" : "none",
                      outlineOffset: 6,
                      boxShadow: selected ? "0 0 0 8px rgba(46,75,199,0.5)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      userSelect: "none",
                    }}
                  >
                    {el.kind === "shape" && el.shape ? (
                      <ShapeGraphic type={el.shape} color={el.color} size={el.size} />
                    ) : (
                      <span style={{ fontSize: el.size, lineHeight: 1 }}>{el.emoji}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
