module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],

  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-delimiter-style': [2, { multiline: { delimiter: 'comma' }, singleline: { delimiter: 'comma' } }],
    // 关闭 any 检查
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/type-annotation-spacing': 2,

    // Extension Rules
    // 一些声明规则对 .ts 无效时， 需要在此添加
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules
    'func-call-spacing': 0,
    '@typescript-eslint/func-call-spacing': 2,

    'no-dupe-class-members': 0,
    '@typescript-eslint/no-dupe-class-members': 2,
  },

  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ]
}
