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
    {
      name: 'insert-theme-init-script',
      transform(context) {
        let transformedBody = context.body;
        if (context.response.is('html')) {
          transformedBody = context.body.replace(
            '</head>',
            `
            <script>
              // Initial setup before first render to prevent FART
              // Priority is: 1) saved preference 2) browser/os preference 3) default 'light'
              const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = localStorage.getItem('cwk-theme') || (userPrefersDark ? 'dark' : 'light');
              document.documentElement.classList.add(theme);
            </script>
            </head>
          `,
          );
        }
        return transformedBody;
      },
    },
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
