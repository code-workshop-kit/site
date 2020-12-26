const baseCfg = require('./rollup.config.js');
const { rewriteAPIRequestPath } = require('./rollup-plugins.js');

/**
 * Only difference is that for build for development we rewrite requests to /api/ to localhost:3000/api/
 * This is because we mimick the reverse proxy behavior in product that proxies requests to /api/ to port 3000
 */

module.exports = {
  ...baseCfg,
  plugins: [...baseCfg.plugins, rewriteAPIRequestPath()],
};
