const withPWA = require('next-pwa');

module.exports = withPWA({
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
});
