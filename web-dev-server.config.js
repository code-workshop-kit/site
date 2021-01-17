require('dotenv').config();
const { fromRollup } = require('@web/dev-server-rollup');
const replace = require('@rollup/plugin-replace');

const wdsReplace = fromRollup(replace);

module.exports = {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: 'pages/index.html',
  plugins: [
    wdsReplace({
      values: {
        "'/api/": "'http://localhost:3000/api/",
      },
      delimiters: ['', ''],
    }),
  ],
  middleware: [
    function rewriteIndex(context, next) {
      // extensionless routes: append .html
      if (!context.url.endsWith('/') && context.url.includes('/') && !context.url.includes('.')) {
        context.url = `${context.url}.html`;
      }
      return next();
    },
    // try to find html files inside /pages/. This could happen if the backend tries to do a redirect for us, e.g. for github auth
    function rewriteIndex(context, next) {
      if (
        context.status === 404 &&
        context.url.endsWith('.html') &&
        !context.url.startsWith('/pages/')
      ) {
        context.redirect(`/pages${context.url}`);
      }
      return next();
    },
  ],
};
