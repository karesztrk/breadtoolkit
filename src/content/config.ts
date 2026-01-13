import { defineCollection, z } from "astro:content";

const schema = defineCollection({
  type: "content",
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

export const collections = {
  Recipes: schema,
};
