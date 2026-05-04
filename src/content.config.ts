import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const schema = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/Recipes" }),
  schema: ({ image }) =>
    z.object({
      tags: z.array(z.string()),
      date: z.date(),
      cover: image(),
      coverAlt: z.string(),
      coverCaption: z.string().optional(),
      title: z.string(),
      language: z.union([z.literal("hu"), z.literal("en")]),
    }),
});

export const collections = { recipes: schema };
