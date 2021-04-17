import { createRequire } from 'module';
import baseCfg from './rollup.config.js';

const require = createRequire(import.meta.url);
const replace = require('@rollup/plugin-replace');

/**
 * Only difference is that for build for development we rewrite requests to /api/ to localhost:3000/api/
 * This is because we mimick the reverse proxy behavior in product that proxies requests to /api/ to port 3000
 */

export default {
  ...baseCfg,
  plugins: [
    ...baseCfg.plugins,
    replace({
      values: {
        "'/api/": "'http://localhost:3000/api/",
      },
      delimiters: ['', ''],
    }),
  ],
};
