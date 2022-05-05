module.exports = {
  plugins: [
    'autoprefixer',
    [
      'cssnano',
      {
        preset: ['default', {
          normalizeCharset: { add: true },
        }],
      }
    ],
  ],
}
