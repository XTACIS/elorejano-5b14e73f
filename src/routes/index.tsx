import { createFileRoute } from "@tanstack/react-router";

// The home page serves the original El Orejano site as-is: a self-contained
// HTML document (with its own title, meta, images and fonts) returned by the
// server handler for GET "/".
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "El Orejano — Galería Güemes | Marroquinería y cuero argentino",
      },
      {
        name: "description",
        content:
          "El Orejano ofrece marroquinería, calzado, prendas y accesorios de cuero en Galería Güemes, Buenos Aires.",
      },
      { property: "og:title", content: "El Orejano — Galería Güemes" },
      {
        property: "og:description",
        content:
          "Marroquinería, calzado, prendas y accesorios de cuero argentino en pleno centro de Buenos Aires.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  server: {
    handlers: {
      GET: async () => {
        const { siteHtml } = await import(
          "@/lib/elorejano-site.server"
        );
        return new Response(siteHtml, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=0, must-revalidate",
          },
        });
      },
    },
  },
});
