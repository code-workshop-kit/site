// ESLint doesn't support ESM yet :(
module.exports = {
  extends: ['@open-wc/eslint-config', 'eslint-config-prettier'].map(require.resolve),
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
  ],
};
