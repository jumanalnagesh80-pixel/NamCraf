/**
 * SEO helper — builds the `meta` + `links` head arrays for a route.
 * Produces title, description, canonical, OpenGraph and Twitter card tags.
 */

export const SITE_NAME = "NAMCRAFT Graphic Studio";
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://namcraft.studio"
).replace(/\/$/, "");
export const OG_IMAGE = `${SITE_URL}/og-namcraft.svg`;

type MetaTag =
  | { title: string }
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string };

type LinkTag = { rel: string; href: string; [key: string]: string };

export interface SeoOptions {
  title?: string;
  description?: string;
  /** Route path beginning with "/" — used for canonical + og:url. */
  path?: string;
  image?: string;
  /** "website" (default) or "article". */
  type?: string;
  keywords?: string;
}

export function seo({
  title,
  description = "NAMCRAFT Graphic Studio is a free-to-use online graphic design tool. Design anything — browse 3M+ templates for logos, posters, social posts and more, and remix them in a live editor. No download, no signup required.",
  path = "/",
  image = OG_IMAGE,
  type = "website",
  keywords = "free online graphic design tool, free design tool, graphic design, design maker, templates, logo maker, poster maker, social media design, resume maker, online editor, NAMCRAFT",
}: SeoOptions = {}): { meta: MetaTag[]; links: LinkTag[] } {
  const fullTitle = title
    ? `${title} · ${SITE_NAME}`
    : `${SITE_NAME} — Free Online Graphic Design Tool`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: SITE_NAME },

      // OpenGraph
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
