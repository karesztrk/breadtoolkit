const withMdx = require('next-mdx-enhanced');
const withPWA = require('next-pwa');

const defaultConfig = {
  env: {
    siteUrl: process.env.URL,
  },
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(
  withMdx({
    layoutPath: 'layouts',
    defaultLayout: false,
    fileExtensions: ['mdx', 'md'],
    remarkPlugins: [],
    rehypePlugins: [],
    usesSrc: false,
    reExportDataFetching: false,
    extendFrontMatter: {
      process: async (_, frontmatter) => {
        const { __resourcePath } = frontmatter;

        const slug = __resourcePath.replace(/\.md.?/i, '');

        return {
          slug,
        };
      },
    },
  })(defaultConfig),
);
