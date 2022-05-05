module.exports = {
  presets: ['@babel/preset-env'],

  plugins: [
    'lodash',
    '@vue/babel-plugin-jsx',
    [
      '@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }
    ],
  ],
}
