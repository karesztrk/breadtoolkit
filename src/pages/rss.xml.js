import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";

/**
 * @typedef {import('astro').APIContext} Context
 * @typedef {import('@astrojs/rss').RSSFeedItem} RSSFeedItem
 */

/**
 * GET endpoint handler
 * @param {Context} context
 * @returns {Promise<Response>}
 */
export const GET = async (context) => {
  let baseUrl = context.site?.href || "";
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  const posts = await getCollection("Recipes");

  const container = await AstroContainer.create();

  const items = /** @type {Array<RSSFeedItem>} */ ([]);
  for (const post of posts) {
    const { Content } = await render(post);
    // Use the Astro container to render the content to a string.
    const html = await container.renderToString(Content);

    // Process and sanitize the raw content:
    // - Removes `<!DOCTYPE html>` preamble
    // - Makes link `href` and image `src` attributes absolute instead of relative
    // - Strips any `<script>` and `<style>` tags
    // Thanks @delucis — https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
    const content = await transform(html.replace(/^<!DOCTYPE html>/, ""), [
      async (node) => {
        await walk(node, (node) => {
          if (node.name === "a" && node.attributes.href?.startsWith("/")) {
            node.attributes.href = baseUrl + node.attributes.href;
          }
          if (node.name === "img" && node.attributes.src?.startsWith("/")) {
            node.attributes.src = baseUrl + node.attributes.src;
          }
        });
        return node;
      },
      sanitize({ dropElements: ["script", "style"] }),
    ]);

    items.push({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/recipes/${post.id}/`,
      content: `<![CDATA[${content}]]>`,
    });
  }
  return rss({
    title: "Bread Toolkit Recipes",
    description: "Recipes published on BreadToolkit",
    site: context.url || "",
    items,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
    },
    customData: `
      <language>en-GB</language>
      `,
  });
};
