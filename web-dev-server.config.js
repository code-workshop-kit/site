const { fromRollup } = require('@web/dev-server-rollup');
const { rewriteAPIRequestPath } = require('./rollup/rollup-plugins');

const wdsRewriteAPIRequestPath = fromRollup(rewriteAPIRequestPath);

module.exports = {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: './pages/index.html',
  plugins: [wdsRewriteAPIRequestPath()],
};
