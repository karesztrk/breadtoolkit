import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

/**
 * @typedef {import('astro').APIContext} Context
 */

/**
 * GET endpoint handler
 * @param {Context} context
 * @returns {Promise<Response>}
 */
export const GET = async (context) => {
  const posts = await getCollection("Recipes");
  return rss({
    title: "Recipes",
    description: "Recipes published on BreadToolkit",
    site: context.url || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/recipes/${post.id}/`,
    })),
  });
};
