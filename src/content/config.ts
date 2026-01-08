import { defineCollection, z } from "astro:content";

const schema = defineCollection({
  type: "content",
  schema: z.object({
    tags: z.array(z.string()),
    date: z.date(),
    coverImage: z.string(),
    coverImageAlt: z.string(),
    title: z.string(),
    language: z.union([z.literal("hu"), z.literal("en")]),
  }),
});

export const collections = {
  Recipes: schema,
};
