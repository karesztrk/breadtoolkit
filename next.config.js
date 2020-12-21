const withPWA = require('next-pwa');

module.exports = withPWA({
  // Target must be serverless
  target: 'serverless',
  i18n: {
    locales: ['en', 'hu'],
    defaultLocale: 'en',
  },
  pwa: {
    dest: 'public',
  },
});
