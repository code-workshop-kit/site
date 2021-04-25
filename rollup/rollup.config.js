import { createRequire } from 'module';
import relativeLinks from './rollupPluginRelativeLinks.js';
import initialThemeScript from '../scripts/initial-theme-script.js';

const require = createRequire(import.meta.url);
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const html = require('@web/rollup-plugin-html').default;
const copy = require('rollup-plugin-copy');
const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars').default;
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');
const { terser } = require('rollup-plugin-terser');
const csso = require('csso');

export default {
  output: { dir: 'dist' },
  plugins: [
    html({
      input: ['./pages/*.html', './pages/news/*/*.html'],
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
              ${initialThemeScript}
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
    relativeLinks({
      news: '/news',
    }),
  ],
};
