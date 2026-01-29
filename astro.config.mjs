import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

export default defineConfig({
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist(">0.3%, last 2 versions, not dead")),
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
  site: process.env.URL,
  integrations: [
    sitemap({
      filter: (page) => page !== "library" && page !== "browser-api",
    }),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Bread Toolkit",
        name: "Bread Toolkit",
        description:
          "Online tools to help your bread baking journey. Bread toolkit gives your free recipes, guides and calculators to work with high hydration artisan breads.",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "logo32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "maskable_icon.png",
            type: "image/png",
            sizes: "349x349",
            purpose: "maskable",
          },
        ],
        start_url: "/",
        orientation: "portrait",
        display: "standalone",
        theme_color: "#fbf5eb", // Calculated from oklch(0.9719 0.0152 82.79);
        background_color: "#01111e", // Calculated from oklch(0.1118 0.0457 29.23)
      },
    }),
  ],
});
