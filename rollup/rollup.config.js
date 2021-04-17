require('dotenv').config();
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const html = require('@web/rollup-plugin-html').default;
const copy = require('rollup-plugin-copy');
const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars').default;
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');
const { terser } = require('rollup-plugin-terser');
const csso = require('csso');

module.exports = {
  input: './pages/*.html',
  output: { dir: 'dist' },
  plugins: [
    html({
      transformAsset: [
        (content, filePath) => {
          if (filePath.endsWith('.css')) {
            const cssContent = content.toString('utf-8');
            return csso.minify(cssContent).css.replace(/..\/assets\/fonts/g, './fonts');
          }
          return content;
        },
      ],
      transformHtml: [
        (_html) =>
          _html.replace(
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
          ),
      ],
    }),
    nodeResolve(),
    importMetaAssets(),
    copy({
      targets: [
        { src: 'assets/images', dest: 'dist/assets' },
        { src: 'assets/video', dest: 'dist/assets' },
        { src: 'assets/fonts', dest: 'dist/assets' },
        { src: 'favicon.ico', dest: 'dist' },
      ],
    }),
    dynamicImportVars({}),
    terser(),
  ],
};
