const html = require("@web/rollup-plugin-html").default;
const copy = require("rollup-plugin-copy");
const dynamicImportVars = require("@rollup/plugin-dynamic-import-vars").default;
const { importMetaAssets } = require("@web/rollup-plugin-import-meta-assets");

export default {
  input: "index.html",
  output: { dir: "dist" },
  plugins: [
    html(),
    importMetaAssets(),
    // These assets are not taken care of through importMetaAssets, because they are html src/href attributes
    copy({
      targets: [{ src: "assets/video", dest: "dist/assets" }],
      targets: [{ src: "assets/images", dest: "dist/assets" }],
    }),
    dynamicImportVars({}),
  ],
};
