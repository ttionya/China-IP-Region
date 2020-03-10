module.exports = {
  extends: [
    '@ttionya/eslint-config/base',
    '@ttionya/eslint-config/typescript',
  ],

  // 添加 parserServices 支持
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
