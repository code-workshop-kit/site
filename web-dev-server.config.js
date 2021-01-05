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
  ],
};
