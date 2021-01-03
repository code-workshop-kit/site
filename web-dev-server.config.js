require('dotenv').config();
const { fromRollup } = require('@web/dev-server-rollup');
const replace = require('@rollup/plugin-replace');

const wdsReplace = fromRollup(replace);

module.exports = {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: './pages/index.html',
  plugins: [
    wdsReplace({
      values: {
        "'/api/": "'http://localhost:3000/api/",
      },
      delimiters: ['', ''],
    }),
  ],
};
