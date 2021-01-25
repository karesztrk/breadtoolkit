const fs = require('fs');
const globby = require('globby');

(async () => {
  console.log(`Generating site map for '${process.env.URL}'`);
  const pages = await globby(['pages/**/*{.tsx,.mdx,.md}', '!pages/_*.tsx']);
  const lastmod = new Date();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                  .replace('.md', '');
                const route = path === '/index' ? '' : path;
                return `
          <url>
              <loc>${`${process.env.URL}${route}`}</loc>
              <lastmod>${lastmod.toISOString().split('T')[0]}</lastmod>
              <priority>0.5</priority>
              <xhtml:link 
                rel="alternate"
                hreflang="hu"
                href="${process.env.URL}/hu${route}"/>
          </url>`;
              })
              .join('')}
        </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
