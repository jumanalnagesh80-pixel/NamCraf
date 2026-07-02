import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles.css?url";
import { seo, SITE_NAME, SITE_URL, OG_IMAGE } from "~/lib/seo";
import { themeInitScript, ThemeProvider } from "~/hooks/useTheme";
import { AuthProvider } from "~/hooks/useAuth";
import { FavoritesProvider } from "~/hooks/useFavorites";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: OG_IMAGE,
  description:
    "A playful, hand-crafted design platform. Browse studio templates and remix them in a live editor.",
  sameAs: [
    "https://instagram.com/namcraft.studio",
    "https://twitter.com/namcraft",
    "https://dribbble.com/namcraft",
  ],
};

export const Route = createRootRoute({
  head: () => {
    const base = seo({ path: "/" });
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#2E4BC7" },
        ...base.meta,
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@500;700;900&display=swap",
        },
        // NOTE: canonical is intentionally omitted here. Each leaf route emits
        // its own self-referencing canonical via seo(), and TanStack does not
        // dedupe <link> tags — so emitting one here too would produce duplicates.
      ],
    };
  },
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => (
    <RootDocument>
      <NotFound />
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Outlet />
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-flash theme init — must run before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
