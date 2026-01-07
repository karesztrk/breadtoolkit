/**
 * @typedef {import('astro').APIContext} Context
 */

/**
 * `robots.txt` base part.
 */
const base = `\
User-agent: *
Allow: /
`;

/**
 * @param {URL | undefined} url
 */
const getRobotsTxt = (url) => (url ? `Sitemap: ${url.href}` : "");

/**
 * GET endpoint handler
 * @param {Context} context
 * @returns {Promise<Response>}
 */
export const GET = async ({ site }) => {
  const sitemapURL = site && new URL("sitemap-index.xml", site);
  const parts = [base, getRobotsTxt(sitemapURL)];
  return new Response(parts.join("\n"));
};
