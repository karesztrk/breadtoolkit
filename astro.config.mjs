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
});
