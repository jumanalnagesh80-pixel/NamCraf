import { createServerFileRoute } from "@tanstack/react-start/server";
import { SITE_URL } from "~/lib/seo";
import { TEMPLATES } from "~/lib/templates";

/**
 * Dynamic sitemap.xml server route.
 *
 * File name `sitemap[.]xml.ts` maps to the literal path `/sitemap.xml`.
 * If your installed TanStack Start version exposes a different server-route
 * API, this single file may need a small tweak (or move the generated XML to
 * `public/sitemap.xml`). Everything else in the app is framework-standard.
 */
function buildSitemap(): string {
  const staticPaths = ["/", "/templates", "/contact", "/auth", "/favorites"];
  const templatePaths = TEMPLATES.map((t) => `/templates/${t.id}`);
  const all = [...staticPaths, ...templatePaths];
  const today = new Date().toISOString().slice(0, 10);

  const urls = all
    .map((path) => {
      const loc = `${SITE_URL}${path === "/" ? "" : path}`;
      const priority = path === "/" ? "1.0" : path.startsWith("/templates/") ? "0.7" : "0.8";
      const changefreq = path === "/" || path === "/templates" ? "daily" : "weekly";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const ServerRoute = createServerFileRoute().methods({
  GET: () => {
    return new Response(buildSitemap(), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
});
