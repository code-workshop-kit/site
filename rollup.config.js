const html = require('@web/rollup-plugin-html').default;
const copy = require('rollup-plugin-copy');
const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars').default;
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');
const { terser } = require('rollup-plugin-terser');
const csso = require('csso');

export default {
  input: 'index.html',
  output: { dir: 'dist' },
  plugins: [
    html({
      transformAsset: [
        (content, filePath) => {
          if (filePath.endsWith('.css')) {
            let cssContent = content.toString('utf-8');
            return csso.minify(cssContent).css.replace('../assets/fonts', './fonts');
          }
        },
      ],
    }),
    importMetaAssets(),
    // These assets are not taken care of through importMetaAssets, because they are html src/href attributes
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
