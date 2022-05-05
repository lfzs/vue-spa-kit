module.exports = {
  root: true,

  extends: [
    require.resolve('./lib/eslint-config/base.js'),
    require.resolve('./lib/eslint-config/vue.js'),
    require.resolve('./lib/eslint-config/typescript.js'),
  ],

  ignorePatterns: [
    'node_modules/**',
    '/dist/**',
  ],
}
