module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'eslint:recommended',
  ],
  rules: {
    // 允许使用位运算符
    'no-bitwise': 'off',
    // 允许 else 中包含 return
    'no-else-return': 'off',
    // 不要求尽可能使用句点
    'dot-notation': 'off',
    // 不要求使用 const
    'prefer-const': 'off',
    // 禁止分号
    'semi': ['error', 'never'],
    // 禁用 eval()
    'no-eval': 'error',
    // 强制在 function 的左括号之前使用一致的空格
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'error',
    // 大括号风格要求
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // 强制在代码块中开括号前和闭括号后有空格
    'block-spacing': ['error', 'always'],
    // 在数组开括号后和闭括号前强制换行
    'array-bracket-newline': ['error', 'consistent'],
    // 强制数组元素间出现换行
    'array-element-newline': ['error', 'consistent'],
    // 强制将对象的属性放在不同的行上
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true,
    }],
    // 强制在花括号内使用一致的换行符
    'object-curly-newline': ['error', {
      multiline: true,
      consistent: true,
    }]
  },
  parserOptions: {
    "ecmaVersion": 8,
  }
}
