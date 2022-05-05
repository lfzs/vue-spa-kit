module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'color-hex-length': null,
    'selector-type-no-unknown': null,
    'string-quotes': 'single',
    'no-empty-first-line': true,
    'no-invalid-position-at-import-rule': null,
    indentation: [2, { baseIndentLevel: 1 }],
  },
  ignoreFiles: [
    'node_modules/**',
    './dist/**',
  ],

  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.scss', '**/*.sass'],
      extends: ['stylelint-config-standard-scss'],
      customSyntax: 'postcss-sass',
    },
    {
      files: ['**/*.vue', '**/*.html'],
      customSyntax: 'postcss-html',
    },
  ],
}
