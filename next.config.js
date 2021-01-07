const withMdx = require('next-mdx-enhanced');
const withPWA = require('next-pwa');

const defaultConfig = {
  // Target must be serverless
  target: 'serverless',
  i18n: {
    locales: ['en', 'hu'],
    defaultLocale: 'en',
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    dest: 'public',
    sw: 'service-worker.js',
  },
};

module.exports = withPWA(
  withMdx({
    layoutPath: 'layouts',
    defaultLayout: false,
    fileExtensions: ['mdx'],
    remarkPlugins: [],
    rehypePlugins: [],
    usesSrc: false,
    reExportDataFetching: false,
    extendFrontMatter: {
      process: async (_, frontmatter) => {
        const { __resourcePath } = frontmatter;

        const slug = __resourcePath.replace('.mdx', '');

        return {
          slug,
        };
      },
    },
  })(defaultConfig),
);
