const fs = require('fs');
const globby = require('globby');

(async () => {
  const pages = await globby(['pages/**/*{.tsx,.mdx,.md}', '!pages/_*.tsx']);
  const lastmod = new Date();
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
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
              <loc>${`https://breadtoolkit.netlify.app${route}`}</loc>
              <lastmod>${lastmod.getFullYear()}-${
                  lastmod.getMonth() + 1
                }-${lastmod.getDate()}</lastmod>
              <priority>0.5</priority>
              <xhtml:link 
                rel="alternate"
                hreflang="hu"
                href="https://breadtoolkit.netlify.app/hu${route}"/>
          </url>`;
              })
              .join('')}
        </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
