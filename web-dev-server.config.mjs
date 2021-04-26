import { createRequire } from 'module';
import relativeLinks, { transformCode } from './rollup/rollupPluginRelativeLinks.js';
import initialThemeScript from './scripts/initial-theme-script.js';

const require = createRequire(import.meta.url);
const { fromRollup } = require('@web/dev-server-rollup');
const replace = require('@rollup/plugin-replace');

const wdsReplace = fromRollup(replace);
const wdsRelativeLinks = fromRollup(relativeLinks);

const relativeLinksMap = {
  // eslint-disable-next-line no-template-curly-in-string
  news: "${new URL('../pages/news', import.meta.url)}",
  'cwk-v2': './news/cwk-v2/cwk-v2.html',
};

export default {
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
    {
      name: 'insert-theme-init-script',
      transform(context) {
        let transformedBody = context.body;
        if (context.response.is('html')) {
          transformedBody = context.body.replace(
            '</head>',
            `
            ${initialThemeScript}
            </head>
          `,
          );
        }
        return transformedBody;
      },
    },
    {
      name: 'relative-links-in-js',
      transform(context) {
        let transformedBody = context.body;
        if (context.response.is('html')) {
          transformedBody = transformCode(transformedBody, relativeLinksMap);
        }
        return transformedBody;
      },
    },
    wdsRelativeLinks(relativeLinksMap),
  ],
  middleware: [
    function rewriteIndex(context, next) {
      // extensionless routes: append .html
      if (context.url.includes('/') && !context.url.includes('.')) {
        if (context.url.endsWith('/')) {
          context.url = `${context.url}index`;
        }
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
